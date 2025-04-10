import type { Metadata } from "next";
import "./globals.css";
import "./normalize.css";

export const metadata: Metadata = {
  title: "kanbam",
  description: "Para você que deseja organizar suas tarefas!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
