import { useEffect, useRef } from "react";

/**
 * WeaveBackground: animated WebGL "draped woven fabric" background.
 *
 * A single full-screen fragment shader renders a rippling cloth height-field
 * with per-pixel lighting: a satin highlight rolls across the folds and the
 * brand accent catches the crests. The woven thread structure is baked into
 * the shading so it reads as fabric, not a gradient.
 *
 * Mount once in App.tsx as the first child of the root, behind everything:
 *   <WeaveBackground />
 *   ...with the root element dark/transparent so the canvas shows through.
 *
 * - Responsive + DPR-aware (auto-resizes to the viewport).
 * - Dependency-free (~3 KB), no libraries.
 * - Degrades gracefully: static CSS gradient if WebGL is unavailable,
 *   single still frame if the user prefers reduced motion.
 * - Reads `--accent` from the document so it stays in sync with the brand token.
 */

const CONFIG = {
  speed: 0.16, // ripple animation speed
  twill: 0.62, // diagonal weave angle (radians)
  drapeScale: 2.6, // size of the folds (lower = bigger folds)
  sheen: 1.0, // strength of the rolling satin highlight
  mouse: 0.6, // how much the light follows the cursor (0 = ignore)
  // Highlight ceiling. This is a READABILITY setting, not just a look: the
  // crests are what unglassed body text has to survive. See the note above the
  // rolloff in FRAG before raising `highlight`.
  knee: 0.05, // brightness at which the rolloff starts
  highlight: 0.27, // brightness the crests asymptotically approach
  // Internal-resolution ladder, best first. The governor walks DOWN this list
  // when the device cannot hold the frame budget; see `resize`/`frame` below.
  quality: [0.6, 0.5, 0.42, 0.34],
};

