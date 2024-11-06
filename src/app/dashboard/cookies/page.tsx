import { Metadata } from "next";
import { cookies } from "next/headers";
import { TabBar } from "@/components";

export const metadata: Metadata = {
  title: "Cookies Page",
  description: "Cookies into the client side example",
};

export default async function CookiesPage() {
  const cookieStore = await cookies();
  const selectedTab = Number(cookieStore.get("selectedTab")?.value ?? "1");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl mb-2">Tabs</span>
        <TabBar activeTab={isNaN(selectedTab) ? 1 : selectedTab} />
      </div>
    </div>
  );
}
