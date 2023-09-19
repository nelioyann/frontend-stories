// PE: Add only when JS available
const complexityTemplate = document.querySelector(".complexity-template");
const complexityContent = complexityTemplate.content.cloneNode(true);
complexityTemplate.replaceWith(complexityContent);
// Dispatch an Event for changing the theme
let complexityform = document.querySelector("form.complexity-form");
// Check the current
let complexity =
    document.documentElement.getAttribute("data-complexity-preference");
complexityform.addEventListener("change", (event) => {
    document.dispatchEvent(new CustomEvent("complexitychange", { detail: event.target.value }));
});
// Listen to theme changes and update form
document.addEventListener("complexitychange", (event) => {
    let complexity = event.detail;
    document.querySelector(`input[name="complexity"][value="${complexity}"`).checked = true;
});


// Use self invoking function because I want to keep same var names
(function () {
    // Get and set DOM value
    let complexity =
        document.documentElement.getAttribute("data-complexity-preference");
    document.querySelector(`input[name="complexity"][value="${complexity}"`).checked = true;
})()