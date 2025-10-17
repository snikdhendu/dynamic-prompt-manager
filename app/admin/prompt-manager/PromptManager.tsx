
"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { VersionDetailModal, type PromptVersion } from "./VersionDetailModal"

type PromptObject = {
    name: string
    versions: number[]
    productionVersion: number | null
}

type PromptManagerProps = {
    initialPrompts: PromptObject[]
}

export function PromptManager({ initialPrompts }: PromptManagerProps) {
    const router = useRouter()
    const [newPromptName, setNewPromptName] = useState("")
    const [newPromptContent, setNewPromptContent] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [modalData, setModalData] = useState<PromptVersion | null>(null)
    const [isModalLoading, setIsModalLoading] = useState(false)

    const handleCreateOrUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newPromptName || !newPromptContent) return
        setIsSubmitting(true)

        await fetch("/api/prompts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: newPromptName,
                prompt: newPromptContent,
                isActive: true,
            }),
        })

        setNewPromptName("")
        setNewPromptContent("")
        router.refresh()
        setIsSubmitting(false)
    }

    const handleVersionClick = async (promptName: string, versionNumber: number) => {
        setIsModalLoading(true)
        setModalData(null)

        try {
            const response = await fetch("/api/get-prompt-version", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: promptName, version: versionNumber }),
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error)

            setModalData({
                version: data.version,
                prompt: data.prompt,
                isActive: data.labels.includes("production"),
            })
        } catch (error) {
            console.error("Failed to fetch version details:", error)
        } finally {
            setIsModalLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <form onSubmit={handleCreateOrUpdate} className="bg-white border border-gray-200 rounded-lg p-7 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Create or Update Prompt</h2>
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Prompt Name</label>
                        <input
                            type="text"
                            placeholder="e.g., banner-ad-copy"
                            value={newPromptName}
                            onChange={(e) => setNewPromptName(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all bg-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Prompt Content</label>
                        <textarea
                            placeholder="Enter prompt with {{variables}}"
                            value={newPromptContent}
                            onChange={(e) => setNewPromptContent(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent font-mono text-sm h-32 resize-none transition-all bg-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-4 py-2.5 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSubmitting ? "Saving..." : "Save and Activate"}
                    </button>
                </div>
            </form>

            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Existing Prompts</h2>
                {initialPrompts.length > 0 ? (
                    <div className="space-y-3">
                        {initialPrompts.map((prompt) => (
                            <div key={prompt.name} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                                <h3 className="text-base font-semibold text-gray-900 font-mono mb-3">{prompt.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {prompt.versions
                                        .sort((a, b) => b - a)
                                        .map((version) => {
                                            const isActive = version === Math.max(...prompt.versions)
                                            return (
                                                <button
                                                    key={version}
                                                    onClick={() => handleVersionClick(prompt.name, version)}
                                                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${isActive
                                                        ? "bg-gray-800 text-white hover:bg-gray-700"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                        }`}
                                                >
                                                    v{version}
                                                    {isActive && <span className="ml-1 inline-block">(active)</span>}
                                                </button>
                                            )
                                        })}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                        <p className="text-gray-600">No prompts found. Create one using the form above.</p>
                    </div>
                )}
            </div>

            <VersionDetailModal version={modalData} onClose={() => setModalData(null)} isLoading={isModalLoading} />
        </div>
    )
}