const VERT = `
  attribute vec2 p;
  void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
  precision highp float;
  uniform vec2  u_res;
  uniform float u_time;
  uniform vec3  u_accent;  // brand cyan, linear-ish 0..1
  uniform float u_drape;
  uniform float u_sheen;
  uniform float u_knee;
  uniform float u_highlight;
  // Precomputed on the CPU once per frame (or once per resize). These depend
  // only on uniforms, so computing them per fragment was paying for a couple of
  // normalize()s and a sin/cos pair on every single pixel of a full-screen quad.
  uniform vec3  u_L;        // light direction, already normalised
  uniform vec3  u_H;        // half vector, already normalised
  uniform vec2  u_twillSC;  // cos(twill), sin(twill)
  uniform float u_cellInv;  // 1.0 / (height * 0.012)

  // draped cloth height-field: layered travelling waves
  float drape(vec2 q, float t){
    float h = 0.0;
    h += sin( q.x*1.2 + q.y*2.2 + t*0.9 ) * 0.60;
    h += sin( q.x*-1.8 + q.y*3.7 + t*1.3 ) * 0.30;
    h += sin( q.x*2.6 + q.y*1.3 - t*0.7 ) * 0.20;
    h += sin( q.x*0.7 - q.y*4.9 + t*0.5 ) * 0.14;
    return h;
  }

  void main(){
    vec2 frag = gl_FragCoord.xy;
    vec2 uv   = frag / u_res;
    vec2 q = (frag - 0.5*u_res) / u_res.y * u_drape;
    float t = u_time;

    // height + normal via finite differences
    float e = 0.015 * u_drape;
    float h  = drape(q, t);
    float hx = drape(q + vec2(e, 0.0), t);
    float hy = drape(q + vec2(0.0, e), t);
    vec3  n  = normalize(vec3(-(hx-h)/e, -(hy-h)/e, 1.0));

    // light rolls over time + follows the cursor (u_L/u_H come from the CPU)
    float diff = clamp(dot(n, u_L), 0.0, 1.0);
    // pow(b, 22.0) as a multiply chain: b^22 == b^16 * b^4 * b^2. Same value,
    // but it drops the exp2/log2 pair that pow() compiles to.
    float b = clamp(dot(n, u_H), 0.0, 1.0);
    float b2 = b*b, b4 = b2*b2, b8 = b4*b4, b16 = b8*b8;
    float spec = b16*b4*b2 * u_sheen;

    // woven thread structure (diagonal twill of round threads).
    // mat2 is column-major, so mat2(ca,-sa,sa,ca)*cc == (ca*x + sa*y, ca*y - sa*x).
    vec2 cc = frag * u_cellInv;
    vec2 c = vec2(u_twillSC.x*cc.x + u_twillSC.y*cc.y,
                  u_twillSC.x*cc.y - u_twillSC.y*cc.x);
    vec2 g1 = fract(c) - 0.5;
    float warp = smoothstep(0.5, 0.12, length(g1));
    vec2 g2 = fract(c + 0.5) - 0.5;
    float weft = smoothstep(0.5, 0.18, length(vec2(g2.x*0.8, g2.y))) * 0.6;
    float weave = clamp(warp + weft, 0.0, 1.0);

    // palette
    vec3 navy = vec3(0.022, 0.043, 0.094);
    vec3 mid  = vec3(0.105, 0.205, 0.46);
    vec3 cyan = u_accent;

    float crest = smoothstep(0.15, 1.25, h);
    float lightAmt = 0.14 + 0.86*diff;

    vec3 col = mix(navy, mid, lightAmt);
    // clamped: the factor peaks at ~1.45, so the mix used to overshoot *past*
    // pure cyan toward white, which also washed the accent out to grey-white.
    col = mix(col, cyan, clamp(crest*0.55 + spec*0.9, 0.0, 1.0));
    col *= mix(0.42, 1.0, weave);
    col += cyan * spec * weave * 0.7;

    float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
    col *= mix(0.62, 1.0, vig);

    // Highlight rolloff, applied to BRIGHTNESS and fed back proportionally so
    // hue and saturation survive: the crests keep their cyan, they just stop
    // being bright. Everything below u_knee is untouched, so the weave keeps
    // its structure.
    //
    // This is what makes the page readable. The two darkeners above are
    // spatial (thread gaps, vignette) and the vignette is at its *brightest*
    // dead centre -- exactly where the centred hero copy sits -- so the peaks
    // used to reach a relative luminance of 0.80, brighter than pure cyan.
    // #9DAFD8 body text over that measured 1.0:1: literally invisible. The
    // ceiling holds the whole canvas under L 0.053, which is 4.7:1.
    float v = dot(col, vec3(0.2126, 0.7152, 0.0722));
    float over = max(v - u_knee, 0.0);
    float capped = u_knee + over / (1.0 + over / max(u_highlight - u_knee, 1e-4));
    col *= capped / max(v, 1e-4);

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.trim().replace("#", "");
  const full =
    m.length === 3
      ? m
          .split("")
          .map((c) => c + c)
          .join("")
      : m;
  const int = parseInt(full || "25D8EC", 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
}

export function WeaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    // Fallback: CSS gradient (set on the canvas's parent if WebGL is missing)
    if (!gl) {
      canvas.style.background =
        "radial-gradient(60% 40% at 75% 12%, rgba(37,216,236,.18), transparent 60%), linear-gradient(180deg,#0A1430,#070C1C 55%,#04060D)";
      return;
    }

    const accentVar = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    const accent = hexToRgb(accentVar.startsWith("#") ? accentVar : "#25D8EC");

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(s) ?? "shader compile error");
      }
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {
      res: gl.getUniformLocation(prog, "u_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      accent: gl.getUniformLocation(prog, "u_accent"),
      drape: gl.getUniformLocation(prog, "u_drape"),
      sheen: gl.getUniformLocation(prog, "u_sheen"),
      knee: gl.getUniformLocation(prog, "u_knee"),
      highlight: gl.getUniformLocation(prog, "u_highlight"),
      L: gl.getUniformLocation(prog, "u_L"),
      H: gl.getUniformLocation(prog, "u_H"),
      twillSC: gl.getUniformLocation(prog, "u_twillSC"),
      cellInv: gl.getUniformLocation(prog, "u_cellInv"),
    };

    let w = 0;
    let h = 0;
    const resize = () => {
      // Render the canvas BELOW screen resolution (0.6x) and let the browser
      // upscale it for display. The weave is soft and out of focus, so the
      // upscale is invisible, but the fragment shader (the dominant GPU cost)
      // runs over ~64% fewer pixels than at 1x and ~4x fewer than retina. This
      // is the single biggest lever for keeping the animation cheap on weak GPUs.
      const dpr = CONFIG.quality[qIndex];
      w = Math.max(1, Math.floor(window.innerWidth * dpr));
      h = Math.max(1, Math.floor(window.innerHeight * dpr));
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      gl.viewport(0, 0, w, h);
      // depends on the backing-store height, so it has to follow every resize
      gl.uniform1f(U.cellInv, 1 / (h * 0.012));
    };
    let qIndex = 0;
    resize();
    window.addEventListener("resize", resize, { passive: true });

    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;
    const onMove = (e: PointerEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2 * CONFIG.mouse;
      tmy = -(e.clientY / window.innerHeight - 0.5) * 2 * CONFIG.mouse;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const setStaticUniforms = () => {
      gl.uniform3f(U.accent, accent[0], accent[1], accent[2]);
      gl.uniform2f(U.twillSC, Math.cos(CONFIG.twill), Math.sin(CONFIG.twill));
      gl.uniform1f(U.drape, CONFIG.drapeScale);
      gl.uniform1f(U.sheen, CONFIG.sheen);
      gl.uniform1f(U.knee, CONFIG.knee);
      gl.uniform1f(U.highlight, CONFIG.highlight);
    };

    // The accent/weave-shape uniforms never change at runtime, so upload them
    // once instead of re-sending five uniforms on every frame.
    setStaticUniforms();

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = false;
    let lastDraw = 0;
    const start = performance.now();
    // Cap the background to ~30fps. The ripple is slow, so 30fps is visually
    // indistinguishable from 60 but halves the per-second shading work and
    // leaves the main thread free to scroll at full rate.
    const FRAME_MS = 1000 / 30;

    // Light direction + half vector, per frame on the CPU rather than per
    // fragment on the GPU. Two normalize()s over ~500k pixels was the shader
    // recomputing a value that is constant across the whole frame.
    const uploadLight = () => {
      const lx = 0.45 + mx * 0.5;
      const ly = 0.65 + my * 0.5;
      const lz = 0.85;
      const ln = Math.hypot(lx, ly, lz);
      const Lx = lx / ln, Ly = ly / ln, Lz = lz / ln;
      const hn = Math.hypot(Lx, Ly, Lz + 1);
      gl.uniform3f(U.L, Lx, Ly, Lz);
      gl.uniform3f(U.H, Lx / hn, Ly / hn, (Lz + 1) / hn);
    };

    // Adaptive resolution. A full-screen fragment shader costs exactly what it
    // covers in pixels, so when a device cannot hold the frame budget the only
    // lever that always works is shading fewer of them. Watch the real interval
    // between drawn frames and step down CONFIG.quality until we fit.
    //
    // Downgrade-only, on purpose: stepping back up on a device that is right at
    // the threshold oscillates between two resolutions, and a canvas resizing
    // back and forth is far more distracting than a slightly softer weave. The
    // first WARMUP frames are ignored so that page-load layout and font swaps
    // do not get blamed on the shader.
    const WARMUP = 30;
    const WINDOW = 45;
    const BUDGET = FRAME_MS * 1.35;
    let drawn = 0;
    let windowStart = 0;

    const governor = (now: number) => {
      drawn++;
      if (drawn === WARMUP) windowStart = now;
      if (drawn < WARMUP + WINDOW) return;
      const avg = (now - windowStart) / WINDOW;
      drawn = WARMUP;
      windowStart = now;
      if (avg > BUDGET && qIndex < CONFIG.quality.length - 1) {
        qIndex++;
        resize();
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - lastDraw < FRAME_MS) return;
      lastDraw = now;
      mx += (tmx - mx) * 0.1;
      my += (tmy - my) * 0.1;
      gl.uniform2f(U.res, w, h);
      uploadLight();
      gl.uniform1f(U.time, ((now - start) / 1000) * CONFIG.speed * 6.0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      governor(now);
    };

    const play = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
      drawn = 0; // don't bill the hidden-tab gap to the governor on resume
    };
    // Don't burn the GPU animating a background the user can't see.
    const onVisibility = () => (document.hidden ? pause() : play());

    if (reduceMotion) {
      gl.uniform2f(U.res, w, h);
      uploadLight();
      gl.uniform1f(U.time, 3.0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    } else {
      document.addEventListener("visibilitychange", onVisibility);
      play();
    }

    return () => {
      pause();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      const lose = gl.getExtension("WEBGL_lose_context");
      if (lose) lose.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full print:hidden"
    />
  );
}
