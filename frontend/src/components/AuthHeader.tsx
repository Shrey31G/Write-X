import { Link } from "react-router-dom"


export const AuthHeader = ({ type }: { type: "signup" | "signin" }) => {
    return (
        <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
                {type === "signup" ? "Create an account" : "Welcome Back"}
            </h2>
            <p className="text-sm text-gray-600">
                {type === "signin" ? "Don't have an account? " : "Already have an account? "}
                <Link 
                    to={type === "signin" ? "/signup" : "/signin"} 
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                    {type === "signin" ? "Sign Up" : "Sign In"}
                </Link>
            </p>
        </div>
    )
}