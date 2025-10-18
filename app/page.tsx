'use client';

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FormSkeleton } from "./form-skeleton";

export default function BannerMakerPage() {

    // State for the dropdown
    const [promptList, setPromptList] = useState<string[]>([]);
    const [selectedPrompt, setSelectedPrompt] = useState<string>("");

    // State for the dynamic form fields
    const [variables, setVariables] = useState<string[]>([]);
    const [userInputs, setUserInputs] = useState<Record<string, string>>({});

    // State for results and loading
    const [result, setResult] = useState("");
    const [isFetchingPromptList, setIsFetchingPromptList] = useState(true);
    const [isFetchingVariables, setIsFetchingVariables] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Runs once to get the list of all available prompts for the dropdown
    useEffect(() => {
        async function fetchPromptList() {
            try {
                const response = await fetch("/api/get-active-prompt-details");
                const data = await response.json();
                if (!response.ok) throw new Error("Failed to fetch prompt list");

                setPromptList(data.promptNames);

                if (data.promptNames && data.promptNames.length > 0) {
                    setSelectedPrompt(data.promptNames[0]);
                }
            } catch (error) {
                console.error(error);
                setResult("Error: Could not load prompt list.");
            } finally {
                setIsFetchingPromptList(false);
            }
        }
        fetchPromptList();
    }, []);

    // Runs whenever the 'selectedPrompt' changes
    useEffect(() => {
        if (!selectedPrompt) return;

        async function fetchPromptVariables() {
            setIsFetchingVariables(true);
            setVariables([]);
            try {

                const response = await fetch(`/api/get-active-prompt-details?name=${selectedPrompt}`);
                const data = await response.json();
                if (!response.ok) throw new Error(`Failed to fetch variables for ${selectedPrompt}`);


                setVariables(data.variables);
                const initialInputs: Record<string, string> = {};
                for (const variable of data.variables) {
                    initialInputs[variable] = "";
                }
                setUserInputs(initialInputs);
            } catch (error) {
                console.error(error);
                setResult(`Error: Could not load details for prompt "${selectedPrompt}".`);
            } finally {
                setIsFetchingVariables(false);
            }
        }
        fetchPromptVariables();
    }, [selectedPrompt]);

    const handleInputChange = (variableName: string, value: string) => {
        setUserInputs((prevInputs) => ({ ...prevInputs, [variableName]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        setResult("");

        const trimmedInputs: Record<string, string> = {};
        for (const key in userInputs) {
            trimmedInputs[key] = userInputs[key].trim();
        }

        try {
            const response = await fetch("/api/generate-banner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    promptName: selectedPrompt,
                    variables: trimmedInputs,
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Something went wrong");
            setResult(data.result);
        } catch (error: any) {
            setResult(`Error: ${error.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <main className="relative min-h-screen bg-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{

                backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,

                backgroundSize: "50px 50px",

                mask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",

                WebkitMask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",

            }} />
            <Link href="/admin/prompt-manager" className="fixed top-6 right-6 z-50 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 shadow-sm">
                Manage Prompts
            </Link>
            <div className="relative container mx-auto px-4 py-20 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md">
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 rounded-lg p-7 shadow-sm">
                        {isFetchingPromptList ? (
                            <FormSkeleton />
                        ) : (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2">Select Prompt</label>
                                    <select
                                        value={selectedPrompt}
                                        onChange={(e) => setSelectedPrompt(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
                                        disabled={promptList.length === 0}
                                    >
                                        {promptList.map(name => <option key={name} value={name}>{name}</option>)}
                                    </select>
                                </div>

                                {isFetchingVariables ? <FormSkeleton isPartial={true} /> : (
                                    variables.map((variable) => (
                                        <div key={variable}>
                                            <label className="block text-sm font-medium text-gray-900 mb-2 capitalize">{variable.replace(/_/g, " ")}</label>
                                            <input type="text" placeholder={`Enter the ${variable.replace(/_/g, " ")}`} value={userInputs[variable] || ""} onChange={(e) => handleInputChange(variable, e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" required />
                                        </div>
                                    ))
                                )}

                                <button type="submit" disabled={isGenerating || isFetchingPromptList || isFetchingVariables} className="w-full px-4 py-2.5 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 disabled:bg-gray-400">
                                    {isGenerating ? "Generating..." : "Generate Banner"}
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>
            {result && (
                <div className="relative container mx-auto px-4 py-16 -mt-32">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Generated Content</h2>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <pre className="font-mono text-sm text-gray-700 whitespace-pre-wrap">{result}</pre>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}