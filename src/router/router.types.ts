import type { VueElement } from "vue";
import type { AppLayoutsEnum } from "@/layouts/layouts.types";

declare module "vue-router" {
    interface RouteMeta {
        layout?: AppLayoutsEnum;
        layoutComponent?: VueElement | any;
    }
}

export enum RouteNamesEnum {
    home = "home",
    login = "login",
    signup = "signup",
    videoCreate = "video-create",
    creatorVideo = "creator-video",
    editVideo = "edit-video",
    playlistCreate = "playlist-create",
}
