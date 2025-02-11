import { PenSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    id: string,
    publishedDate: string
}

export const PostCard = ({ authorName, title, content, publishedDate, id }: BlogCardProps) => {
    const location = useLocation();
    const isProfileRoute = location.pathname.includes(`/profile/${authorName}`)
    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        window.location.href = `/update/post/${id}`

    }
    return (
        <Link to={`/post/${id}`}>
            <div className="border-b-2 border-slate-200 cursor-pointer m-4 bg-white p-4 rounded-md transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 hover:shadow-xl shadow-white">
                <div className="flex items-center mb-3 space-x-3">
                    <Avatar  name={authorName} size={"small"} />
                    <Link to={`/user/${authorName}/posts`} className="text-blue-500 hover:underline">
                        {authorName}
                    </Link>
                    <div>
                        <Circle />
                    </div>
                    <div className="flex w-full justify-between">
                        <div className=" text-slate-600 text-sm flex justify-center flex-col">
                            {publishedDate}
                        </div>

                        {isProfileRoute && (
                            <button
                                className="ml-auto bg-black hover:bg-gray-700 text-white flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300  rounded-2xl px-3 py-1 md:px-5 md:py-3"
                                onClick={handleEdit}
                            >
                                <PenSquare className="w-4 h-4" />
                                Edit
                            </button>
                        )}
                    </div>

                </div>

                <div className="font-bold text-xl">
                    {title}
                </div>
                <div className="text-md font-normal pt-1">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="font-thin pt-3 text-sm m-1">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    )
}

export function Avatar({ name, size = "small" }: { name: string; size: "small" | "big" }) {
    const initials = name?.charAt(0).toUpperCase() || "?";

    return (
        <div
            className={`relative inline-flex bg-blue-400 items-center justify-center overflow-hidden rounded-full ${
                size === "small" ? "w-6 h-6" : "w-12 h-12"
            }`}
            style={{
                aspectRatio: "1/1", 
                minWidth: size === "small" ? "1.5rem" : "3rem", 
                minHeight: size === "small" ? "1.5rem" : "3rem",
            }}
        >
            <span className={`${size === "small" ? "text-sm" : "text-2xl"} text-white`}>
                {initials}
            </span>
        </div>
    );
}
export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-400">
    </div>
}