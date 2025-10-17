"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { FormSkeleton } from "./form-skeleton"

export default function BannerMakerPage() {
    const [variables, setVariables] = useState<string[]>([])
    const [userInputs, setUserInputs] = useState<Record<string, string>>({})
    const [result, setResult] = useState("")
    const [isFetchingPrompt, setIsFetchingPrompt] = useState(true)
    const [isGenerating, setIsGenerating] = useState(false)

    useEffect(() => {
        async function fetchPromptDetails() {
            try {
                const response = await fetch("/api/get-active-prompt-details")
                if (!response.ok) {
                    throw new Error("Failed to fetch active prompt")
                }
                const data = await response.json()
                setVariables(data.variables)
                const initialInputs: Record<string, string> = {}
                for (const variable of data.variables) {
                    initialInputs[variable] = ""
                }
                setUserInputs(initialInputs)
            } catch (error) {
                console.error(error)
                setResult("Error: Could not load the active prompt. Please check the admin panel.")
            } finally {
                setIsFetchingPrompt(false)
            }
        }
        fetchPromptDetails()
    }, [])

    const handleInputChange = (variableName: string, value: string) => {
        setUserInputs((prevInputs) => ({
            ...prevInputs,
            [variableName]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsGenerating(true)
        setResult("")
        try {
            const response = await fetch("/api/generate-banner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    promptName: "new-check",
                    variables: userInputs,
                }),
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.error || "Something went wrong")
            }
            setResult(data.result)
        } catch (error: any) {
            setResult(`Error: ${error.message}`)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <main className="relative min-h-screen bg-white overflow-hidden border border-gray-200 rounded-lg p-7 shadow-sm">
            {/* Grid background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                    mask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                    WebkitMask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
            />

            <Link
                href="/admin/prompt-manager"
                className="fixed top-6 right-6 z-50 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors shadow-sm"
            >
                Manage Prompts
            </Link>

            {/* Form section */}
            <div className="relative container mx-auto px-4 py-20 flex items-center justify-center min-h-screen ">
                <div className="w-full max-w-md">
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 rounded-lg p-7 shadow-sm">
                        {isFetchingPrompt ? (
                            <FormSkeleton />
                        ) : (
                            <>
                                {variables.map((variable) => (
                                    <div key={variable}>
                                        <label className="block text-sm font-medium text-gray-900 mb-2 capitalize">
                                            {variable.replace(/_/g, " ")}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder={`Enter the ${variable.replace(/_/g, " ")}`}
                                            value={userInputs[variable] || ""}
                                            onChange={(e) => handleInputChange(variable, e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all bg-white"
                                            required
                                        />
                                    </div>
                                ))}
                                <button
                                    type="submit"
                                    disabled={isGenerating || isFetchingPrompt || variables.length === 0}
                                    className="w-full px-4 py-2.5 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isGenerating ? "Generating..." : "Generate Banner"}
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>

            {/* Result section */}
            {result && (
                <div className="relative container mx-auto px-4 py-16">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Generated Content</h2>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <pre className="font-mono text-sm text-gray-700 whitespace-pre-wrap break-words">{result}</pre>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
