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
                    navy: "#0F172A",
                    cyan: "#06B6D4",
                    dark: "#111827",
                    slate: "#1E293B",
                    light: "#E2E8F0",
                    bg: "#F8FAFC"
                }
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"]
            }
        }
    },
    plugins: []
};