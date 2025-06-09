
export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" dir="rtl">
            <body>
                <p>test75</p>
                <div>{children}</div>
            </body>
        </html>
    );
}
