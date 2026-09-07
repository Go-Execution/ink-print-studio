import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  Clock3,
  Layers,
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { InkPicker } from "@/components/udc/InkPicker";
import { Reveal } from "@/components/udc/Reveal";
import tshirt from "@/assets/tshirt.jpg";
import mug from "@/assets/mug.jpg";

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

const NAV = [
  { label: "Shop", href: "#shop" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reviews", href: "#reviews" },
];

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

const PRODUCTS = [
  {
    id: "tees",
    img: tshirt,
    alt: "Blank white cotton t-shirt laid flat on a chalk white surface",
    eyebrow: "100% Cotton / Unisex",
    title: "Custom T-Shirts",
    price: "$24",
    unit: "/ per shirt",
    body: "Heavyweight combed cotton, printed edge to edge. Sizes XS–3XL in nine garment colours.",
  },
  {
    id: "mugs",
    img: mug,
    alt: "Blank white ceramic coffee mug on a chalk white surface",
    eyebrow: "11oz Ceramic / Dishwasher Safe",
    title: "Custom Coffee Mugs",
    price: "$16",
    unit: "/ per mug",
    body: "Glossy white ceramic with a wrap-around print. Safe in the dishwasher and the microwave.",
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    setMenuOpen(false);
    document.getElementById("shop")?.scrollIntoView({ block: "start" });
  };

  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-hairline bg-bg/90 backdrop-blur">
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4"
        >
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-display text-lg uppercase tracking-tight sm:text-xl">
              Unique Design
            </span>
            <span className="spec hidden text-cobalt sm:inline">Custom</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="spec text-ink transition-colors hover:text-cobalt"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button type="button" onClick={start} className="btn btn-coral hidden sm:inline-flex">
              Start Designing
            </button>
            <button
              type="button"
              className="p-2 md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <ul className="border-t border-hairline px-5 pb-4 md:hidden">
            {NAV.map((l) => (
              <li key={l.href} className="border-b border-hairline">
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="spec block py-4 text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4 sm:hidden">
              <button type="button" onClick={start} className="btn btn-coral w-full">
                Start Designing
              </button>
            </li>
          </ul>
        )}
      </header>

      <main id="top">
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
              {started && (
                <p className="spec mt-6 text-cobalt">
                  Nice — pick a product below to keep going.
                </p>
              )}
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

        {/* SHOP */}
        <section id="shop" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <SectionLabel>Shop / Two blanks, endless prints</SectionLabel>
            <h2 className="mt-5 text-[clamp(2rem,6vw,3.25rem)]">Pick your canvas</h2>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {PRODUCTS.map((p, i) => (
              <Reveal as="article" key={p.id} delay={i * 100}>
                <div className="ticket lift flex h-full flex-col">
                  <img
                    src={p.img}
                    alt={p.alt}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col border-t border-hairline p-6">
                    <p className="spec">{p.eyebrow}</p>
                    <h3 className="mt-3 text-3xl">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/75">{p.body}</p>
                    <p className="mt-5 font-mono text-xl">
                      From {p.price}
                      <span className="spec ml-2">{p.unit}</span>
                    </p>
                    <button
                      type="button"
                      onClick={start}
                      className="btn btn-ink mt-6 w-full"
                    >
                      Customise Now
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
      </main>

      <footer className="bg-ink text-bg/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-bg/15 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg uppercase text-bg">Unique Design Custom</p>
            <p className="spec mt-2 text-bg/60">Printed to order since 2019</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {["hello@uniquedesigncustom.com", "Instagram", "TikTok", "Shipping & Returns"].map(
              (l) => (
                <li key={l}>
                  <a href="#top" className="spec text-bg/70 transition-colors hover:text-marigold">
                    {l}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-8">
          <p className="spec text-bg/45">© 2026 Unique Design Custom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
