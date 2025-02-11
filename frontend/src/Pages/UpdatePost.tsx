import { ChangeEvent, useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import { usePost } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const UpdatePost = () => {
    const { id } = useParams();
    console.log("Post id:", id);
    const navigate = useNavigate();
    if (!id) {
        return <div>
            Invalid Update
        </div>
    }

    const { loading, post } = usePost({ id });

    const [newTitle, setnewTitle] = useState("");
    const [newDescription, setnewDescription] = useState("");

    useEffect(() => {
        if (post) {
            setnewTitle(post.title);
            setnewDescription(post.content);
        }
    }, [post])

    const [errors, setErrors] = useState({
        newTitle: "",
        newDescription: ""
    });

    const validateForm = () => {
        const newErrors = {
            newTitle: "",
            newDescription: ""
        };

        if (!newTitle.trim()) {
            newErrors.newTitle = "Title is required";
        }
        if (!newDescription.trim()) {
            newErrors.newDescription = "Story content is required";
        }

        setErrors(newErrors);
        return !newErrors.newTitle && !newErrors.newDescription;
    };

    const [updating, setUpdating] = useState(false);

    const handleUpdateClick = async () => {
        if (!validateForm()) {
            return
        }
        setUpdating(true)
        try {
            const response = await axios.put(`${BACKEND_URL}api/v1/posts/${id}`, {
                title: newTitle,
                content: newDescription
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            navigate(`/post/${response.data.post.id}`);
        } catch (error) {
            alert("Error updating your post");
            setErrors(prev => ({
                ...prev,
                general: "Failed to publish your story. Please try again."
            }));
        } finally {
            setUpdating(false)
        }
    }

    const isFormValid = newTitle.trim() && newDescription.trim();

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Navbar />
            <div className="flex justify-center w-full pt-[5.5rem]">
                <div className="w-[70%] flex flex-col items-center">
                    <div className="w-full mb-4">
                        <input
                            value={newTitle}
                            onChange={(e) => {
                                setnewTitle(e.target.value)
                                setErrors(prev => ({ ...prev, newTitle: "" }));
                            }}
                            type="text"
                            className={`bg-gray-50 border ${errors.newTitle ? 'border-red-500' : 'border-gray-300'
                                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                            placeholder="Title" />
                        {errors.newTitle && (
                            <p className="mt-1 text-sm text-red-500">{errors.newTitle}</p>
                        )}
                    </div>
                    <TextEditor
                        value={newDescription}
                        onChange={(e) => {
                            setnewDescription(e.target.value);
                            setErrors(prev => ({ ...prev, newDescription: "" }));
                        }}
                        error={errors.newDescription}
                    />
                    {errors.newDescription && (
                        <p className="mt-1 text-sm text-red-500">{errors.newDescription}</p>
                    )}

                    <button
                        onClick={handleUpdateClick}
                        type="button"
                        className={`relative inline-block text-lg group mt-8 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={!isFormValid || updating}
                    >
                        {updating ? (
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <>
                            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 border-2 border-gray-900 rounded-lg ">
                            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                            <span className="absolute left-0 w-[28rem] h-96 -ml-2  origin-top-right -rotate-90  bg-gray-900 "></span>
                            <span className="relative">Update</span>
                        </span>
                        <span
                            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1  ease-linear bg-gray-900 rounded-lg  "
                            data-rounded="rounded-lg"
                        ></span>
                            </>
                        )}


                    </button>
                </div>
            </div>
        </div >
    )
}

function TextEditor({ value, onChange, error }: { value: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void, error: string }) {
    return (
        <div className="mt-2 w-full">
            <div className="w-full my-2">
                <div className="flex items-center justify-between">
                    <div className="bg-white rounded-b-lg w-full cursor-text">
                        <label className="sr-only">Publish Post</label>
                        <textarea onChange={onChange}
                            value={value}
                            id="editor" rows={16}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                            placeholder="Write Your Story..." required />
                    </div>
                </div>
            </div>
        </div>
    )
}
