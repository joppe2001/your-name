import { useHead } from 'unhead';


export const useSeo = () => {
    useHead({
        htmlAttrs: {
            lang: "en",
        },
        title: "Your Name | An Adventure of Lifetimes",
        meta: [
            {
                hid: "description",
                name: "description",
                content:
                    'Dive into the extraordinary world of "Your Name". Experience the adventures of Mitsuha and Taki in a captivating love story that transcends time and space.',
            },
            {
                hid: "og:title",
                property: "og:title",
                content: "Your Name | An Adventure of Lifetimes",
            },
            {
                hid: "og:description",
                property: "og:description",
                content:
                    'Dive into the extraordinary world of "Your Name". Experience the adventures of Mitsuha and Taki in a captivating love story that transcends time and space.',
            },
            {
                hid: "og:image",
                property: "og:image",
                content: "https://your-name-anime.netlify.app/images/alsoyes.webp",
            },
        ],
    });
}
