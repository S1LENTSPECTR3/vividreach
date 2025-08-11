import "./globals.css";

export const metadata = {
  title: "VividReach Marketing",
  description: "Profit-first SEM: PPC, SEO, CRO.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">{children}</body>
    </html>
  );
}
