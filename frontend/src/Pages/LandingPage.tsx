import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  MessageSquare,
  Heart,
  Share2,
  Edit3,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";

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
    <div className="w-full max-w-full overflow-x-hidden bg-neutral-900 text-white">
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

          <div className="flex">
            <button
              onClick={() => navigate("/signin")}
              className="rounded-xl border border-white px-6 py-2 font-semibold transition-colors duration-300 hover:bg-white hover:text-black"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      </motion.div>

      <div className="mx-auto flex min-h-[60vh] w-full flex-col p-4 md:h-[75vh] md:max-w-7xl md:p-5">
        <div className="mx-auto mt-16 flex w-full max-w-6xl flex-col px-4 md:mt-[22vh] lg:h-[33%] lg:flex-row">
          <div className="w-full lg:max-w-2xl">
            <div className="relative flex w-full max-w-2xl font-inria text-4xl font-semibold md:text-6xl lg:text-7xl">
              <div className="absolute left-20 hidden -translate-y-2 translate-x-5 sm:block md:ml-4 md:-translate-y-4 lg:left-36 lg:-translate-y-0 xl:left-40">
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
          <div className="pointer-events-none mt-8 flex items-center justify-center lg:ml-24 xl:ml-40">
            <motion.div
              className="relative hidden lg:flex"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="relative bg-clip-text text-6xl font-bold text-transparent text-white md:text-[150px] lg:text-[200px]"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                whileHover={{
                  scale: 1.1,
                  rotateZ: 15,
                  transition: { duration: 0.3 },
                }}
              >
                X
              </motion.div>

              <motion.div
                className="absolute inset-0 rounded-full border-2 border-blue-500/30"
                style={{
                  width: "120%",
                  height: "120%",
                  top: "-10%",
                  left: "-10%",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              <motion.div
                className="absolute inset-0 rounded-full border border-purple-500/20"
                style={{
                  width: "140%",
                  height: "140%",
                  top: "-20%",
                  left: "-20%",
                }}
                animate={{ rotate: -360 }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="h-full bg-white">
        <section className="bg-neutral-100 px-4 py-16 md:px-8 md:py-20">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-2xl font-bold text-neutral-800 md:text-3xl lg:text-4xl">
                Everything you need to connect and share
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-neutral-800">
                WriteX focuses on meaningful text-based conversations without
                the noise of images or videos.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: {
                    duration: 0.4,
                  },
                }}
                whileTap={{
                  scale: 1,
                  transition: {
                    duration: 0.3,
                  },
                }}
                className="cursor-pointer rounded-lg border border-slate-800 bg-black p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600/10">
                  <Edit3 className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Write & Share</h3>
                <p className="text-slate-400">
                  Express yourself with powerful text formatting and share your
                  thoughts with the community instantly.
                </p>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: {
                    duration: 0.4,
                  },
                }}
                whileTap={{
                  scale: 1,
                  transition: {
                    duration: 0.3,
                  },
                }}
                className="cursor-pointer rounded-lg border border-slate-800 bg-black p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600/10">
                  <MessageSquare className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Engage & Discuss</h3>
                <p className="text-slate-400">
                  Join conversations, reply to posts, and build meaningful
                  connections through thoughtful discussions.
                </p>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: {
                    duration: 0.4,
                  },
                }}
                whileTap={{
                  scale: 1,
                  transition: {
                    duration: 0.3,
                  },
                }}
                className="cursor-pointer rounded-lg border border-slate-800 bg-black p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600/10">
                  <Heart className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Like & Support</h3>
                <p className="text-slate-400">
                  Show appreciation for great content and discover what the
                  community loves most.
                </p>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: {
                    duration: 0.4,
                  },
                }}
                whileTap={{
                  scale: 1,
                  transition: {
                    duration: 0.3,
                  },
                }}
                className="cursor-pointer rounded-lg border border-slate-800 bg-black p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600/10">
                  <Share2 className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Share & Amplify</h3>
                <p className="text-slate-400">
                  Spread great ideas by sharing posts with your followers and
                  expanding the conversation.
                </p>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: {
                    duration: 0.4,
                  },
                }}
                whileTap={{
                  scale: 1,
                  transition: {
                    duration: 0.3,
                  },
                }}
                className="cursor-pointer rounded-lg border border-slate-800 bg-black p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600/10">
                  <Users className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Follow & Connect</h3>
                <p className="text-slate-400">
                  Build your network by following interesting people and staying
                  updated with their latest thoughts.
                </p>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: {
                    duration: 0.4,
                  },
                }}
                whileTap={{
                  scale: 1,
                  transition: {
                    duration: 0.3,
                  },
                }}
                className="cursor-pointer rounded-lg border border-slate-800 bg-black p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600/10">
                  <TrendingUp className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Discover Trends</h3>
                <p className="text-slate-400">
                  Stay current with trending topics and discover what's
                  capturing the community's attention.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <section className="bg-neutral-900 px-4 py-20 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600/10">
            <Zap className="h-8 w-8 text-indigo-400" />
          </div>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to join the conversation?
          </h2>
          <p className="mb-8 text-xl text-slate-400">
            Join thousands of writers and thinkers who share their ideas on
            WriteX. Start connecting through meaningful text-based conversations
            today.
          </p>
          <motion.button
            whileHover={{
              y: -4,
              scale: 1.05,
              transition: {
                duration: 0.3,
              },
            }}
            whileTap={{
              scale: 1,
            }}
            onClick={() => navigate("/signin")}
            className="mx-auto flex items-center justify-center rounded-xl bg-indigo-700 px-8 py-3 text-lg text-neutral-300 transition-colors hover:bg-indigo-600 hover:text-white"
          >
            Start Writing
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.button>
        </div>
      </section>
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
            <a
              href="/about"
              className="transition-all duration-300 hover:text-white"
            >
              About
            </a>
            <a
              href="/docs"
              className="transition-all duration-300 hover:text-white"
            >
              Docs
            </a>
            <a
              href="/pricing"
              className="transition-all duration-300 hover:text-white"
            >
              Pricing
            </a>
            <a
              href="/blog"
              className="transition-all duration-300 hover:text-white"
            >
              Blog
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              aria-label="Email"
              href="mailto:shreygangwar.it@email.com"
              className="transition-all duration-300 hover:text-white"
            >
              Email
            </a>
            <a
              aria-label="GitHub"
              href="https://github.com/Shrey31G"
              className="transition-all duration-300 hover:text-white"
            >
              Github
            </a>
            <a
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/shrey-gangwar-712233225/"
              className="transition-all duration-300 hover:text-white"
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
