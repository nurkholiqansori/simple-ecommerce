import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description: "All Products",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    {children}
    </>
  );
}
