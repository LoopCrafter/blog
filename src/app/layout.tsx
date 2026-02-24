import { ThemeProvider } from "@/src/components/shared/theme-provider";
import "./globals.css";
import { Navbar } from "@/src/components/shared/navbar";
import { ConvexClientProvider } from "../provider/ConvexClientProvider";

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
          {/* <Navbar /> */}
          <ConvexClientProvider>
            <main className="px-4">{children}</main>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
