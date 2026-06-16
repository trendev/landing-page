import { whyChoose } from "@/data/content";

export function WhyChoose() {
  return (
    <section id="why-choose" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            Why Choose TRENDev
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Investing in TRENDev Consulting leads to measurable returns through
            reduced costs, increased efficiency, and accelerated growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChoose.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="text-center p-6 glass rounded-xl"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
                </div>
                <h3 className="mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
