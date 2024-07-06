module.exports = {
    "title": "Interactive alt text",
    "question": "Is the button the main call to action?",
    "yes": {
        "title": "This action is the main call to action…",
        "conclusions": [
            "… and the text is also present as real text nearby. Use an empty alt attribute.",
            "… and the text is only shown for visual effects. Use an empty alt attribute.",
            "… and the text has a specific function, for example is an icon. Use the alt attribute to communicate the function of the image."
        ]
    },
    "no": {
        "question": "Is the image used in a link or a button, and would it be hard or impossible to understand what the link or the button does, if the image wasn’t there?",
        "yes": {
            "title": "If yes, the image is contained in a control…",
            "conclusions": [
                "Use the alt attribute to communicate the destination of the link or action taken. See Functional Images.",
                "This decision tree does not cover all cases. For detailed information on the provision of text alternatives refer to the Image Concepts Page."
            ]
        },
        "no": {
            "question": "Does the image contribute meaning to the current page or context?",
            "yes": {
                "title": "If yes, the image contributes meaning…",
                "conclusions": [
                    "… and it’s a simple graphic or photograph. Use a brief description of the image in a way that conveys that meaning in the alt attribute. See Informative Images.",
                    "… and it’s a graph or complex piece of information. Include the information contained in the image elsewhere on the page. See Complex Images.",
                    "… and it shows content that is redundant to real text nearby. Use an empty alt attribute. See (redundant) Functional Images.",
                ]
            },
            "no": {
                "question": "Is the image purely decorative or not intended for the user?",
                "yes": {
                    "title": "If yes, the image is purely decorative…",
                    "conclusions": [
                        "Use an empty alt attribute."
                    ]
                },
                "no": {
                    "question": "Is the image’s use not listed above or it’s unclear what alt text to provide?",
                    "yes": {
                        "title": "If yes, the image’s use is not listed above…",
                        "conclusions": [
                            "This decision tree does not cover all cases. For detailed information on the provision of text alternatives refer to the Image Concepts Page."
                        ]
                    },
                    "no": {
                        "title": "If no, because the image’s use is listed above…",
                        "conclusions": [
                            "I suggest you start over."
                        ]
                    }
                }
            }
        }
    }
}
