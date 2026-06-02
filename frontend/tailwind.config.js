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
                    navy: "#0C0E14", // main background
                    cyan: "#33D097", // primary accent (mint)
                    dark: "#151921", // card / secondary background
                    slate: "#9298A0", // secondary text
                    light: "#E3E5EA", // primary text
                    bg: "#0C0E14", // main background fallback
                    border: "#222A38", // border color
                    grid: "#1A2230", // grid lines
                    accentSecondary: "#238F6A", // secondary accent
                    textMuted: "#6B7280" // muted text
                }
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"]
            }
        }
    },
    plugins: []
};