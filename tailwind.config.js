/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // bouton bleu
        sidebarActive: "#E0ECFF",
        formationBlue: "#EAF2FF",
        formationPurple: "#F3E8FF",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
