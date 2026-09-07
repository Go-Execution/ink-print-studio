import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import tshirt from "@/assets/tshirt.jpg";
import mug from "@/assets/mug.jpg";
import { useCart } from "@/lib/CartContext";

export const Route = createFileRoute("/shop")({
  component: Shop,
});

const PRODUCTS = [
  {
    id: "tees",
    img: tshirt,
    alt: "Blank white cotton t-shirt laid flat on a chalk white surface",
    eyebrow: "100% Cotton / Unisex",
    title: "Custom T-Shirts",
    price: 24,
    unit: "/ per shirt",
    body: "Heavyweight combed cotton, printed edge to edge. Sizes XS–3XL in nine garment colours.",
    colors: ["White", "Black", "Grey"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "mugs",
    img: mug,
    alt: "Blank white ceramic coffee mug on a chalk white surface",
    eyebrow: "11oz Ceramic / Dishwasher Safe",
    title: "Custom Coffee Mugs",
    price: 16,
    unit: "/ per mug",
    body: "Glossy white ceramic with a wrap-around print. Safe in the dishwasher and the microwave.",
    colors: ["White"],
    sizes: ["11oz", "15oz"],
  },
];

function Shop() {
  const { addToCart } = useCart();
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, { color: string; size: string }>
  >(() => {
    const initial: Record<string, { color: string; size: string }> = {};
    for (const p of PRODUCTS) {
      initial[p.id] = { color: p.colors[0] || "", size: p.sizes[0] || "" };
    }
    return initial;
  });

  const handleOptionChange = (productId: string, key: "color" | "size", value: string) => {
    setSelectedOptions((prev) => {
      const current = prev[productId] || { color: "", size: "" };
      return {
        ...prev,
        [productId]: { ...current, [key]: value },
      };
    });
  };

  const handleAddToCart = (product: (typeof PRODUCTS)[0]) => {
    addToCart({
      productId: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.img,
      color: selectedOptions[product.id]?.color || product.colors[0] || "",
      size: selectedOptions[product.id]?.size || product.sizes[0] || "",
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-display uppercase tracking-normal">Shop</h1>
        <p className="mt-4 text-ink/70 max-w-2xl text-lg">
          Choose a product to customize. All items are printed to order with no minimums.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        {PRODUCTS.map((p) => (
          <article key={p.id} className="ticket flex flex-col h-full bg-bg">
            <img
              src={p.img}
              alt={p.alt}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
            <div className="flex flex-1 flex-col border-t border-hairline p-6 sm:p-8">
              <p className="spec text-cobalt">{p.eyebrow}</p>
              <h3 className="mt-3 text-3xl font-bold">{p.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink/75">{p.body}</p>

              <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-2">Color</label>
                  <select
                    className="border border-hairline bg-transparent px-3 py-2 rounded text-sm w-full"
                    value={selectedOptions[p.id]?.color || p.colors[0] || ""}
                    onChange={(e) => handleOptionChange(p.id, "color", e.target.value)}
                  >
                    {p.colors.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-2">Size</label>
                  <select
                    className="border border-hairline bg-transparent px-3 py-2 rounded text-sm w-full"
                    value={selectedOptions[p.id]?.size || p.sizes[0] || ""}
                    onChange={(e) => handleOptionChange(p.id, "size", e.target.value)}
                  >
                    {p.sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-auto pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <p className="font-mono text-2xl font-bold">
                  ${p.price}
                  <span className="spec ml-2 text-ink/50 text-sm">{p.unit}</span>
                </p>
                <button type="button" onClick={() => handleAddToCart(p)} className="btn btn-coral w-full sm:w-auto">
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
