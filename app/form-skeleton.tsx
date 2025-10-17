export function FormSkeleton() {
    return (
        <div className="space-y-5 animate-pulse">
            <div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-11 bg-gray-100 border border-gray-200 rounded-lg"></div>
            </div>
            <div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-11 bg-gray-100 border border-gray-200 rounded-lg"></div>
            </div>
            <div className="h-11 bg-gray-300 rounded-lg"></div>
        </div>
    )
}
