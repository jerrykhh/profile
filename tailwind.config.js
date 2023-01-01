/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{tsx,ts}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#FFF',
            h1: {
              color: '#FFF'
            },
            h2: {
              color: '#FFF'
            },
            h3: {
              color: '#FFF'
            },
            p: {
              color: '#FFF'
            },
            a: {
              color: '#663399'
            },
            ol: {
              color: '#FFF'
            },
            li: {
              color: '#FFF'
            }
          }
        }
      },
      colors: {
        rebeccapurple: '#663399'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
