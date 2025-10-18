export function FormSkeleton({ isPartial = false }: { isPartial?: boolean }) {
    return (
        <div className="space-y-6 animate-pulse">
            {!isPartial && (
                <div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-11 bg-gray-100 rounded-lg"></div>
                </div>
            )}
            <div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-11 bg-gray-100 rounded-lg"></div>
            </div>
            <div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-11 bg-gray-100 rounded-lg"></div>
            </div>
        </div>
    )
}
