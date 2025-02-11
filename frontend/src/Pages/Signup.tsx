import { Auth } from "../components/Auth";

export const Signup = () => {
  return (
    <div className="grid min-h-screen md:grid-cols-2 bg-gray-100">
      <div className="hidden md:flex items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold">Welcome to WriteX</h1>
      </div>
      <div >
        <Auth type="signup" />
      </div>
    </div>
  );
};