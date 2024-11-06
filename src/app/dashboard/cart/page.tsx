import { Metadata } from "next";
import { cookies } from "next/headers";
import { products, type Product } from "@/data/products";
import { ItemCard } from "@/shopping-cart";
import { WidgetItem } from "@/components";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Products into the shopping cart",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === id);

    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }

  return productsInCart;
};

export default async function CartPage() {
  const cookieStore = await cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}") as { [id: string]: number };
  const productsInCart = getProductsInCart(cart);

  const totalToPay = productsInCart.reduce((prev, current) => current.product.price * current.quantity + prev, 0);

  return (
    <div>
      <h1 className="text-5xl">Products into the shopping cart</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Paid Total">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">${(totalToPay * 1.16).toFixed(2)}</h3>
            </div>
            <span className="font-bold text-center text-gray-500">TAX(16%): {(totalToPay * 0.16).toFixed(2)}</span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
