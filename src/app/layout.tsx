// This layout is only used for 404/500 pages outside of the [locale] scope
// or initial redirect. The main app layout is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
