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
        <div>
            <Navbar />
            <div className="flex justify-center w-full pt-[5.5rem]">
                <div className="w-[70%] flex flex-col items-center">
                    <div className="w-full mb-4">
                        <input
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setErrors(prev => ({ ...prev, title: "" }));
                            }}
                            type="text"
                            className={`bg-gray-50 border ${
                                errors.title ? 'border-red-500' : 'border-gray-300'
                            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                            placeholder="Title"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                        )}
                    </div>

                    <div className="w-full mb-4">
                        <TextEditor
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setErrors(prev => ({ ...prev, description: "" }));
                            }}
                            error={errors.description}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                        )}
                    </div>

                   
                    <button
                        onClick={handlePostClick}
                        type="button"
                        className={`relative inline-block text-lg group mt-8 ${
                            !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={!isFormValid}
                    >
                        {posting ? (
                            <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        ) : (
                            <>
                            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 border-2 border-gray-900 rounded-lg ">
                            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                            <span className="absolute left-0 w-[28rem] h-96 -ml-2  origin-top-right -rotate-90  bg-gray-900 "></span>
                            <span className="relative">Publish</span>
                        </span>
                        <span
                            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1  ease-linear bg-gray-900 rounded-lg  "
                            data-rounded="rounded-lg"
                        ></span>
                            </>
                        ) }
                    </button>
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
        <div className="mt-2 w-full">
            <div className="w-full my-2">
                <div className="flex items-center justify-between">
                    <div className="bg-white rounded-b-lg w-full cursor-text">
                        <label className="sr-only">Publish Post</label>
                        <textarea
                            onChange={onChange}
                            id="editor"
                            rows={16}
                            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
                                error ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-blue-500 focus:border-blue-500`}
                            placeholder="Write Your Story..."
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}