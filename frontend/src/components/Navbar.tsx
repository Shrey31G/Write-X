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
    ${visible || atTop ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
  `;

  return (
    <div className={navbarClass}>
      <div className="w-full flex justify-between items-center px-6 bg-gradient-to-r from-black via-gray-900 to-black py-2 rounded-b-2xl border-b border-gray-800 shadow-lg backdrop-blur-sm">
        <div className="flex-1 flex justify-center md:justify-center font-semibold">
          <Link to={"/"} className="flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300 px-4 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer text-2xl">
            <span className="text-blue-400">Write</span>X
          </Link>
        </div>
      </div>
    </div>
  );
};