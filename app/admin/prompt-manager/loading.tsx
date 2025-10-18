export default function Loading() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-white mt-13">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)]"></div>

            <div className="relative flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-2xl">

                    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">

                        <div className="h-6 bg-gray-200 rounded-md w-32 mb-6 animate-pulse"></div>


                        <div className="space-y-4">

                            <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>


                            <div className="h-24 bg-gray-100 rounded-md animate-pulse"></div>


                            <div className="h-10 bg-gray-300 rounded-md animate-pulse"></div>
                        </div>
                    </div>


                    <div className="mt-8 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                                <div className="h-5 bg-gray-200 rounded-md w-40 mb-3 animate-pulse"></div>
                                <div className="h-4 bg-gray-100 rounded-md w-full mb-4 animate-pulse"></div>
                                <div className="flex gap-2">
                                    <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                                    <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
