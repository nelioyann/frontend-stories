module.exports = {
    name: "Frontend Stories",
    site_name: "Frontend Stories",
    site_emoji: "🎓",
    site_description: "Frontend Stories is intended for developers and aims to facilitate access to research data, as well as facts, quotes and articles on which they can build their own web development guidelines.",
    site_url: (process.env.ELEVENTY_ENV || "").trim() === 'development' ? 'http://localhost:8080' : 'https://frontendstories.com',
    site_thumbnail: "https://frontendstories.com/images/thumbnail.png",
    theme_color: "#fbfcfe",
    logo_backgroud_color: "#fbfcfe",
    primary_color: "#132b51",
    background_color: "#fbfcfe",
    color: "#132b51",
    author: {
        name: "Yannick Nana",
        email: "contact@yannicknana.fr",
        url: "https://yannicknana.fr",
        twitter_name: "@nelioyann"
    },
    site_author: "Yannick Nana",
    twitter_name: "@FrontendStories",
    lang: "en"
}