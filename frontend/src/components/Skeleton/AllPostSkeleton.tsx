export const AllPostSkeleton = () => {
    return (
        <div className="border-b-2 border-slate-200 m-4 bg-white p-4 rounded-md ">
            <div className="animate-pulse">
                {/* Author row */}
                <div className="flex items-center mb-3 space-x-3">
                    {/* Avatar skeleton */}
                    <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                    {/* Author name skeleton */}
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    {/* Circle */}
                    <div className="h-1 w-1 rounded-full bg-gray-200"></div>
                    {/* Date skeleton */}
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                
                {/* Title skeleton */}
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 font-bold"></div>
                
                {/* Content skeleton */}
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                
                {/* Read time skeleton */}
                <div className="h-4 bg-gray-200 rounded w-32 mt-3 mb-1"></div>
            </div>
        </div>
    );
};