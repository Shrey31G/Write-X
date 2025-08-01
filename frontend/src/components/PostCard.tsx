import axios from "axios";
import { PenSquare } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
import { useState } from "react";

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    id: string,
    publishedDate: string
    onDeleteSuccess?: (deletedPostId: string) => void;
}

export const PostCard = ({ authorName, title, content, publishedDate, id, onDeleteSuccess }: BlogCardProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const isProfileRoute = location.pathname.includes(`/profile/${authorName}`)

    const handleEdit = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/update/post/${id}`)
    }

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowDeleteConfirmation(true);
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            console.log('Attempting to delete post:', id);
            console.log('Backend URL:', `${BACKEND_URL}api/v1/posts/delete/${id}`);
            console.log('Token:', localStorage.getItem("token"));

            const response = await axios.delete(`${BACKEND_URL}api/v1/posts/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            });

            console.log('Delete response:', response);
            if (onDeleteSuccess) {
                onDeleteSuccess(id);
            }

            setShowDeleteConfirmation(false);


        } catch (err: any) {
            console.error('Delete error:', err);
            console.error('Error response:', err.response);

            if (err.response?.status === 404) {
                console.log('Post not found or already deleted');
            } else if (err.response?.status === 403) {
                console.log('You are not authorized to delete this post');
            } else {
                alert('Failed to delete post. Please try again.');
            }
        } finally {
            setIsDeleting(false);
            setShowDeleteConfirmation(false);
        }
    }

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    }

    return (
        <>
            <Link to={`/post/${id}`}>
                <div className="border-b-2 border-slate-200 cursor-pointer m-4 bg-white p-4 rounded-md transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 hover:shadow-xl shadow-white">
                    <div className="flex items-center mb-3 space-x-3">
                        <Avatar name={authorName} size={"small"} />

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
                                <>
                                    <div className="ml-auto flex gap-2">
                                        <button
                                            onClick={handleDeleteClick}
                                            disabled={isDeleting}
                                            className="hover:bg-gray-300 rounded-lg p-1 disabled:opacity-50"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                                                <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                                            </svg>
                                        </button>

                                        <button
                                            className="ml-auto bg-black hover:bg-gray-700 text-white flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl px-3 py-1 md:px-5 md:py-3"
                                            onClick={handleEdit}
                                        >
                                            <PenSquare className="w-4 h-4" />
                                            Edit
                                        </button>
                                    </div>
                                </>
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

            {showDeleteConfirmation && (
                <DeleteConfirmation
                    onConfirm={handleDelete}
                    onCancel={handleCancelDelete}
                    isDeleting={isDeleting}
                />
            )}
        </>
    )
}

export const DeleteConfirmation = ({ onConfirm, onCancel, isDeleting }: {
    onConfirm: () => void;
    onCancel: () => void;
    isDeleting?: boolean;
}) => {
    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
                <div className="font-semibold text-black text-lg">
                    Are you sure you want to delete this post?
                </div>

                <div className="text-sm text-gray-600 mb-6">
                    This action cannot be undone.
                </div>

                <div className="flex gap-3 justify-between">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onConfirm();
                        }}
                        disabled={isDeleting}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onCancel();
                        }}
                        disabled={isDeleting}
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}


export function Avatar({ name, size = "small" }: { name: string; size: "small" | "big" }) {
    const initials = name?.charAt(0).toUpperCase() || "?";

    return (
        <div
            className={`relative inline-flex bg-blue-400 items-center justify-center overflow-hidden rounded-full ${size === "small" ? "w-6 h-6" : "w-12 h-12"
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