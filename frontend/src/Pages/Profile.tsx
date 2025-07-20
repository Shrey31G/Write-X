// Profile.tsx
import { useEffect, useState } from "react";
import { Avatar } from "../components/PostCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { AllPostSkeleton } from "../components/Skeleton/AllPostSkeleton";
import { PostCard } from "../components/PostCard";
import { HomeIcon, FileText, PlusCircle, User } from "lucide-react";

type User = {
    id: string;
    name: string;
    username: string;
};

type Post = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    author: User;
};

export const Profile = () => {
    const { identifier } = useParams();
    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${BACKEND_URL}api/v1/posts/${identifier}/posts`,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                );

                if (response.data.userPosts.length > 0) {
                    setUser(response.data.userPosts[0].author);
                }
                setPosts(response.data.userPosts);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [identifier]);

    useEffect(() => {
        if (!loading && posts.length === 0 && identifier && !user) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(
                        `${BACKEND_URL}api/v1/user/${identifier}`,
                        {
                            headers: {
                                Authorization: localStorage.getItem("token"),
                            },
                        }
                    );
                    setUser(response.data.user);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            };
            fetchUser();
        }
    }, [loading, posts, identifier, user]);

    const handlePostDeleted = (deletedPostId: string) => {
        setPosts(posts.filter((post) => post.id !== deletedPostId));
    };

    return (
        <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent opacity-30 animate-pulse-slow"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </div>


            <div className="glass-container border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 bg-white  backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/40 transition-all duration-300 group"
                        >
                            <HomeIcon size={20} className="group-hover:text-indigo-300" />
                            <span className="font-medium group-hover:text-indigo-300">Home</span>
                        </button>

                        {user && (
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block ">
                                    <p className="font-bold text-lg text-white">{user.name}</p>
                                    <p className="text-indigo-300 text-sm">@{user.username}</p>
                                </div>
                                <div className="relative">
                                    <Avatar size="small" name={user.username} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-1">
                        <div className="glass-container rounded-2xl p-6">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-4">
                                    <Avatar size="big" name={user?.username || "U"} />
                                </div>

                                <div className="text-center mb-6">
                                    <h1 className="text-2xl font-bold mb-1 text-white">{user?.name || "User"}</h1>
                                    <p className="text-indigo-400 font-medium mb-3">@{user?.username || "username"}</p>
                                    <button
                                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
                                        onClick={() => navigate("/publish")}
                                    >
                                        <PlusCircle className="inline mr-2" size={16} />
                                        New Post
                                    </button>
                                </div>

                                <div className="w-full space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                                        <FileText className="text-indigo-400" size={18} />
                                        <div>
                                            <p className="text-xs text-gray-200">Posts</p>
                                            <p className="text-sm text-white">{posts.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="glass-container rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <FileText className="text-indigo-400" size={24} />
                                    <h2 className="text-2xl font-bold text-white">Posts</h2>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {loading ? (
                                    <>
                                        <AllPostSkeleton />
                                        <AllPostSkeleton />
                                        <AllPostSkeleton />
                                    </>
                                ) : posts.length > 0 ? (
                                    posts.map((post) => (
                                        <PostCard
                                            key={post.id}
                                            id={post.id}
                                            title={post.title}
                                            content={post.content}
                                            authorName={post.author.username || "Anonymous"}
                                            publishedDate={post.createdAt}
                                            onDeleteSuccess={handlePostDeleted}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <FileText className="mx-auto h-16 w-16 text-indigo-400 mb-4" />
                                        <h3 className="text-xl font-bold mb-2">No Posts Yet</h3>
                                        <p className="text-gray-400 mb-6">
                                            Start sharing your thoughts with the world
                                        </p>
                                        <button
                                            onClick={() => navigate("/publish")}
                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
                                        >
                                            <PlusCircle className="inline mr-2" size={18} />
                                            Create Your First Post
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};