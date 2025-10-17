
import { langfuse } from "@/lib/langfuse-server"
import { PromptManager } from "./PromptManager"
import Link from "next/link"

export const revalidate = 0

export default async function PromptManagerPage() {
    const promptsList = await langfuse.api.promptsList({})

    const initialPrompts = promptsList.data.map((prompt: any) => ({
        ...prompt,
        productionVersion: prompt.productionVersion ?? null,
    }))

    return (
        <main className="relative min-h-screen bg-white overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                    mask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)",
                    WebkitMask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)",
                }}
            />

            <Link
                href="/"
                className="fixed top-6 right-6 z-40 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors shadow-sm"
            >
                Back to Banner Maker
            </Link>

            <div className="relative container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-2xl">
                    <PromptManager initialPrompts={initialPrompts} />
                </div>
            </div>
        </main>
    )
}
