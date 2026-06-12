/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    navy: "#07090F", // main background
                    bg: "#07090F", // main background fallback
                    bg2: "#0B0E16", // raised background
                    dark: "#10141E", // card / secondary background
                    dark2: "#141927", // elevated card background
                    cyan: "#33D097", // primary accent (mint)
                    teal: "#2DD4BF", // gradient mid accent
                    sky: "#38BDF8", // gradient end accent
                    slate: "#98A0AE", // secondary text
                    light: "#EDF0F4", // primary text
                    border: "#1E2535", // border color
                    grid: "#1A2230", // grid lines
                    accentSecondary: "#238F6A", // secondary accent
                    textMuted: "#646E7E" // muted text
                }
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                display: ["Space Grotesk", "Inter", "sans-serif"],
                mono: ["JetBrains Mono", "ui-monospace", "monospace"]
            },
            backgroundImage: {
                "brand-grad": "linear-gradient(92deg,#33D097 0%,#2DD4BF 55%,#38BDF8 110%)"
            },
            boxShadow: {
                glow: "0 6px 28px rgba(51,208,151,.32)",
                "glow-lg": "0 10px 36px rgba(51,208,151,.45)",
                card: "0 24px 60px rgba(0,0,0,.45)"
            },
            keyframes: {
                "fade-in": {
                    from: { opacity: "0" },
                    to: { opacity: "1" }
                },
                "fade-in-up": {
                    from: { opacity: "0", transform: "translateY(22px)" },
                    to: { opacity: "1", transform: "translateY(0)" }
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-14px)" }
                },
                "msg-in": {
                    to: { opacity: "1", transform: "translateY(0)" }
                },
                shimmer: {
                    from: { backgroundPosition: "200% 0" },
                    to: { backgroundPosition: "-200% 0" }
                }
            },
            animation: {
                "fade-in": "fade-in .5s ease both",
                "fade-in-up": "fade-in-up .65s cubic-bezier(.2,.7,.3,1) both",
                float: "float 7s ease-in-out infinite",
                "msg-in": "msg-in .55s forwards",
                shimmer: "shimmer 1.8s linear infinite"
            }
        }
    },
    plugins: []
};
