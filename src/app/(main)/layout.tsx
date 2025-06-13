
export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <p>test75</p>
            <div>{children}</div>
        </div>
    );
}
