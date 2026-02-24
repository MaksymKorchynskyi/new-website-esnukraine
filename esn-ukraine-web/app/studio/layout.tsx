export default function StudioLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="sanity-studio-wrapper" style={{ height: "100vh" }}>
            {children}
        </div>
    );
}
