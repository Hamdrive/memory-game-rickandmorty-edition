module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
      		serif: ["Schwifty", "serif"],
			sans: ["Rubik", "sans-serif"]
		},
		
		extend: {
			backgroundImage: (theme) => ({
				"lab": "url('./images/Laboratory.jpg')"
			}),
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
