/**
 * Selectors utility
 * @param {string} selector - CSS selector to match
 * @returns {Object} Utilities for the matched element
 */
const $ = (selector) => {
	const element = document.querySelector(selector);
	if (!element) {
		throw new Error(`No element found with selector: ${selector}`);
	}
	/**
	 * Utility to get or set attributes on the element
	 * @param {string} attr - Attribute name
	 * @param {string} value - Attribute value
	 * @returns {string | undefined} Attribute value if getting, undefined if setting
	 */
	return {
		attr: (attr, value) => {
			if (value !== undefined) {
				element.setAttribute(attr, value);  // Set attribute
			} else {
				return element.getAttribute(attr);  // Get attribute
			}
		}
	};
};

// Listen for changes then update the DOM & Storage
document.addEventListener("themechange", (event) => {
	let theme = event.detail;
	$("html").attr("data-theme-preference", theme);
	localStorage.setItem("theme-preference", theme);
});

document.addEventListener("visitedchange", (event) => {
	let visited = event.detail;
	$("html").attr("data-visited-preference", visited);
	localStorage.setItem("visited-preference", visited);
});
document.addEventListener("complexitychange", (event) => {
	let complexity = event.detail;
	$("html").attr("data-complexity-preference", complexity);
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
		detail: localStorage.getItem("visited-preference")
			?? $("html").attr("data-visited-preference")
			?? true
	})
);

document.dispatchEvent(
	new CustomEvent("complexitychange", {
		detail: localStorage.getItem("complexity-preference")
			?? $("html").attr("data-complexity-preference")
			?? "III"
	})
);
