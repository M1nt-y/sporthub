type ShortUserType = {
    userId: string,
    photo: string,
    fullName: string
}

class ShortUser implements ShortUserType {
    fullName = "";
    photo = "";
    userId = "";
}

type FileType = {
    id: string,
    link: string
}

class FileClass implements FileType {
    id = "";
    link = "";
}

type StoreType = {
    id: string,
    userId: string,
    title: string,
    link: string,
    description: string,
    photo: FileType
}

class Store implements StoreType {
    description = "";
    id = "";
    link = "";
    photo = new FileClass();
    title = "";
    userId = "";
}

type CommentType = {
    id: string,
    author: ShortUserType | {},
    content: string,
    replies: CommentType[] | [],
    likes: string[] | [],
    dislikes: string[] | []
}

class Comment implements CommentType {
    author = new ShortUser();
    content = "";
    dislikes = [];
    id = "";
    likes = [];
    replies = [];
}

type VideoType = {
    id: string
    title: string
    uploaded: Date
    description: string
    category: string
    link: string
    video: FileType
    preview: FileType
    isPublished: boolean | null
    likes: string[] | []
    dislikes: string[] | []
    comments: CommentType[] | []
}

class Video implements VideoType {
    category = "";
    comments = [];
    description = "";
    dislikes = [];
    id = "";
    isPublished = null;
    likes = [];
    link = "";
    preview = new FileClass();
    title = "";
    video = new FileClass();
    uploaded = new Date();
}

type ShortVideoType = {
    videoId: string
    photo: string
    title: string
    duration: string
    author: ShortUserType
}

class ShortVideo implements ShortVideoType {
    author = new ShortUser();
    duration = "";
    photo = "";
    title = "";
    videoId = "";
}

type PlaylistType = {
    id: string
    userId: string
    name: string
    description: string
    category: string
    videos: ShortVideoType[] | []
    isPublished: boolean | null
}

class Playlist implements PlaylistType {
    category = "";
    description = "";
    id = "";
    isPublished = null;
    name = "";
    userId = "";
    videos = [];
}

type UserType = {
    id: string,
    email: string,
    isBusiness: boolean | null,
    firstName: string,
    lastName: string,
    photo: FileType,
    gender: string,
    birthdate: string,
    cover: FileType,
    address: string,
    llc: string,
    description: string,
    vimeo: string,
    facebook: string,
    instagram: string,
    twitter: string,
    stores: StoreType[] | [],
    playlists: PlaylistType[] | [],
    videos: VideoType[] | [],
    subscriptions: ShortUserType[] | [],
    subscribers: string[] | [],
    viewHistory: ShortVideoType[] | [],
    viewLater: ShortVideoType[] | [],
    ignoreList: ShortVideoType[] | []
}

class User implements UserType {
    address = '';
    birthdate = '';
    cover = new FileClass();
    description = '';
    email = '';
    facebook = '';
    firstName = '';
    gender = '';
    id = '';
    ignoreList = [];
    instagram = '';
    isBusiness = null as unknown as boolean;
    lastName = '';
    llc = '';
    photo = new FileClass();
    playlists = [];
    stores = [];
    subscribers = [];
    subscriptions = [];
    twitter = '';
    videos = [];
    viewHistory = [];
    viewLater = [];
    vimeo = '';
}

export type {UserType, ShortUserType, FileType, StoreType, VideoType, ShortVideoType, PlaylistType, CommentType}

export {User, ShortUser, FileClass, Store, Video, ShortVideo, Playlist, Comment}
