import { engagementModels } from "@/data/content";

export function EngagementModels() {
  return (
    <section className="pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl mb-4">
            High-Impact Technology Consulting Services
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Our consulting model combines strategic leadership with execution.
            Whether you need a fractional CTO, AI consulting services, cloud and
            DevOps experts, or blockchain product delivery, TRENDev provides
            practical roadmaps and outcomes aligned to revenue, speed, and
            resilience goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {engagementModels.map((model, index) => (
              <div
                key={index}
                className="glass rounded-xl p-5"
              >
                <h3 className="mb-2">{model.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
