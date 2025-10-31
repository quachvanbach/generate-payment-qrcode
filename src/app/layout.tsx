import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thanh toán Đơn hàng",
  description: "Created by Quách KaKa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
