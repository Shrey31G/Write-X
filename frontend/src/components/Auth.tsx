import { SignupInput } from "@shrey_gangwar/main_medium";
import axios from "axios";
import { ChangeEvent, FormEvent, useState, useRef } from "react";
import {  useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
import { useAuth } from "../context/AuthContext";
import { AuthHeader } from "./AuthHeader";

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);

            login(response.data.jwt);

            localStorage.setItem("token", response.data.jwt);
            localStorage.setItem("username", response.data.username)
            navigate('/', {replace: true});
        } catch (error) {
            alert("Error while authenticating");
        } finally{
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
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    {type === "signup" && (
                        <>
                            <LabelledInput 
                                label="Name" 
                                placeholder="Your Name" 
                                onChange={(e) => setPostInputs(c => ({...c, name: e.target.value}))} 
                                autoFocus
                                onFocus={(e) => scrollToInput(e.target)}
                            />
                            <LabelledInput 
                                label="Username" 
                                placeholder="Enter Username" 
                                onChange={(e) => setPostInputs(c => ({...c, username: e.target.value}))}
                                onFocus={(e) => scrollToInput(e.target)}
                            />
                        </>
                    )}

                    <LabelledInput 
                        label="Email" 
                        placeholder="Enter your email" 
                        type="email" 
                        onChange={(e) => setPostInputs(c => ({...c, email: e.target.value}))} 
                        autoFocus={type === "signin"}
                        onFocus={(e) => scrollToInput(e.target)}
                    />

                    <LabelledInput
                        label="Password"
                        type="password"
                        placeholder="Enter 8-digit password"
                        onChange={(e) => setPostInputs(c => ({...c, password: e.target.value}))}
                        onFocus={(e) => scrollToInput(e.target)}
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        {loading ? (
                            <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        ) : (type === "signup" ? "Sign Up" : "Sign In") }
                        
                    </button>
                </form>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string;
    autoFocus?: boolean;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, onChange, type, autoFocus, onFocus }: LabelledInputType) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder={placeholder}
                required
                autoFocus={autoFocus}
                onFocus={onFocus}
            />
        </div>
    )
}