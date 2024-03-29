// PE: Add only when JS available
const colorSchemeTemplate = document.querySelector(".color-scheme-template");
const colorSchemeContent = colorSchemeTemplate.content.cloneNode(true);
colorSchemeTemplate.replaceWith(colorSchemeContent);
// Dispatch an Event for changing the theme
let colorSchemeform = document.querySelector("form.color-scheme-form");
colorSchemeform.addEventListener("change", (event) => {
    document.dispatchEvent(new CustomEvent("themechange", { detail: event.target.value }));
});
// Listen to theme changes and update form
document.addEventListener("themechange", (event) => {
    let theme = event.detail;
    document.querySelector(`input[name="color-scheme"][value="${theme}"`).checked = true;
});

// Use self invoking function because I want to keep same var names
(function(){
    // Get and set DOM value
    let theme =
    document.documentElement.getAttribute("data-theme-preference") ?? "light";
    document.querySelector(`input[name="color-scheme"][value="${theme}"`).checked = true;
})()