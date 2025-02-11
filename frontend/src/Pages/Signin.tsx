import { Auth } from "../components/Auth";

export const Signin = () => {
    return (
        <div className="grid min-h-screen md:grid-cols-2 bg-gray-100">
            <div className="hidden md:flex items-center justify-center bg-black text-white">
                <div className="flex gap-1">
                    <span className="text-4xl font-bold">Welcome to</span>
                    <span className="text-4xl font-bold text-blue-400">Write</span>
                    <span className="text-4xl font-bold">X</span>
                </div>
            </div>
            <div>
                <Auth type="signin" />
            </div>
        </div>
    );
};