import { ThemeProvider } from "@/src/provider/theme-provider";
import "./globals.css";
import { ConvexClientProvider } from "../provider/ConvexClientProvider";
import { Toaster } from "@/src/components/ui/sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aprin | Blog",
};
export default async function RootLayout({
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
          <main className="px-8">
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </main>
          <Toaster closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
