module.exports = {
    "title": "Infomative Messaging",
    "question": "Is this information instructional?",
    "yes": {
        "title": "If yes, this information is instructional…",
        "question": "Is this information contextual ?",
        "yes": {
            "title": "If yes, this information is contextual…",
            "conclusions": [
                "Use a tooltip"
            ]
        },
        "no": {
            "title": "If no, this information is universal…",
            "conclusions": [
                "Use a banner"
            ]
        }
    },
    "no": {
        "title": "If no, this information is not instructional…",
        "question": "Is this information brief ?",
        "yes": {
            "title": "If yes, this information is brief…",
            "conclusions": [
                "Use a toast"
            ]
        },
        "no": {
            "title": "If no, this information is long...",
            "conclusions": [
                "Use a prompt panel"
            ]
        }
    }
}
