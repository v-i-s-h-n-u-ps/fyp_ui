export const ROOT = "/";
export const FORGOT_PASSWORD = "/forgot-password";

export const DASHBOARD = "/dashboard";
export const CHATS = "/my-chat";
export const TASKS = "/my-tasks";

export const FORUM = "/forums/[id]";
export const FORUMS = "/forums";

export const GROUPS = "/groups";
export const GROUP = "/groups/[id]";

export const PROJECTS = "/projects";
export const PROJECT = "/projects/[id]";

export const PROFILE = "/profile"
export const FILL_STUDENT_DETAILS = "/profile/details-form";

export const PUBLIC_ROUTES = [
    ROOT, FORGOT_PASSWORD
]

export const PRIVATE_ROUTES = [
    DASHBOARD, FILL_STUDENT_DETAILS,
    CHATS, TASKS, FORUM, FORUMS,
    GROUPS, GROUP, PROJECTS, PROJECT, 
    PROFILE, FILL_STUDENT_DETAILS
]