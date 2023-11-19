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
    profileEdit = "profile-edit",
    profileStores = "profile-stores",
    profileVideos = "profile-videos",
    videoCreate = "video-create",
    creatorVideo = "creator-video",
    editVideo = "edit-video",
    playlistCreate = "playlist-create",
    playlistEdit = "playlist-edit",
    userVideo = "user-video",
}
