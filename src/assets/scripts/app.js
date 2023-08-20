// Listen for changes then update the DOM & Storage
document.addEventListener("themechange", (event) => {
	let theme = event.detail;
	document.documentElement.setAttribute("data-theme-preference", theme);
	localStorage.setItem("theme-preference", theme);
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
		? localStorage.getItem("theme-preference")
		: prefersDark.matches
		? "dark"
		: "light",
})
);
