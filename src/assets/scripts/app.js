// Listen for changes then update the DOM & Storage
document.addEventListener("themechange", (event) => {
	let theme = event.detail;
	document.documentElement.setAttribute("data-theme-preference", theme);
	localStorage.setItem("theme-preference", theme);
});
// 
document.addEventListener("visitedchange", (event) => {
	let visited = event.detail;
	document.documentElement.setAttribute("data-visited-preference", visited);
	localStorage.setItem("visited-preference", visited);
});
document.addEventListener("complexitychange", (event) => {
	let complexity = event.detail;
	document.documentElement.setAttribute("data-complexity-preference", complexity);
	localStorage.setItem("complexity-preference", complexity);
});


// Listen for system User preference
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
prefersDark.addEventListener("change", (event) => {
	document.dispatchEvent(
		new CustomEvent("themechange", {
			detail: event.matches ? "dark" : "light",
		}));
});

// Initial theme state dispatch
document.dispatchEvent(
	new CustomEvent("themechange", {
		detail: localStorage.getItem("theme-preference")
			??
			(prefersDark.matches
				? "dark"
				: "light"),
	})
);
document.dispatchEvent(
	new CustomEvent("visitedchange", {
		detail: localStorage.getItem("visited-preference") ?? true
	})
);
document.dispatchEvent(
	new CustomEvent("complexitychange", {
		detail: localStorage.getItem("complexity-preference") ?? "III"
	})
);
