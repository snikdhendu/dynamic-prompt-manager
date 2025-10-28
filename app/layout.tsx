// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dynamic Prompt Manager",
    description: "Prompt Management System",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="bg-gray-50 min-h-screen">{children}</div>
            </body>
        </html>
    );
}
