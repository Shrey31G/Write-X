import { usePosts } from "../hooks";
import { AllPostSkeleton } from "../components/Skeleton/AllPostSkeleton";
import { PostCard } from "../components/PostCard";
import { Navbar } from "../components/Navbar";
import { SideBar } from "../components/Sidebar/SideBar";
import { FileText } from "lucide-react";

export const Home = () => {
    const { loading, posts } = usePosts();

    return (
        <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent opacity-30 animate-pulse-slow"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </div>

            <Navbar />

            <div className="w-full max-w-7xl min-h-screen mx-auto px-4 pb-24 md:pb-4 pt-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    <div className="lg:col-span-3 w-full relative z-10">
                        <SideBar />
                    </div>


                    <div className="lg:col-span-9 relative">
                        <div className="glass-container p-6 rounded-2xl mb-8">
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-500/10 p-2 rounded-lg">
                                    <FileText className="text-indigo-400" size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Latest Posts</h2>
                                    <p className="text-indigo-200/80 text-sm mt-1">
                                        Discover fresh content from our community
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {loading ? (
                                <>
                                    <AllPostSkeleton />
                                    <AllPostSkeleton />
                                    <AllPostSkeleton />
                                </>
                            ) : (
                                [...posts].reverse().map(post => (
                                    <div
                                        key={post.id}
                                        className="glass-container hover:bg-gray-800/50 transition-all duration-300"
                                    >
                                        <PostCard
                                            id={post.id}
                                            title={post.title}
                                            content={post.content}
                                            authorName={post.author.username || "Anonymous"}
                                            publishedDate="Today"
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}