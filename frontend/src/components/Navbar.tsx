import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setAtTop(true);
        setVisible(true);
      } else {
        setAtTop(false);
        setVisible(currentScrollY < lastScrollY.current);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visible]);

  const navbarClass = `
    fixed top-0 left-0 w-full flex justify-center transition-all duration-300 z-50 
    ${visible || atTop ? "translate-y-0" : "-translate-y-full"}
    bg-gray-900/80 backdrop-blur-lg border-b border-gray-800
  `;

  return (
    <div className={navbarClass}>
      <div className="w-full max-w-7xl flex justify-between items-center px-6 py-3">
        <div className="flex-1 flex justify-center md:justify-center font-semibold">
          <Link
            to={"/"}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300 px-4 py-2 rounded-full font-bold text-2xl"
          >
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              WriteX
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};