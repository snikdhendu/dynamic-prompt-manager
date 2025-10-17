

export type PromptVersion = {
    version: number
    prompt: string
    isActive: boolean
}

type VersionDetailModalProps = {
    version: PromptVersion | null
    onClose: () => void
    isLoading?: boolean
}

function extractVariables(text: string): string[] {
    if (!text) return []
    const regex = /{{\s*(\w+)\s*}}/g
    const matches = [...text.matchAll(regex)]
    return Array.from(new Set(matches.map((match) => match[1])))
}

function LoadingSkeleton() {
    return (
        <div className="fixed inset-0 backdrop-blur-md bg-white/10 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-3 animate-pulse"></div>
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-100 rounded animate-pulse"></div>
                            <div className="h-3 bg-gray-100 rounded animate-pulse"></div>
                            <div className="h-3 bg-gray-100 rounded w-5/6 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="h-4 bg-gray-200 rounded w-32 mb-3 animate-pulse"></div>
                        <div className="flex gap-2">
                            <div className="h-6 bg-gray-200 rounded px-2 w-20 animate-pulse"></div>
                            <div className="h-6 bg-gray-200 rounded px-2 w-20 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function VersionDetailModal({ version, onClose, isLoading = false }: VersionDetailModalProps) {
    if (isLoading) {
        return <LoadingSkeleton />
    }

    if (!version) return null

    const variables = extractVariables(version.prompt)

    return (
        <div
            className="fixed inset-0 backdrop-blur-md bg-white/10 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Version {version.version}
                        {version.isActive && (
                            <span className="ml-2 text-xs font-medium bg-gray-800 text-white px-2 py-0.5 rounded-full">Active</span>
                        )}
                    </h3>
                </div>
                <div className="p-6 overflow-y-auto">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Text Prompt</h4>
                    <pre className="bg-gray-50 p-4 rounded-md font-mono text-sm text-gray-800 whitespace-pre-wrap break-words">
                        {version.prompt}
                    </pre>
                    {variables.length > 0 && (
                        <>
                            <h4 className="text-sm font-semibold text-gray-700 mt-6 mb-2">Available variables</h4>
                            <div className="flex flex-wrap gap-2">
                                {variables.map((variable) => (
                                    <span key={variable} className="bg-gray-200 text-gray-800 text-xs font-mono px-2 py-1 rounded">
                                        {variable}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div className="p-4 border-t border-gray-200 text-right">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
