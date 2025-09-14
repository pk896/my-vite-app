// Fetch products from backend API
export async function fetchProducts() {
  const res = await fetch("https://my-express-server-rq4a.onrender.com/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  const products = await res.json();
  return products;
}
