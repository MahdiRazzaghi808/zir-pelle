import "@/app/fonts.css"
import "./globals.css"
import { ApiProvider } from "@/api/providers/api-provider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ApiProvider>{children}</ApiProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
