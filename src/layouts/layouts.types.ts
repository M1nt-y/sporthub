export enum AppLayoutsEnum {
    default = "default",
    auth = "auth"
}

export const AppLayoutToFileMap: Record<AppLayoutsEnum, string> = {
    default: "DefaultLayout.vue",
    auth: "AuthLayout.vue",
}
