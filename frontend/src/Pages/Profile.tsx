import { useEffect, useState } from "react"
import { Avatar } from "../components/PostCard"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate, useParams } from "react-router-dom"
import { AllPostSkeleton } from "../components/Skeleton/AllPostSkeleton"
import { PostCard } from "../components/PostCard"
import { HomeIcon, FileText } from "lucide-react"

type User = {
    id: string,
    name: string,
    username: string,
}

type Post = {
    id: string,
    title: string,
    content: string,
    author: {
        name: string,
        username: string
    }
}

export const Profile = () => {
    const { identifier } = useParams();

    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<User | null>(null);

    const [loading, setLoading] = useState(true);
    const userName = posts.length > 0 ? posts[0].author.username : "Loading...";
    const name = posts.length > 0 ? posts[0].author.name : "Loading...";
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${BACKEND_URL}api/v1/posts/${identifier}/posts`,
                    {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
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
        fetchPosts();
    }, [identifier]);

    const handlePostDeleted = (deletedPostId: string) => {
        setPosts(posts.filter(post => post.id !== deletedPostId));
    };

    useEffect(() => {
        if (!loading && posts.length === 0 && identifier && !user) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`${BACKEND_URL}api/v1/user/${identifier}`,
                        {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        }
                    );
                    setUser(response.data.user);
                } catch (error) {
                    console.error("Error fetching user", error);
                }
            };
            fetchUser();
        }
    }, [loading, posts, identifier, user])

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-6xl mx-auto px-4 py-8">

                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 px-4 py-2 rounded-full bg-gray-800/50 hover:bg-gray-800 backdrop-blur-sm shadow-lg hover:shadow-xl mb-8"
                >
                    <HomeIcon size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Back to Home</span>
                </button>

                <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden mb-10">
                    <div className="bg-gradient-to-r from-black via-gray-900 to-black/20 h-32"></div>
                    <div className="px-8 pb-8 -mt-16">
                        <div className="relative inline-block">
                            <Avatar size="big" name={user?.username || "User"} />
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="mt-4">
                            <h1 className="text-3xl font-bold text-white">{user?.name || "User"}</h1>
                            <p className="text-blue-400 font-medium">@{user?.username || "User"}</p>
                        </div>
                    </div>
                </div>


                <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <FileText className="text-blue-400" size={24} />
                        <h2 className="text-xl font-semibold text-white">Posts</h2>
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
                                    publishedDate="Today"
                                    onDeleteSuccess={handlePostDeleted}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-400">No posts yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}