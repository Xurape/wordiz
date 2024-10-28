import Footer from "@/components/footer";
import Topbar from "@/components/topbar";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="app">
      <Topbar />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
}
