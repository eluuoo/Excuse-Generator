/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      // Custom colors (Pinocchio theme)
      colors: {
        pinocchio: {
          red: "#E63946",
          yellow: "#FFB703",
          blue: "#023E8A",
          wood: "#D2691E",
          green: "#2A9D8F"
        },
      },
      // Custom fonts
      fontFamily: {
        comic: ["Comic Neue", "cursive"],
        hand: ["Indie Flower", "cursive"],
      },
      // Core animations (nose grow + mouth open/close + eye blink + typing)
      keyframes: {
        noseGrow: {
          "0%": { transform: "translateX(0) scaleX(1)" },
          "100%": { transform: "translateX(50px) scaleX(2)" },
        },
        noseReset: {
          "0%": { transform: "translateX(50px) scaleX(2)" },
          "100%": { transform: "translateX(0) scaleX(1)" },
        },
        mouthOpen: {
          "0%": { borderRadius: "50%", height: "20px" },
          "50%": { borderRadius: "30%", height: "30px" },
          "100%": { borderRadius: "50%", height: "20px" },
        },
        mouthSmile: {
          "0%": { borderRadius: "0 0 50% 50%", height: "10px" },
          "100%": { borderRadius: "0 0 80% 80%", height: "20px" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        // New: Eye blink animation
        eyeBlink: {
          "0%, 100%": { height: "20px", borderRadius: "50%" },
          "50%": { height: "5px", borderRadius: "50% 50% 0 0" },
        },
        // New: Typing animation for excuse text
        typing: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        blinkCursor: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "#023E8A" },
        }
      },
      animation: {
        "nose-grow": "noseGrow 1s ease-in-out forwards",
        "nose-reset": "noseReset 0.5s ease-in-out forwards",
        "mouth-open": "mouthOpen 1s ease-in-out infinite",
        "mouth-smile": "mouthSmile 0.5s ease-in-out forwards",
        wiggle: "wiggle 0.5s ease-in-out",
        "eye-blink": "eyeBlink 3s ease-in-out infinite", // 3s interval blink
        "typing": "typing 2s steps(40, end) forwards",
        "blink-cursor": "blinkCursor 1s step-end infinite"
      },
    },
  },
  plugins: [],
};