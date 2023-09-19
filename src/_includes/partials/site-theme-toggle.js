// PE: Add element when JS available
const toggleTemplate = document.querySelector(".theme-toggle-template");
const toggleContent = toggleTemplate.content.cloneNode(true);
toggleTemplate.replaceWith(toggleContent);
const toggle = document.querySelector(".theme-toggle");
// Listen to theme changes and update toggle
document.addEventListener("themechange", (event) => {
	toggle.setAttribute("aria-pressed", event.detail === "dark");
});
// Listen to user toggle changes
toggle.addEventListener("click", function (event) {
	let theme =
		document.documentElement.getAttribute("data-theme-preference") === "dark"
			? "light"
			: "dark";
	document.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
});

(function () {
	let theme =
		document.documentElement.getAttribute("data-theme-preference") ?? "light";
	toggle.setAttribute("aria-pressed", theme === "dark");
})()