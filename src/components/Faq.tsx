import { faqs } from "@/data/content";

export function Faq() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Quick answers about our CTO, AI, cloud/DevOps, and blockchain
            consulting engagements.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <article
              key={index}
              className="glass rounded-xl p-5 sm:p-6"
            >
              <h3 className="text-lg mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
