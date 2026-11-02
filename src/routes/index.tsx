import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Check,
  Clock3,
  Layers,
  ShieldCheck,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/udc/Reveal";
import { ProductCarousel } from "@/components/udc/ProductCarousel";
import { getProducts } from "@/lib/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export const Route = createFileRoute("/")({
  loader: async () => {
    return await getProducts();
  },
  head: () => ({
    meta: [
      { title: "Unique Design Custom — Trendy Printed Tees, Bags & Mugs" },
      {
        name: "description",
        content:
          "Shop our exclusive collection of printed tees, tote bags, and mugs. Unique designs, premium quality, fast delivery.",
      },
      {
        property: "og:title",
        content: "Unique Design Custom — Trendy Printed Tees, Bags & Mugs",
      },
      {
        property: "og:description",
        content:
          "Shop our exclusive collection of printed tees, tote bags, and mugs. Unique designs, premium quality, fast delivery.",
      },
    ],
  }),
  component: Index,
});

const STEPS = [
  {
    n: "01",
    title: "Browse Designs",
    body: "Explore our exclusive collection of hand-picked artwork and premium apparel.",
  },
  {
    n: "02",
    title: "Pick Your Fit",
    body: "Choose your preferred apparel style, size, and your favorite color.",
  },
  {
    n: "03",
    title: "Fast Delivery",
    body: "Your order is packed securely and shipped right to your door.",
  },
];

const FEATURES = [
  { icon: Layers, label: "Durable Print", meta: "60+ washes" },
  { icon: Check, label: "No Minimums", meta: "Order 1 or 100" },
  { icon: Clock3, label: "Fast Shipping", meta: "3–5 days" },
  { icon: ShieldCheck, label: "Satisfaction", meta: "Guaranteed" },
];

const REVIEWS = [
  {
    quote:
      "I sent over a rough sketch and it came back looking like proper merch. Perfect quality.",
    name: "Sarah R.",
    order: "Graphic tee, 1 piece",
  },
  {
    quote:
      "Twelve mugs for the team, ordered on Monday, delivered by Thursday. Highly recommended.",
    name: "Marcus D.",
    order: "Coffee mugs for his team",
  },
  {
    quote:
      "No minimum meant we could add three late signups without a fuss for our charity run.",
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
  const products = Route.useLoaderData();
  const navigate = useNavigate();

  const start = () => {
    navigate({ to: "/shop" });
  };

  return (
    <div className="bg-bg text-ink">
      {/* HERO */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center bg-ink">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero_bg.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-[75%_center] lg:object-center"
          />
          {/* Dark overlay for mobile, gradient for desktop */}
          <div className="absolute inset-0 bg-black/60 lg:bg-transparent lg:bg-gradient-to-r lg:from-black/90 lg:via-black/50 lg:to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
          <Reveal>
            <h1 className="text-white font-display text-[clamp(4rem,12vw,8rem)] leading-[0.90] uppercase ">
              WEAR THE<br/>WORD.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
              Exclusive t-shirts, tote bags, and coffee mugs, printed with care in our shop. 
              Browse our collection, pick your favorites, and we handle the rest.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button 
                type="button" 
                onClick={start} 
                className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors"
              >
                Shop Collection
              </button>
              <a
                href="#how-it-works"
                className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="mx-auto max-w-6xl border-hairline" />

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <SectionLabel>Top Picks</SectionLabel>
        </Reveal>
        <div className="mt-8">
          <ProductCarousel title="Best Sellers" products={products.filter((p) => p.isBestSeller)} />
        </div>
      </section>

      <hr className="mx-auto max-w-6xl border-hairline" />

      {/* FEATURED */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <SectionLabel>New & Noteworthy</SectionLabel>
        </Reveal>
        <div className="mt-8">
          <ProductCarousel title="Featured Items" products={products.filter((p) => p.isFeatured)} />
        </div>
      </section>

      <hr className="mx-auto max-w-6xl border-hairline" />

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <SectionLabel>Process / Three steps</SectionLabel>
          <h2 className="mt-5 max-w-xl text-[clamp(2rem,6vw,3.25rem)] font-bold tracking-tight">
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <SectionLabel>Customer Reviews</SectionLabel>
              <h2 className="mt-4 text-[clamp(2rem,6vw,3.25rem)] font-bold tracking-tight leading-tight">What our customers say</h2>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-6 h-6 fill-marigold text-marigold" />
                ))}
              </div>
              <p className="font-bold text-xl">4.9/5 <span className="text-ink/60 text-base font-normal ml-1">(1,248 reviews)</span></p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal as="article" key={r.name} delay={i * 90}>
              <figure className="ticket h-full p-6 sm:p-8 flex flex-col justify-between bg-bg shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-marigold text-marigold" />
                    ))}
                  </div>
                  <blockquote className="text-base sm:text-lg leading-relaxed text-ink/90 font-medium">
                    "{r.quote}"
                  </blockquote>
                </div>
                <figcaption className="mt-8 pt-6 border-t border-hairline">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-ink">{r.name}</span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                  </div>
                  <span className="text-sm text-ink/60 block">{r.order}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-ink text-bg overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <p className="spec text-marigold">Limited Edition</p>
              <h2 className="mt-5 text-[clamp(2.25rem,7vw,4.5rem)] text-bg leading-[1.1] font-display uppercase ">
                Exclusive prints.<br/>Premium Quality.
              </h2>
              <div className="mt-9">
                <button type="button" onClick={start} className="btn btn-coral px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-coral/90 transition-colors">
                  Shop Collection
                </button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full max-w-md mx-auto lg:mx-0 relative"
              >
                <CarouselContent>
                  {products.slice(0, 4).map((p: any) => (
                    <CarouselItem key={p.id}>
                      <img
                        src={p.img}
                        alt={p.title}
                        className="aspect-square w-full object-cover border border-bg/20"
                        loading="lazy"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 text-white" />
                <CarouselNext className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 text-white" />
              </Carousel>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
