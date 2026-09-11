import { Link } from "@tanstack/react-router";
import { type Product } from "@/lib/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductHoverSlider } from "@/components/udc/ProductHoverSlider";

export function ProductCarousel({
  products,
  title,
}: {
  products: Product[];
  title?: string;
}) {
  return (
    <div className="w-full relative">
      {title && (
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        </div>
      )}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((p) => (
            <CarouselItem key={p.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Link
                to="/product/$productId"
                params={{ productId: p.id }}
                className="group block h-full ticket flex flex-col bg-bg overflow-hidden"
              >
                <ProductHoverSlider product={p} />
                <div className="flex flex-1 flex-col border-t border-hairline p-6 relative z-10 bg-bg">
                  <p className="spec text-cobalt">{p.eyebrow}</p>
                  <h3 className="mt-3 text-xl font-bold group-hover:text-coral transition-colors">
                    {p.title}
                  </h3>
                  <div className="mt-auto pt-6 flex justify-between items-end">
                    <p className="font-mono text-xl font-bold">${p.price}</p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-6">
          <CarouselPrevious className="static transform-none translate-x-0 translate-y-0 h-12 w-12 border border-hairline rounded-none bg-transparent hover:bg-hairline text-ink" />
          <CarouselNext className="static transform-none translate-x-0 translate-y-0 h-12 w-12 border border-coral rounded-none bg-coral text-bg hover:bg-coral/90" />
        </div>
      </Carousel>
    </div>
  );
}
