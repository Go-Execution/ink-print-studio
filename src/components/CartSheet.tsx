import { useCart } from "@/lib/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Link } from "@tanstack/react-router";
import { X, Trash2 } from "lucide-react";

export function CartSheet() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, cartTotal } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            {cartItems.length === 0 ? "Your cart is empty." : `You have ${cartItems.length} item(s).`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mt-6 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 border-b border-hairline pb-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-hairline" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-ink/70">
                    {item.color} {item.size && `| Size: ${item.size}`}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm">Qty: {item.quantity}</p>
                  <p className="font-mono font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="text-ink/50 hover:text-coral transition-colors"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-hairline pt-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-mono font-bold text-xl">${cartTotal.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="btn btn-ink w-full text-center block py-3"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
