import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { collection, query, orderBy, onSnapshot, updateDoc, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { Trash2, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
  
  // New Product Form State
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (authLoading || !isAdmin) {
        setLoadingOrders(false);
        setLoadingProducts(false);
        return;
    }
    const qOrders = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribeOrders = onSnapshot(qOrders, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
      setLoadingOrders(false);
    });

    const qProducts = query(collection(db, "products"));
    const unsubscribeProducts = onSnapshot(qProducts, (querySnapshot) => {
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      setLoadingProducts(false);
    });

    return () => {
      unsubscribeOrders();
      unsubscribeProducts();
    };
  }, [authLoading, isAdmin]);

  const handleResetProducts = async () => {
    if (!confirm("Are you sure? This will reset all default products to their initial states in Firestore.")) return;
    try {
      const { INITIAL_PRODUCTS } = await import("@/lib/products");
      for (const p of INITIAL_PRODUCTS) {
        await updateDoc(doc(db, "products", p.id), p).catch(async () => {
          await setDoc(doc(db, "products", p.id), p);
        });
      }
      alert("Default products have been successfully synced to Firestore!");
    } catch (err) {
      console.error(err);
      alert("Error syncing products.");
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select an image");
    
    const cloudName = import.meta.env['VITE_CLOUDINARY_CLOUD_NAME'];
    const uploadPreset = import.meta.env['VITE_CLOUDINARY_UPLOAD_PRESET'];

    if (!cloudName || !uploadPreset) {
      return alert("Cloudinary configuration missing in .env.local");
    }

    setIsUploading(true);
    try {
      // 1. Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error?.message || "Image upload failed");
      
      const imageUrl = data.secure_url;

      // 2. Add to Firestore
      await addDoc(collection(db, "products"), {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        description: newProduct.description,
        image: imageUrl,
        colors: ["Black", "White"], // Default placeholders, could be expanded
        sizes: ["S", "M", "L", "XL"]
      });

      // Reset form
      setNewProduct({ name: "", price: "", description: "" });
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      alert("Product added successfully!");

    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Check console.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  if (authLoading) return <div className="p-10 text-center">Loading...</div>;
  if (!isAdmin) return (
    <div className="p-20 text-center max-w-2xl mx-auto">
      <h1 className="text-3xl font-display uppercase tracking-widest font-bold mb-4 text-red-600">Unauthorized</h1>
      <p className="text-ink/60 mb-8">You do not have permission to access the admin dashboard.</p>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <h1 className="text-4xl font-bold font-display uppercase tracking-normal mb-8">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex gap-4 border-b border-hairline mb-8">
        <button 
          onClick={() => setActiveTab("orders")}
          className={`pb-4 px-2 font-semibold uppercase tracking-wider text-sm transition-colors ${activeTab === "orders" ? "border-b-2 border-ink text-ink" : "text-ink/50 hover:text-ink"}`}
        >
          Orders
        </button>
        <button 
          onClick={() => setActiveTab("products")}
          className={`pb-4 px-2 font-semibold uppercase tracking-wider text-sm transition-colors ${activeTab === "products" ? "border-b-2 border-ink text-ink" : "text-ink/50 hover:text-ink"}`}
        >
          Products
        </button>
      </div>
      
      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div>
          {loadingOrders ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-ink/60 bg-hairline/10 p-8 rounded text-center">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="p-4 font-semibold">Order ID & Date</th>
                    <th className="p-4 font-semibold">Customer</th>
                    <th className="p-4 font-semibold">Items</th>
                    <th className="p-4 font-semibold text-right">Total</th>
                    <th className="p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-hairline/50 hover:bg-black/5 transition-colors">
                      <td className="p-4 align-top">
                        <p className="font-mono text-xs text-ink/50 mb-1">{order.id}</p>
                        <p>{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </td>
                      <td className="p-4 align-top">
                        <p className="font-semibold">{order.customer?.firstName} {order.customer?.lastName}</p>
                        <p className="text-sm text-ink/70">{order.customer?.email}</p>
                        <p className="text-sm text-ink/70 mt-2">
                          {order.customer?.address},<br/>
                          {order.customer?.city}, {order.customer?.postalCode}
                        </p>
                      </td>
                      <td className="p-4 align-top min-w-[250px]">
                        <div className="space-y-3">
                          {order.items?.map((item: any, idx: number) => (
                            <div key={idx} className="flex gap-3 text-sm">
                              <img src={item.image} alt="" className="w-10 h-10 object-cover rounded bg-hairline/50" />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-ink/60">Qty: {item.quantity} | {item.color} | {item.size}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 align-top text-right">
                        <p className="font-mono font-bold">${order.total?.toFixed(2)}</p>
                      </td>
                      <td className="p-4 align-top">
                        <select
                          className={`text-sm px-3 py-1.5 rounded-full font-semibold appearance-none cursor-pointer border ${
                            order.status === 'Pending' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                            order.status === 'Shipped' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                            'bg-gray-100 text-gray-800 border-gray-200'
                          }`}
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Add New Product Form */}
          <div className="lg:col-span-1">
            <div className="bg-hairline/10 p-6 rounded border border-hairline sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold uppercase tracking-wider font-display">Add New Product</h2>
                <button 
                  onClick={handleResetProducts} 
                  className="text-xs bg-red-100 text-red-600 hover:bg-red-200 px-2 py-1 rounded transition-colors border border-red-200"
                  title="Reset Default Products in Firestore"
                >
                  Sync Defaults
                </button>
              </div>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Product Name</label>
                  <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full border border-hairline p-2 rounded bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Price ($)</label>
                  <input required type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full border border-hairline p-2 rounded bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Description</label>
                  <textarea required rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full border border-hairline p-2 rounded bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Product Image</label>
                  <label className="flex items-center gap-2 cursor-pointer border border-dashed border-hairline p-4 rounded bg-white hover:bg-hairline/10 transition-colors justify-center">
                    <ImageIcon className="w-5 h-5 text-ink/60" />
                    <span className="text-sm font-medium">{imageFile ? imageFile.name : "Select Image"}</span>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="hidden" />
                  </label>
                </div>
                
                <button type="submit" disabled={isUploading} className="w-full btn mt-2 disabled:opacity-50">
                  {isUploading ? "Uploading..." : "Publish Product"}
                </button>
              </form>
            </div>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wider font-display">Manage Products</h2>
            {loadingProducts ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-ink/60">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map(product => (
                  <div key={product.id} className="border border-hairline rounded p-4 flex gap-4 bg-white items-start">
                    <img src={product.image} alt={product.name} className="w-20 h-24 object-cover bg-hairline/20 rounded" />
                    <div className="flex-1">
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-ink/60 text-sm mb-2">${product.price}</p>
                      <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 text-sm flex items-center gap-1 hover:text-red-600">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      )}

    </div>
  );
}
