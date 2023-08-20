// PE: Add only when JS available
const linkVisitedTemplate = document.querySelector(".link-visited-template");
const linkVisitedContent = linkVisitedTemplate.content.cloneNode(true);
linkVisitedTemplate.replaceWith(linkVisitedContent);
// Dispatch an Event for changing the theme
let linkVisitedform = document.querySelector("form.link-visited-form");
// Check the current
let visited =
    document.documentElement.getAttribute("data-visited-preference") === "true";
linkVisitedform.addEventListener("change", (event) => {
    document.dispatchEvent(new CustomEvent("visitedchange", { detail: event.target.value }));
});
// Listen to theme changes and update form
document.addEventListener("visitedchange", (event) => {
    let visited = event.detail;
    document.querySelector(`input[name="link-visited"][value="${visited}"`).checked = true;
});