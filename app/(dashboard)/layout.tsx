import { HistoryContextProvider } from "@/components/history-context";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { checkSubscription } from "@/components/subscription";
import { getApiLimitCount } from "@/lib/api-limit";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-50 bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        <HistoryContextProvider>{children}</HistoryContextProvider>
      </main>
    </div>
  );
};

export default Layout;
