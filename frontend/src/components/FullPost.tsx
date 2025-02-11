import { Link } from "react-router-dom";
import { Post } from "../hooks"
import { Avatar } from "./PostCard";
import { Navbar } from "./Navbar";
import { SideBar } from "./SideBar.tsx/SideBar";
import { FullPostSkeleton } from "./Skeleton/FullPostSkeleton";



export const FullPost = ({ post, loading }: { post?: Post, loading: boolean }) => {
    if (loading) {
        return (
            <div className="h-full overflow-hidden bg-black dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative">

                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

                <Navbar />

                <div className="w-full md:w-[70%] min-h-screen mx-auto px-4 rounded-xl pb-24 md:pb-4 pt-[5rem] relative z-10">

                    <div className="grid grid-cols-1 md:grid-cols-12 mx-auto">
                    <div className="md:h-full md:col-span-3 w-full md:flex md:justify-center relative z-10   md:overflow-auto" >
                        <SideBar />
                    </div>
                        <div className="col-span-1 md:col-span-9 relative md:pl-12">
                            <FullPostSkeleton />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="w-full md:w-[70%] min-h-screen bg-black  mx-auto px-4 rounded-xl pb-24 md:pb-4 mx">
                <p>Post not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen overflow-hidden bg-black dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative">

            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            <Navbar />
            <div className="w-full md:w-[70%] min-h-screen mx-auto px-4 rounded-xl pb-24 md:pb-4 pt-[5rem] relative z-10">

                <div className="grid grid-cols-1  md:grid-cols-12  mx-auto ">
                    <div className="md:h-full md:col-span-3 w-full md:flex md:justify-center relative z-10   md:overflow-auto" >
                        <SideBar />
                    </div>
                    <div className="col-span-1 md:col-span-9 relative md:pl-12 md:pt-4">

                        <div className="pl-8 md:pl-4">
                            <div className="bg-white max-w-3xl mx-auto p-8 sm:p-12 rounded-2xl shadow-2xl border border-gray-100">
                                <header className="border-b pb-6 border-gray-200">
                                    <h1 className="text-4xl font-extrabold text-gray-900 space-x-4 mb-4 leading-tight tracking-tight">
                                        {post.title}
                                    </h1>

                                    <div className="flex items-center text-gray-600 space-x-4 mb-6">
                                        <Avatar size={"big"} name={post.author.name || "Anonymous"} />
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-md font-semibold text-gray-800">
                                                    <Link to={`/user/${post.author.username}/posts`}
                                                        className="text-md font-semibold text-blue-500 hover:underline"
                                                    >
                                                        {post.author.username}
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500 flex items-center space-x-2">
                                            <span className="text-sm">•</span>
                                            <span className="text-sm">{`${Math.ceil(post.content.length / 100)} minute(s) read`}</span>
                                        </div>
                                    </div>
                                </header>

                                <div className="text-gray-800 leading-relaxed space-y-6">
                                    {post.content.split('\n\n').map((paragraph, index) => (
                                        <p key={index} className="mb-4">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
