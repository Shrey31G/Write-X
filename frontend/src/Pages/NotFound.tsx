import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600 mt-2">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Go Home
            </Link>
        </div>
    );
};
