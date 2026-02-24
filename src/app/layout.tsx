import { ThemeProvider } from "@/src/components/shared/theme-provider";
import "./globals.css";
import { ConvexClientProvider } from "../provider/ConvexClientProvider";
import { getToken } from "@/lib/auth-server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();
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
          <ConvexClientProvider initialToken={token}>
            <main className="px-4">{children}</main>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
