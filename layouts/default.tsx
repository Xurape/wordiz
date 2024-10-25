import type { Metadata } from "next";
import styles from "@/styles/layouts/default.module.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Wordiz | Level up your vocabulary",
  description:
    "Wordiz is a small platform to help you level up your vocabulary",
};

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
