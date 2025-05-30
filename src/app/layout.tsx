import "@/app/fonts.css"
import "./globals.css"
import { ApiProvider } from "@/api/providers/api-provider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ApiProvider>{children}</ApiProvider>
      </body>
    </html>
  );
}
