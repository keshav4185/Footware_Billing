import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  extend: {
  fontFamily: {
    orbitron: ["Orbitron", "sans-serif"],
  },
},

})