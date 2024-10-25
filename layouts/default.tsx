import styles from "@/styles/layouts/default.module.css";
import Footer from "@/components/footer";
import Topbar from "@/components/topbar";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Topbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
