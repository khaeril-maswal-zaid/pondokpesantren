export default function Loading() {
    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div className="h-8 w-64 animate-pulse rounded bg-gray-200"></div>
            </div>

            <div className="rounded-lg border bg-white shadow-sm">
                <div className="border-b p-4">
                    <div className="flex items-center justify-between">
                        <div className="h-6 w-40 animate-pulse rounded bg-gray-200"></div>
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-[250px] animate-pulse rounded bg-gray-200"></div>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <div className="space-y-4">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="h-16 animate-pulse rounded bg-gray-200"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
