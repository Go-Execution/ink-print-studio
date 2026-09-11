import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { INITIAL_PRODUCTS, getProductById, getProducts, getHexForColorName } from "@/lib/products";
import { useCart } from "@/lib/CartContext";
import { ArrowLeft, Shirt, Droplets, Ruler, CheckCircle, Truck, Star, CheckCircle2 } from "lucide-react";
import { ProductCarousel } from "@/components/udc/ProductCarousel";
import { Reveal } from "@/components/udc/Reveal";

export const Route = createFileRoute("/product/$productId")({
  component: ProductDetail,
  loader: async ({ params }) => {
    const product = await getProductById(params.productId);
    const allProducts = await getProducts();
    if (!product) {
      throw notFound();
    }
    return { product, allProducts };
  },
  notFoundComponent: () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Product Not Found</h1>
        <p className="text-ink/70 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="btn btn-coral">
          Back to Shop
        </Link>
      </div>
    );
  }
});

function ProductDetail() {
  const { product, allProducts } = Route.useLoaderData();
  const { addToCart } = useCart();
  
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.title,
      price: product.price,
      quantity: quantity,
      image: typeof selectedColor === 'object' ? `/products/${product.id}/${selectedColor.image}` : product.img,
      color: typeof selectedColor === 'string' ? selectedColor : selectedColor.name,
      size: selectedSize,
    });
  };

  const currentImage = typeof selectedColor === 'object' ? `/products/${product.id}/${selectedColor.image}` : product.img;

  return (
    <div className="mx-auto max-w-7xl px-5 py-20">
      <Link to="/shop" className="inline-flex items-center text-sm font-semibold hover:text-coral transition-colors mb-10">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
      </Link>
      
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Image */}
        <div className="ticket bg-bg p-0 overflow-hidden">
          <img 
            src={currentImage} 
            alt={product.alt} 
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col pt-4">
          <p className="spec text-cobalt mb-2">{product.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{product.title}</h1>
          <p className="text-xl font-mono font-bold mb-8">
            ${product.price}
            <span className="spec ml-2 text-ink/50 text-sm">{product.unit}</span>
          </p>
          
          <p className="text-lg text-ink/80 leading-relaxed mb-10 pb-10 border-b border-hairline">
            {product.body}
          </p>

          <div className="space-y-8 mb-10">
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Color</h3>
                <div className="flex flex-wrap gap-3 max-h-64 overflow-y-auto pr-2 pb-2 pt-1 pl-1">
                  {product.colors.map((color: any, idx) => {
                    const colorName = typeof color === 'string' ? color : color.name;
                    const isSelected = typeof selectedColor === 'string' ? selectedColor === colorName : selectedColor.name === colorName;
                    const hexCode = getHexForColorName(colorName);
                    return (
                      <button
                        key={colorName + idx}
                        onClick={() => setSelectedColor(color)}
                        title={colorName}
                        aria-label={colorName}
                        style={{ backgroundColor: hexCode }}
                        className={`w-8 h-8 rounded-full border transition-all ${
                          isSelected 
                            ? 'border-ink scale-110 shadow-md ring-2 ring-offset-2 ring-ink/20' 
                            : 'border-hairline shadow-sm hover:border-ink/40 hover:scale-105'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded text-sm transition-colors ${
                        selectedSize === size 
                          ? 'border-ink bg-ink text-bg' 
                          : 'border-hairline hover:border-ink/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border border-hairline rounded font-semibold w-full sm:w-auto h-[60px]">
              <button 
                type="button" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                className="px-6 h-full hover:bg-black/5 transition-colors flex items-center justify-center text-xl"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4 text-lg min-w-[3ch] text-center">{quantity}</span>
              <button 
                type="button" 
                onClick={() => setQuantity(quantity + 1)} 
                className="px-6 h-full hover:bg-black/5 transition-colors flex items-center justify-center text-xl"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            
            <button onClick={handleAddToCart} className="btn btn-coral flex-1 h-[60px] text-lg font-bold shadow-sm">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Product Features Section */}
      <Reveal className="mt-32">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-8 bg-white border border-hairline/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center mb-6 text-coral">
              <Shirt className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
            <p className="text-ink/70">
              Made from the finest materials to ensure long-lasting comfort and durability, wash after wash.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-white border border-hairline/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500">
              <Droplets className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Vibrant Prints</h3>
            <p className="text-ink/70">
              State-of-the-art DTG printing ensures our exclusive designs pop with vibrant colors that don't fade.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-white border border-hairline/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-500">
              <Ruler className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Perfect Fit</h3>
            <p className="text-ink/70">
              True-to-size retail fit that looks great on everyone. Check our size guide for exact measurements.
            </p>
          </div>
        </div>
      </Reveal>

      {/* How it Works Section */}
      <Reveal className="mt-32 border-t border-hairline pt-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Our Process</h2>
          <p className="text-ink/70 text-lg max-w-2xl mx-auto">
            Get your favorite gear in three simple steps. We make the process seamless from order to delivery.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/4 left-[16%] right-[16%] h-0.5 bg-hairline/50 -z-10" />
          
          <div className="flex flex-col items-center text-center bg-bg relative">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-coral flex items-center justify-center mb-6 text-coral font-bold text-xl shadow-lg">
              1
            </div>
            <div className="mb-4">
              <CheckCircle className="w-8 h-8 text-ink/40" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Choose Base</h3>
            <p className="text-ink/70 max-w-sm">
              Select from our premium catalog of apparel and accessories. Pick your preferred style, color, and size.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center bg-bg relative">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-coral flex items-center justify-center mb-6 text-coral font-bold text-xl shadow-lg">
              2
            </div>
            <div className="mb-4">
              <CheckCircle className="w-8 h-8 text-ink/40" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Secure Checkout</h3>
            <p className="text-ink/70 max-w-sm">
              Add to cart and checkout securely. We offer multiple payment options for your convenience.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center bg-bg relative">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-coral flex items-center justify-center mb-6 text-coral font-bold text-xl shadow-lg">
              3
            </div>
            <div className="mb-4">
              <Truck className="w-8 h-8 text-ink/40" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Fast Delivery</h3>
            <p className="text-ink/70 max-w-sm">
              We'll print and ship your order directly to your door, usually within 3-5 business days.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Reviews Section */}
      <Reveal className="mt-32 border-t border-hairline pt-32">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Customer Reviews</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-2xl font-bold">4.9</span>
            </div>
            <p className="text-ink/70 mb-8">
              Based on 124 verified reviews for this product.
            </p>
            <button className="btn btn-outline w-full">Write a Review</button>
          </div>
          
          <div className="md:w-2/3 grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-8 border border-hairline/50 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-ink/40 text-sm">2 days ago</span>
              </div>
              <h4 className="font-bold mb-2">Exceeded my expectations!</h4>
              <p className="text-ink/70 text-sm mb-6">
                "The print quality on this is phenomenal. The colors are so vibrant and it hasn't faded after multiple washes. Will definitely be ordering more for my team."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center font-bold">JD</div>
                <div>
                  <p className="font-semibold text-sm">James D.</p>
                  <p className="text-xs text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 border border-hairline/50 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-ink/40 text-sm">1 week ago</span>
              </div>
              <h4 className="font-bold mb-2">Super soft material</h4>
              <p className="text-ink/80 leading-relaxed mb-4">
                "I was worried about ordering apparel online but the material is genuinely premium. It fits perfectly and the quality looks exactly how I wanted it."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-coral text-white flex items-center justify-center font-bold">SA</div>
                <div>
                  <p className="font-semibold text-sm">Sarah A.</p>
                  <p className="text-xs text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Featured Collection */}
      <Reveal className="mt-32 border-t border-hairline pt-32 mb-20">
        <ProductCarousel title="You Might Also Like" products={allProducts.slice(0, 4)} />
      </Reveal>
    </div>
  );
}
