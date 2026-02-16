/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#4caf50',
                    DEFAULT: '#2e7d32',
                    dark: '#1b5e20',
                },
                agri: {
                    bg: '#f4f7f6',
                    card: '#ffffff',
                    text: '#333333',
                },
                status: {
                    normal: '#4caf50',
                    warning: '#ff9800',
                    critical: '#f44336',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
