import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would process payment here
    clearCart();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 size={80} className="text-coral" />
        </div>
        <h1 className="text-4xl font-bold font-display uppercase tracking-normal">Order Confirmed</h1>
        <p className="mt-4 text-ink/70 text-lg">
          Thank you for your purchase. We've received your order and will begin processing it shortly.
        </p>
        <div className="mt-10">
          <Link to="/" className="btn btn-ink inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="text-3xl font-bold font-display uppercase tracking-normal">Your cart is empty</h1>
        <p className="mt-4 text-ink/70">Looks like you haven't added anything to your cart yet.</p>
        <div className="mt-8">
          <Link to="/shop" className="btn btn-coral">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold font-display uppercase tracking-normal">Checkout</h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="bg-bg border border-hairline p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-6 border-b border-hairline pb-4 tracking-normal">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Email address</label>
                  <input type="email" required className="w-full border border-hairline bg-transparent px-4 py-3 rounded outline-none focus:border-cobalt transition-colors" placeholder="you@example.com" />
                </div>
              </div>
            </section>

            <section className="bg-bg border border-hairline p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-6 border-b border-hairline pb-4 tracking-normal">Shipping Address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">First name</label>
                  <input type="text" required className="w-full border border-hairline bg-transparent px-4 py-3 rounded outline-none focus:border-cobalt transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Last name</label>
                  <input type="text" required className="w-full border border-hairline bg-transparent px-4 py-3 rounded outline-none focus:border-cobalt transition-colors" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Address</label>
                  <input type="text" required className="w-full border border-hairline bg-transparent px-4 py-3 rounded outline-none focus:border-cobalt transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">City</label>
                  <input type="text" required className="w-full border border-hairline bg-transparent px-4 py-3 rounded outline-none focus:border-cobalt transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Postal code</label>
                  <input type="text" required className="w-full border border-hairline bg-transparent px-4 py-3 rounded outline-none focus:border-cobalt transition-colors" />
                </div>
              </div>
            </section>

            <section className="bg-bg border border-hairline p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-6 border-b border-hairline pb-4 tracking-normal">Payment</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Card number</label>
                  <input type="text" required placeholder="0000 0000 0000 0000" className="w-full border border-hairline bg-transparent px-4 py-3 rounded outline-none focus:border-cobalt transition-colors" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Expiration date (MM/YY)</label>
                    <input type="text" required placeholder="MM/YY" className="w-full border border-hairline bg-transparent px-4 py-3 rounded outline-none focus:border-cobalt transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">CVC</label>
                    <input type="text" required placeholder="123" className="w-full border border-hairline bg-transparent px-4 py-3 rounded outline-none focus:border-cobalt transition-colors" />
                  </div>
                </div>
              </div>
            </section>

            <button type="submit" className="btn btn-coral w-full py-4 text-lg">
              Pay ${cartTotal.toFixed(2)}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-ink text-bg p-6 sm:p-8 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-6 border-b border-bg/15 pb-4 tracking-normal">Order Summary</h2>
          
          <div className="space-y-6 mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded bg-bg/10" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{item.name}</h4>
                  <p className="text-xs text-bg/60 mt-1">
                    {item.color} {item.size && `| ${item.size}`}
                  </p>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-bg/60">Qty: {item.quantity}</span>
                    <span className="font-mono font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-bg/15 pt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-bg/70">Subtotal</span>
              <span className="font-mono">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-bg/70">Shipping</span>
              <span className="font-mono">{cartTotal > 50 ? 'Free' : '$5.00'}</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-bg/15 text-lg font-bold">
              <span>Total</span>
              <span className="font-mono">${(cartTotal > 50 ? cartTotal : cartTotal + 5).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
