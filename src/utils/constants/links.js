import { useSelector } from "react-redux";

import { 
    ROOT, USER_ENTRY, ADMIN_MANAGE, ABOUT_US,
    CONTACT_US, TERMS_AND_CONDITIONS, PROFILE,
    MY_SERVICES
} from "./routes";

export const bottomNavLinks = [
    {
        text: 'Services',
        path: ROOT,
        icon: 'home',
        sameTab: true
    },
    {
        text: 'Contact Us',
        path: CONTACT_US,
        icon: 'call',
        sameTab: true
    },
    {
        text: 'Terms & Conditions',
        path: TERMS_AND_CONDITIONS,
        icon: 'terms',
        sameTab: true
    },
    {
        text: 'About Us',
        path: ABOUT_US,
        icon: 'users',
        sameTab: true
    },
];

export const sidebarLinks = () => {

    const links = [
        {
            text: 'Services',
            path: ROOT,
            icon: 'home',
            sameTab: true
        },
        {
            text: 'Contact Us',
            path: CONTACT_US,
            icon: 'call',
            sameTab: true
        },
        {
            text: 'Terms & Conditions',
            path: TERMS_AND_CONDITIONS,
            icon: 'terms',
            sameTab: true
        },
        {
            text: 'About Us',
            path: ABOUT_US,
            icon: 'users',
            sameTab: true
        },

    ];
    return links;
};

export const otherLinks = {
    theme: {
        light: {
            text: {
                en: 'Dark Mode',
                hi: 'डार्क मोड'
            }
        },
        dark: {
            text: {
                en: 'Light Mode',
                hi: 'लाइट मोड'
            }
        }
    },
    locale: {
        text: {
            en: 'Select Language',
            hi: 'भाषा का चयन करें'
        }
    },
    languages: {
        en: {
            text: [{ languageName: 'हिन्दी', locale: 'hi' }]
        },
        hi: {
            text: [{ languageName: 'English', locale: 'en' }]
        }
    },
}