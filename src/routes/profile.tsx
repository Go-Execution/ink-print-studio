import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;
      try {
        const q = query(
          collection(db, "orders"),
          where("customer.email", "==", user.email),
        );
        const querySnapshot = await getDocs(q);
        
        // Sorting client-side to avoid needing a composite index immediately for this query
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (authLoading) return <div className="p-10 text-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <div className="flex justify-between items-end mb-10 border-b border-hairline pb-6">
        <div>
          <h1 className="text-4xl font-bold font-display uppercase tracking-normal mb-2">My Account</h1>
          <p className="text-ink/60">Logged in as: <span className="font-semibold text-ink">{user.email}</span></p>
        </div>
        <button 
          onClick={() => {
            logout();
            navigate({ to: "/" });
          }}
          className="btn px-4 py-2 text-sm border border-hairline hover:bg-hairline/20"
        >
          Sign Out
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      
      {loadingOrders ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <div className="bg-hairline/10 p-10 text-center rounded border border-hairline">
          <p className="text-ink/60 mb-4">You haven't placed any orders yet.</p>
          <button onClick={() => navigate({ to: "/shop" })} className="btn px-6 py-3 bg-ink text-bg">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-hairline p-6 rounded bg-white">
              <div className="flex flex-wrap justify-between gap-4 mb-4 border-b border-hairline pb-4">
                <div>
                  <p className="text-sm text-ink/60 uppercase tracking-wider font-semibold">Order Placed</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-ink/60 uppercase tracking-wider font-semibold">Total</p>
                  <p className="font-medium">${order.total?.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-ink/60 uppercase tracking-wider font-semibold">Status</p>
                  <p className={`font-semibold ${
                    order.status === 'Pending' ? 'text-amber-600' :
                    order.status === 'Shipped' ? 'text-emerald-600' :
                    'text-ink'
                  }`}>
                    {order.status}
                  </p>
                </div>
                <div className="text-right flex-grow">
                  <p className="text-sm text-ink/60 uppercase tracking-wider font-semibold">Order ID</p>
                  <p className="font-mono text-sm">{order.id}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {order.items?.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded bg-hairline/30" />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-ink/60">Color: {item.color} | Size: {item.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-ink/60">Qty: {item.quantity}</p>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
