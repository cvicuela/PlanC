import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TalentHub — Dashboard",
  description: "Panel de administración y backoffice de TalentHub.",
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
