import { productVisuals } from "@/data/productVisuals";
import type { TierId } from "@/types";

interface ProductIconProps {
  tierId: TierId;
  /** Display size in CSS px: ~40 in dense headers, 48 to 64 on cards, 64 to 80 on service pages. */
  size: number;
  className?: string;
}

/**
 * The offer's product icon (issue #61). Always shown beside the product name,
 * so it is decorative (`alt=""`): the name is announced once, not twice.
 * Width and height are set so nothing shifts while it loads; the square is
 * shown whole (badge included), only its corners rounded.
 */
export function ProductIcon({ tierId, size, className = "" }: ProductIconProps) {
  const { src, srcSet } = productVisuals[tierId];
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={`${size}px`}
      width={size}
      height={size}
      alt=""
      loading="lazy"
      decoding="async"
      className={`shrink-0 object-contain rounded-xl ${className}`}
    />
  );
}
