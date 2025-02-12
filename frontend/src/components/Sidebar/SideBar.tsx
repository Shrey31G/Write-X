import { useNavigate } from "react-router-dom";
import { HomeIcon, User, LogOut, List, } from "lucide-react";
import { useAuth } from "../../context/AuthContext";


export const SideBar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const buttonBaseClass = "flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5  md:w-auto w-full justify-center md:justify-start";

    const buttonTextClass = "hidden md:block ";

    return (
        <>
            <div className="fixed bottom-0 left-0 md:fixed md:left-auto md:top-20 md:h-[calc(100vh-5rem)] md:overflow-y-auto flex md:flex-col flex-row items-center md:items-start justify-around md:justify-start space-x-4 md:space-x-0 md:space-y-8 py-4 md:mt-20 w-full md:w-auto bg-black/80 md:bg-transparent md:backdrop-blur-0 backdrop-blur-md border-t md:border-t-0 border-gray-800 px-4 md:px-0 text ">

                <button
                    className={buttonBaseClass}
                    onClick={() => navigate('/')}>
                    <HomeIcon size={20} />
                    <span className={buttonTextClass}>Home</span>
                </button>
                <button
                    className={buttonBaseClass}
                    onClick={() => {
                        const username = localStorage.getItem("username");
                        if (username) {
                            navigate(`/user/${username}/posts`);
                        }
                    }}>
                    <List size={20} />
                    <span className={buttonTextClass}>My Posts</span>
                </button>
                <button
                    className={buttonBaseClass}
                    onClick={() => {
                        const username = localStorage.getItem('username');
                        console.log(username)
                        if (username) {
                            navigate(`/profile/${username}`)
                        }
                    }}
                >
                    <User size={20} />
                    <span className={buttonTextClass}>Profile</span>
                </button>
                <button
                    className={buttonBaseClass}
                    onClick={() => navigate('/publish')}>


                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <span className={buttonTextClass}>Post</span>
                </button>
                <button
                    onClick={logout}
                    className="md:max-w-sm py-3 rounded-2xl font-medium text-xl 
                        bg-gradient-to-r from-gray-200 to-gray-100 text-gray-900 
                        shadow-lg hover:shadow-xl transition-all duration-300 
                        hover:-translate-y-0.5 focus:outline-none focus:ring-4 
                        focus:ring-gray-300/50  px-4 md:gap-3 md:items-center flex"><LogOut size={20} />
                    <span className={buttonTextClass}>Logout</span>
                </button>

            </div>
        </>
    );
};