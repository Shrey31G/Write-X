export const FullPostSkeleton = () => {
    return (
        <div className="bg-white max-w-3xl mx-auto p-8 sm:p-12 rounded-2xl shadow-2xl border border-gray-100 mt-4">
            <div className="animate-pulse">
                {/* Header section */}
                <header className="border-b pb-6 border-gray-200">
                    {/* Title skeleton */}
                    <div className="space-y-3 mb-4">
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>

                    {/* Author info section */}
                    <div className="flex items-center text-gray-600 space-x-4 mb-6">
                        {/* Avatar skeleton */}
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        
                        {/* Author details */}
                        <div>
                            <div className="flex items-center space-x-2">
                                <div className="h-5 bg-gray-200 rounded w-24"></div>
                            </div>
                        </div>
                        
                        {/* Read time skeleton */}
                        <div className="flex items-center space-x-2">
                            <div className="h-1 w-1 bg-gray-200 rounded-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </div>
                    </div>
                </header>

                {/* Content paragraphs */}
                <div className="space-y-6 mt-6">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
            </div>
        </div>
    );
};