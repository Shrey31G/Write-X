import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        title: "",
        description: ""
    });
    const [posting, setPosting] = useState(false);

    const validateForm = () => {
        const newErrors = {
            title: "",
            description: ""
        };

        if (!title.trim()) {
            newErrors.title = "Title is required";
        }
        if (!description.trim()) {
            newErrors.description = "Story content is required";
        }

        setErrors(newErrors);
        return !newErrors.title && !newErrors.description;
    };

    const handlePostClick = async () => {
        if (!validateForm()) {
            return;
        }
        setPosting(true);

        try {
            const response = await axios.post(`${BACKEND_URL}api/v1/posts`, {
                title,
                content: description
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            navigate(`/post/${response.data.id}`);
        } catch (error) {
            console.error("Error uploading your story...", error);
            setErrors(prev => ({
                ...prev,
                general: "Failed to publish your story. Please try again."
            }));
        }
    }

    const isFormValid = title.trim() && description.trim();

    return (
        <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent opacity-30 animate-pulse-slow"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </div>

            <Navbar />

            <div className="w-full max-w-4xl min-h-screen mx-auto px-4 pt-24 pb-16 relative z-10">
                <div className="glass-container p-8 rounded-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-2">
                            Share Your Story
                        </h1>
                        <p className="text-gray-400">
                            Craft your masterpiece and share it with the world
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-lg font-medium text-gray-300 mb-2">
                                Title
                            </label>
                            <input
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    setErrors(prev => ({ ...prev, title: "" }));
                                }}
                                type="text"
                                className={`glass-input w-full p-4 rounded-xl text-white text-lg ${errors.title ? 'border border-red-500' : ''
                                    }`}
                                placeholder="Catchy title that grabs attention..."
                            />
                            {errors.title && (
                                <p className="mt-2 text-sm text-red-400">{errors.title}</p>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-lg font-medium text-gray-300">
                                    Your Story
                                </label>
                                <span className="text-sm text-gray-500">
                                    {description.length} characters
                                </span>
                            </div>
                            <TextEditor
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    setErrors(prev => ({ ...prev, description: "" }));
                                }}
                                error={errors.description}
                            />
                            {errors.description && (
                                <p className="mt-2 text-sm text-red-400">{errors.description}</p>
                            )}
                        </div>

                        <div className="pt-6 flex justify-center">
                            <button
                                onClick={handlePostClick}
                                disabled={!isFormValid || posting}
                                className={`
                                    relative px-8 py-4 rounded-xl text-lg font-bold
                                    bg-gradient-to-r from-indigo-600 to-purple-600
                                    hover:from-indigo-700 hover:to-purple-700
                                    active:scale-[0.98] transition-all duration-300
                                    shadow-lg hover:shadow-xl text-white
                                    ${!isFormValid || posting ? 'opacity-70 cursor-not-allowed' : ''}
                                `}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {posting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Publishing...
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Publish Story
                                        </>
                                    )}
                                </span>
                                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TextEditor({ onChange, error }: {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
}) {
    return (
        <div className={`glass-input p-1 rounded-xl ${error ? 'border border-red-500' : ''}`}>
            <textarea
                onChange={onChange}
                rows={12}
                className="block w-full p-4 text-gray-200 bg-transparent border-0 focus:ring-0 text-lg min-h-[300px]"
                placeholder="Pour your thoughts here... Write something beautiful..."
            />
        </div>
    )
}