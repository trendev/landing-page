const TECH_CATEGORIES = [
  "Cloud Platforms & Blockchain",
  "AI & ML",
  "DevOps Tools",
  "Modern Frameworks",
];

export function Technologies() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 text-foreground">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl mb-4 sm:mb-6">
          Modern Technology Stack
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
          We work with cutting-edge technologies to deliver robust, scalable
          solutions
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {TECH_CATEGORIES.map((tech, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 glass rounded-xl flex items-center justify-center min-h-[80px] sm:min-h-[100px]"
            >
              <p className="text-sm sm:text-base text-center">{tech}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
