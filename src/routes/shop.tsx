import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Filter } from "lucide-react";

import { useCart } from "@/lib/CartContext";

import { getProducts, type Product } from "@/lib/products";
import { ProductHoverSlider } from "@/components/udc/ProductHoverSlider";

export const Route = createFileRoute("/shop")({
  loader: async () => {
    return await getProducts();
  },
  component: Shop,
});

function Shop() {
  const PRODUCTS = Route.useLoaderData();
  const { addToCart } = useCart();
  
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, { color: string; size: string; quantity: number }>
  >(() => {
    const initial: Record<string, { color: string; size: string; quantity: number }> = {};
    for (const p of PRODUCTS) {
      const firstColor = p.colors[0];
      const colorName = firstColor ? (typeof firstColor === 'string' ? firstColor : (firstColor as any).name) : "";
      initial[p.id] = { color: colorName, size: p.sizes[0] || "", quantity: 1 };
    }
    return initial;
  });

  const handleOptionChange = (productId: string, key: "color" | "size" | "quantity", value: string | number) => {
    setSelectedOptions((prev) => {
      const current = prev[productId] || { color: "", size: "", quantity: 1 };
      return {
        ...prev,
        [productId]: { ...current, [key]: value },
      };
    });
  };

  const handleAddToCart = (product: (typeof PRODUCTS)[0]) => {
    const firstColor = product.colors[0];
    const defaultColorName = firstColor ? (typeof firstColor === 'string' ? firstColor : (firstColor as any).name) : "";
    addToCart({
      productId: product.id,
      name: product.title,
      price: product.price,
      quantity: selectedOptions[product.id]?.quantity || 1,
      image: product.img,
      color: selectedOptions[product.id]?.color || defaultColorName,
      size: selectedOptions[product.id]?.size || product.sizes[0] || "",
    });
  };

  const categories = ["All", "T-Shirt", "Bags", "Mug"];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
    if (p.price > maxPrice) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      
      {/* Header & Mobile Toggle */}
      <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Shop</h1>
          <p className="mt-2 md:mt-4 text-ink/70 max-w-2xl text-lg">
            Browse our collection of uniquely designed tees, bags, and mugs.
          </p>
        </div>
        
        <button 
          className="md:hidden flex items-center gap-2 border border-hairline px-4 py-2 rounded font-semibold text-sm w-fit bg-white shadow-sm"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <Filter className="w-4 h-4" /> 
          {isMobileFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Filters Sidebar */}
        <aside className={`${isMobileFilterOpen ? "block" : "hidden"} md:block w-full md:w-64 shrink-0`}>
          <div className="mb-8">
            <h2 className="text-xl font-semibold tracking-tight mb-4">Categories</h2>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="accent-coral w-4 h-4"
                  />
                  <span className="text-ink/80 group-hover:text-ink transition-colors">
                    {cat === "All" ? "All Products" : cat === "T-Shirt" ? "T-Shirts" : cat === "Mug" ? "Mugs" : cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight mb-4">
              Max Price: ${maxPrice}
            </h2>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-coral"
            />
            <div className="flex justify-between text-sm text-ink/60 mt-2">
              <span>$10</span>
              <span>$100</span>
            </div>
          </div>
        </aside>

        {/* Main Content (Products Grid) */}
        <div className="flex-1 w-full">
          {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-ink/60">
            No products found matching your filters.
          </div>
        ) : (
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((p) => (
              <article key={p.id} className="ticket flex flex-col h-full bg-bg">
                <Link to="/product/$productId" params={{ productId: p.id }} className="block">
                  <ProductHoverSlider product={p} />
                </Link>
                <div className="flex flex-1 flex-col border-t border-hairline p-6 sm:p-8">
                  <p className="spec text-cobalt">{p.eyebrow}</p>
                  <Link to="/product/$productId" params={{ productId: p.id }} className="block mt-3 hover:text-coral transition-colors w-fit">
                    <h3 className="text-2xl font-bold">{p.title}</h3>
                  </Link>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75">{p.body}</p>

                  <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
                    {p.colors && p.colors.length > 0 && (
                      <div className="flex-1">
                        <label className="block text-sm font-semibold mb-2">Color</label>
                        <select
                          className="border border-hairline bg-transparent px-3 py-2 rounded text-sm w-full"
                          value={selectedOptions[p.id]?.color || (typeof p.colors[0] === 'string' ? p.colors[0] : (p.colors[0] as any).name) || ""}
                          onChange={(e) => handleOptionChange(p.id, "color", e.target.value)}
                        >
                          {p.colors.map((c) => {
                            const cName = typeof c === 'string' ? c : (c as any).name;
                            return (
                              <option key={cName} value={cName}>
                                {cName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    )}
                    {p.sizes && p.sizes.length > 0 && (
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
                    )}
                  </div>

                  <div className="mt-auto pt-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <p className="font-mono text-2xl font-bold leading-none">
                      ${p.price}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
                      <div className="flex items-center border border-hairline rounded font-semibold justify-center h-10">
                        <button 
                          type="button" 
                          onClick={() => handleOptionChange(p.id, "quantity", Math.max(1, (selectedOptions[p.id]?.quantity || 1) - 1))}
                          className="px-4 h-full hover:bg-black/5 transition-colors flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 min-w-[2ch] text-center">{selectedOptions[p.id]?.quantity || 1}</span>
                        <button 
                          type="button" 
                          onClick={() => handleOptionChange(p.id, "quantity", (selectedOptions[p.id]?.quantity || 1) + 1)}
                          className="px-4 h-full hover:bg-black/5 transition-colors flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      
                      <button type="button" onClick={() => handleAddToCart(p as any)} className="btn btn-coral h-10 px-6 w-full sm:w-auto">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
