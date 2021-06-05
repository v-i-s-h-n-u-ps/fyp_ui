import { useSelector } from "react-redux";

import { 
    DASHBOARD, FILL_STUDENT_DETAILS,
    CHATS, TASKS, FORUM, FORUMS,
    GROUP, GROUPS, PROJECTS,
    PROJECT, PROFILE
} from "./routes";

export const sidebarLinks = () => {

    const links = [
        {
            text: 'Dashboard',
            path: DASHBOARD,
            icon: 'dashboard_material',
            sameTab: true
        },
        {
            text: 'Groups',
            path: GROUPS,
            icon: 'groups',
            sameTab: true
        },
        {
            text: 'Forums',
            path: FORUMS,
            icon: 'forum',
            sameTab: true
        },
        {
            text: 'Chats',
            path: CHATS,
            icon: 'send',
            sameTab: true
        },
        {
            text: 'Profile',
            path: PROFILE,
            icon: 'user',
            sameTab: true
        },
    ];
    return links;
};

export const otherLinks = {
    theme: {
        light: {
            text: 'Dark Mode',
            icon: 'nightlight_round'
        },
        dark: {
            text: 'Light Mode',
            icon: 'theme'
        }
    },
}