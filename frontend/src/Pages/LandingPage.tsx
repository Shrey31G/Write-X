import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const navbarMaxWidth = useTransform(scrollY, [0, 300], [1152, 750]);
  const navbarPaddingX = useTransform(scrollY, [0, 300], [12, 32]);
  const navbarMarginTop = useTransform(scrollY, [0, 300], [0, 16]);

  const navbarBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(23, 23, 23, 0)", "rgba(23, 23, 23, 0.9)"],
  );

  return (
    <div className="bg-neutral-900 text-white">
      <motion.div className="fixed top-0 z-50 w-full transition-all duration-200">
        <motion.div
          className="sticky top-0 z-50 mx-auto flex w-full items-center justify-between rounded-3xl py-3 backdrop-blur-sm transition-all duration-300"
          style={{
            maxWidth: navbarMaxWidth,
            paddingLeft: navbarPaddingX,
            paddingRight: navbarPaddingX,
            backgroundColor: navbarBackground,
            marginTop: navbarMarginTop,
          }}
        >
          <div>
            <button className="text-lg font-semibold">Write X</button>
          </div>

          <div className="flex gap-8">
            <button
              onClick={() => navigate("/signin")}
              className="rounded-xl border border-white px-6 py-2 font-semibold transition-colors duration-300 hover:bg-white hover:text-black"
            >
              Get Started
            </button>
            <button className="font-semibold">Light</button>
          </div>
        </motion.div>
      </motion.div>

      <div className="mx-auto flex h-[75vh] max-w-7xl flex-col p-5">
        <div className="mx-auto mt-[22vh] flex h-[33%] w-full max-w-6xl">
          <div className="w-full max-w-2xl">
            <div className="relative flex w-full max-w-2xl font-inria text-7xl font-semibold">
              <div className="absolute right-0 -translate-y-2 translate-x-5">
                <svg
                  width="384"
                  height="226"
                  viewBox="-4 -4 392 234"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative"
                >
                  <path
                    id="dotPath"
                    d="M0.5 0.5H163.5V74H309V146H383.5V225.5"
                    stroke="transparent"
                    strokeWidth="1"
                    fill="none"
                  />
                  <motion.circle r="1.5" fill="white">
                    <animateMotion
                      dur="6s"
                      repeatCount="indefinite"
                      path="M0.5 0.5H163.5V76.5H309V146H383.5V225.5"
                    />
                  </motion.circle>
                </svg>
              </div>
              <p className="w-full">
                <span className="block">Turn Your</span>
                <span className="block">Thoughts into</span>
                Timeless Words
              </p>
            </div>
            <div className="mt-10 max-w-lg pl-2">
              <p>
                An intelligent writing workspace designed to help you write
                better, faster, and without distractions.
              </p>
            </div>
          </div>
          <div className="mb-10 flex w-full items-center justify-center text-9xl font-bold">
            X
          </div>
        </div>
      </div>
      <div className="h-screen bg-white"></div>
      <footer className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/8 rounded-full p-2 font-bold text-white">
              <span className="text-xl">X</span>
            </div>
            <div>
              <div className="font-medium text-white">WriteX</div>
              <div className="text-xs text-gray-400">
                Turn thoughts into timeless words
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="/about" className="hover:text-white">
              About
            </a>
            <a href="/docs" className="hover:text-white">
              Docs
            </a>
            <a href="/pricing" className="hover:text-white">
              Pricing
            </a>
            <a href="/blog" className="hover:text-white">
              Blog
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              aria-label="Email"
              href="mailto:shreygangwar.it@email.com"
              className="hover:text-white"
            >
              Email
            </a>
            <a
              aria-label="GitHub"
              href="https://github.com/Shrey31G"
              className="hover:text-white"
            >
              Github
            </a>
            <a
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/shrey-gangwar-712233225/"
              className="hover:text-white"
            >
              Linkedin
            </a>
          </div>
        </div>
        <div className="border-white/6 mt-6 border-t pt-4 text-xs text-gray-500">
          © {new Date().getFullYear()} WriteX — Built with ❤️ ·
          <a href="/terms" className="ml-2 hover:text-white">
            Terms
          </a>
          <a href="/privacy" className="ml-2 hover:text-white">
            Privacy
          </a>
        </div>
      </footer>
    </div>
  );
};
