import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Check,
  Clock3,
  Layers,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { InkPicker } from "@/components/udc/InkPicker";
import { Reveal } from "@/components/udc/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unique Design Custom — Custom Printed Tees & Mugs" },
      {
        name: "description",
        content:
          "Upload any design, preview it in your ink colour, and get custom tees and mugs printed and shipped in days. No minimum order.",
      },
      {
        property: "og:title",
        content: "Unique Design Custom — Custom Printed Tees & Mugs",
      },
      {
        property: "og:description",
        content:
          "Your design, printed the way you drew it. Custom t-shirts and coffee mugs with no minimum order.",
      },
    ],
  }),
  component: Index,
});

const STEPS = [
  {
    n: "01",
    title: "Upload your design",
    body: "Drop in a PNG, JPG or vector file. Logos, drawings, photos, inside jokes — anything you own the rights to.",
  },
  {
    n: "02",
    title: "Preview & pick your colours",
    body: "See your artwork on the product before you buy. Swap ink colours and garment shades until it looks right.",
  },
  {
    n: "03",
    title: "We print & ship",
    body: "Your order goes to press the next working day and lands on your doorstep in three to five days.",
  },
];

const FEATURES = [
  { icon: Layers, label: "Print that survives the wash", meta: "60+ washes" },
  { icon: Check, label: "No minimum order", meta: "Order 1 or 100" },
  { icon: Clock3, label: "Printed & shipped in days", meta: "3–5 days" },
  { icon: ShieldCheck, label: "Reprint or refund, no argument", meta: "Guaranteed" },
];

const REVIEWS = [
  {
    quote:
      "I sent over a rough sketch my daughter drew and it came back looking like proper merch. She hasn't taken it off since.",
    name: "Sarah R.",
    order: "Custom tee, 1 piece",
  },
  {
    quote:
      "Twelve mugs for the team, ordered on a Monday, on desks by Thursday. The logo colour matched our brand exactly.",
    name: "Marcus D.",
    order: "Custom mugs for his team",
  },
  {
    quote:
      "We did shirts for a 40-person charity run. No minimum meant we could add three late signups without a fuss.",
    name: "Priya N.",
    order: "Event tees, 43 pieces",
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="spec flex items-center gap-3">
      <span className="inline-block h-px w-8 bg-coral" aria-hidden="true" />
      {children}
    </p>
  );
}

function Index() {
  const navigate = useNavigate();

  const start = () => {
    navigate({ to: "/shop" });
  };

  return (
    <div className="bg-bg text-ink">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <SectionLabel>Job ticket / No. 0001</SectionLabel>
            <h1 className="mt-6 text-[clamp(2.75rem,10vw,5.25rem)]">
              Your design,
              <br />
              printed the way
              <br />
              <span className="text-cobalt">you drew it.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg">
              Custom t-shirts and coffee mugs, pressed one at a time in our shop. Upload
              artwork, choose your ink, and we handle the rest.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button type="button" onClick={start} className="btn btn-coral">
                Start Designing
              </button>
              <a
                href="#how-it-works"
                className="spec inline-flex items-center gap-2 text-ink underline decoration-marigold decoration-2 underline-offset-8 transition-colors hover:text-cobalt"
              >
                See How It Works <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <InkPicker />
          </Reveal>
        </div>
      </section>

      <hr className="mx-auto max-w-6xl border-hairline" />

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <SectionLabel>Process / Three steps</SectionLabel>
          <h2 className="mt-5 max-w-xl text-[clamp(2rem,6vw,3.25rem)]">
            From your screen to your hands
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-px bg-hairline sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 90}>
              <div className="h-full bg-bg p-6 sm:p-8">
                <span className="font-mono text-sm font-bold text-coral">{s.n}</span>
                <h3 className="mt-4 text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <hr className="mx-auto max-w-6xl border-hairline" />

      {/* WHY US */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <SectionLabel>Shop standards</SectionLabel>
        </Reveal>
        <ul className="mt-10 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal as="li" key={f.label} delay={i * 70}>
              <div className="h-full bg-bg p-6">
                <f.icon size={22} className="text-cobalt" aria-hidden="true" />
                <p className="mt-4 text-base font-medium leading-snug">{f.label}</p>
                <p className="spec mt-2">{f.meta}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <hr className="mx-auto max-w-6xl border-hairline" />

      {/* REVIEWS */}
      <section id="reviews" className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <SectionLabel>Reviews / Verified orders</SectionLabel>
          <h2 className="mt-5 text-[clamp(2rem,6vw,3.25rem)]">What came back</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal as="article" key={r.name} delay={i * 90}>
              <figure className="ticket h-full p-6">
                <span className="block h-1 w-10 bg-marigold" aria-hidden="true" />
                <blockquote className="mt-5 text-base leading-relaxed text-ink/85">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-hairline pt-4">
                  <span className="block font-mono text-sm font-bold">{r.name}</span>
                  <span className="spec mt-1 block">{r.order}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-ink text-bg">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center">
          <Reveal>
            <p className="spec justify-center text-marigold">Press is warm</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2.25rem,7vw,4.5rem)] text-bg">
              Send us your design. We'll print it.
            </h2>
            <div className="mt-9 flex justify-center">
              <button type="button" onClick={start} className="btn btn-coral">
                Start Designing
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
