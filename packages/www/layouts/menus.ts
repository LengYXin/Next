import { EnumLocaleLinks } from '@xt/client/languages';
export default [
    {
        key: "index",
        name: EnumLocaleLinks.links_home,
    },
    {
        key: "course",
        name: EnumLocaleLinks.links_course,
    },
    {
        key: "video",
        name: EnumLocaleLinks.links_video,
    },
    {
        key: "stationery",
        name: EnumLocaleLinks.links_stationery,
    },
    {
        key: "about",
        name: EnumLocaleLinks.links_about,
    },
    {
        key: "my",
        name: EnumLocaleLinks.links_my,
    },
    process.env.NODE_ENV === 'development' && {
        key: "locale",
        name: '多语言列表'
    },
].filter(Boolean)
