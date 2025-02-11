import { createContext, useContext, useEffect, useState } from "react";
import { Navigate} from "react-router-dom";
import { LandingPage } from "../Pages/LandingPage";


interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
        setIsLoading(false);
    }, []);

    const login = () => {
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }

    if(isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, isLoading, login, logout}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}

export const ProtectedRoute = ({children} : {children: React.ReactNode}) => {
    const {isAuthenticated, isLoading} = useAuth();

    if(isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }
    if(!isAuthenticated) {
        return <LandingPage />
    }

    return <>{children}</>
};

export const PublicOnlyRoute = ({children}: {children: React.ReactNode}) => {
    const {isAuthenticated, isLoading}= useAuth();
    if(isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }
    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }
    
    return <>{children}</>
}

