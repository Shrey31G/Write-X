import { SignupInput } from "@shrey_gangwar/main_medium";
import axios from "axios";
import { ChangeEvent, FormEvent, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import { AuthHeader } from "./AuthHeader";

interface ErrorResponse {
    message: string;
    errors?: any;
}

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const formRef = useRef<HTMLFormElement>(null);
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        username: "",
        name: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Basic client-side validation
    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!postInputs.email || !/\S+@\S+\.\S+/.test(postInputs.email)) {
            errors.email = "Please enter a valid email address";
        }

        if (!postInputs.password || postInputs.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }

        if (type === "signup") {
            if (!postInputs.name?.trim()) {
                errors.name = "Name is required";
            }
            if (!postInputs.username?.trim()) {
                errors.username = "Username is required";
            } else if (postInputs.username.length < 3) {
                errors.username = "Username must be at least 3 characters long";
            }
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setFieldErrors({});

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${BACKEND_URL}api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs,
                {
                    timeout: 10000, // 10 second timeout
                }
            );

            login(response.data.jwt);
            localStorage.setItem("token", response.data.jwt);
            localStorage.setItem("username", response.data.username);
            navigate('/', { replace: true });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.code === 'ECONNABORTED') {
                    setError("Request timeout. Please try again.");
                } else if (error.response) {
                    const errorData = error.response.data as ErrorResponse;
                    switch (error.response.status) {
                        case 403:
                            setError("Invalid email or password");
                            break;
                        case 411:
                            if (errorData.message.includes("already exist")) {
                                setError("An account with this email already exists");
                            } else {
                                setError("Please check your input and try again");
                            }
                            break;
                        case 422:
                            setError("Invalid input data");
                            break;
                        default:
                            setError("Authentication failed. Please try again.");
                    }
                } else if (error.request) {
                    setError("Unable to connect to server. Please check your internet connection.");
                } else {
                    setError("An unexpected error occurred. Please try again.");
                }
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    const scrollToInput = (inputElement: HTMLElement) => {
        if (window.innerWidth < 768) {
            const offset = 100;
            const elementPosition = inputElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-6">
                <AuthHeader type={type} />

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    {type === "signup" && (
                        <>
                            <LabelledInput
                                label="Name"
                                placeholder="Your Name"
                                value={postInputs.name || ""}
                                onChange={(e) => setPostInputs(c => ({ ...c, name: e.target.value }))}
                                autoFocus
                                onFocus={(e) => scrollToInput(e.target)}
                                error={fieldErrors.name}
                            />
                            <LabelledInput
                                label="Username"
                                placeholder="Enter Username"
                                value={postInputs.username || ""}
                                onChange={(e) => setPostInputs(c => ({ ...c, username: e.target.value }))}
                                onFocus={(e) => scrollToInput(e.target)}
                                error={fieldErrors.username}
                            />
                        </>
                    )}

                    <LabelledInput
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        value={postInputs.email}
                        onChange={(e) => setPostInputs(c => ({ ...c, email: e.target.value }))}
                        autoFocus={type === "signin"}
                        onFocus={(e) => scrollToInput(e.target)}
                        error={fieldErrors.email}
                    />

                    <LabelledInput
                        label="Password"
                        type="password"
                        placeholder={type === "signup" ? "Enter password (min 6 characters)" : "Enter password"}
                        value={postInputs.password}
                        onChange={(e) => setPostInputs(c => ({ ...c, password: e.target.value }))}
                        onFocus={(e) => scrollToInput(e.target)}
                        error={fieldErrors.password}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        {loading ? (
                            <div role="status" className="flex items-center justify-center">
                                <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin mr-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span>{type === "signup" ? "Creating Account..." : "Signing In..."}</span>
                            </div>
                        ) : (type === "signup" ? "Sign Up" : "Sign In")}
                    </button>
                </form>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    autoFocus?: boolean;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
}

function LabelledInput({ label, placeholder, value, onChange, type, autoFocus, onFocus, error }: LabelledInputType) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                value={value}
                onChange={onChange}
                type={type || "text"}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 ${error
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                placeholder={placeholder}
                required
                autoFocus={autoFocus}
                onFocus={onFocus}
            />
            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>
    )
}