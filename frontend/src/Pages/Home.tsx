import { usePosts } from "../hooks";
import { AllPostSkeleton } from "../components/Skeleton/AllPostSkeleton";
import { PostCard } from "../components/PostCard";

import { Navbar } from "../components/Navbar";
import { SideBar } from "../components/Sidebar/SideBar";
import { FileText } from "lucide-react";

export const Home = () => {
    const { loading, posts } = usePosts();

    return (

        <div className="min-h-screen overflow-hidden bg-black dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative">

            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            <Navbar />

            <div className="w-full md:w-[70%] min-h-screen mx-auto px-4 rounded-xl pb-24 md:pb-4 pt-[5rem] relative z-10">

                <div className="grid grid-cols-1 md:grid-cols-12 mx-auto">
                    <div className="md:h-full md:col-span-3 w-full md:flex md:justify-center relative z-10   md:overflow-auto" >
                        <SideBar />
                    </div>

                    <div className="col-span-1 md:col-span-9 relative md:pl-12">
                        <div className="flex items-center gap-3 mb-6 mt-4 pl-7">
                            <FileText className="text-blue-400" size={24} />
                            <h2 className="text-xl font-semibold text-white">Latest Posts</h2>
                        </div>

                        <div className="pl-8 md:pl-4">
                            {loading ? (
                                <>
                                    <AllPostSkeleton />
                                    <AllPostSkeleton />
                                    <AllPostSkeleton />
                                </>
                            ) : (
                                [...posts].reverse().map(post => (
                                    <PostCard
                                        key={post.id}
                                        id={post.id}
                                        title={post.title}
                                        content={post.content}
                                        authorName={post.author.username || "Anonymous"}
                                        publishedDate="Today" />
                                ))
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}