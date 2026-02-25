import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TalentHub — Conecta talento con oportunidades",
  description:
    "La plataforma que conecta suplidores de talento con las mejores oportunidades.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
