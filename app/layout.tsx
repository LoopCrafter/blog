import { ThemeProvider } from "@/components/shared/theme-provider";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="px-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
