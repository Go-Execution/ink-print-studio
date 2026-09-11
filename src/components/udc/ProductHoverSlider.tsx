import { useState, useEffect } from "react";
import type { Product } from "@/lib/products";

export function ProductHoverSlider({ product }: { product: Product & { image?: string } }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const mainImage = product.image || product.img;

  const images = [
    mainImage,
    ...(product.colors 
      ? product.colors.map(c => {
          if (typeof c === 'string') return '';
          if (!c.image) return '';
          if (c.image.startsWith('http') || c.image.startsWith('/')) return c.image;
          // For static products, prepend the path
          return `/products/${product.id}/${c.image}`;
        }).filter(Boolean)
      : []
    )
  ].filter(Boolean);

  // Get unique images and limit to max 8 to prevent infinite sliding of 43 images
  const slideImages = Array.from(new Set(images)).slice(0, 8);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isHovered && slideImages.length > 1) {
      interval = setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % slideImages.length);
      }, 1000); 
    } else {
      setCurrentIdx(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, slideImages.length]);

  return (
    <div 
      className="relative aspect-square w-full overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIdx * 100}%)` }}
      >
        {slideImages.map((img, idx) => (
          <img
            key={img + idx}
            src={img}
            alt={product.alt}
            loading="lazy"
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
      
      {/* Progress Dots */}
      {slideImages.length > 1 && (
        <div className={`absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {slideImages.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
