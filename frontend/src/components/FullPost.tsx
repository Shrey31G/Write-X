import { Link } from "react-router-dom";
import { Post } from "../hooks"
import { Avatar } from "./PostCard";
import { Navbar } from "./Navbar";
import { SideBar } from "./Sidebar/SideBar";
import { FullPostSkeleton } from "./Skeleton/FullPostSkeleton";

export const FullPost = ({ post, loading }: { post?: Post, loading: boolean }) => {
    if (loading) {
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
                            <FullPostSkeleton />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="glass-container p-8 rounded-2xl text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
                    <p className="text-gray-300 mb-6">The requested post could not be found</p>
                    <Link
                        to="/"
                        className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

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
                        <div className="glass-container p-6 rounded-2xl">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="bg-indigo-500/10 p-3 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                        {post.title}
                                    </h1>
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <div className="flex items-center">
                                            <Avatar size="big" name={post.author.name || "Anonymous"} />
                                            <Link
                                                to={`/user/${post.author.username}/posts`}
                                                className="ml-3 text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                                            >
                                                {post.author.username}
                                            </Link>
                                        </div>
                                        <div className="text-sm text-gray-400 flex items-center">
                                            <span>•</span>
                                            <span className="ml-2">{`${Math.ceil(post.content.length / 500)} min read`}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <article className="prose prose-invert max-w-none text-gray-200 leading-relaxed">
                                {post.content.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="mb-6 text-lg">
                                        {paragraph}
                                    </p>
                                ))}
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};