import {IFeaturedImage} from "@/utils/interfaces/posts";
import {ICategoryCard} from "@/utils/interfaces/categories";

export interface IPageCard {
    pageId: string;
    slug: string;
    uri: string;
    title: string;
    children?: IPage[];
    parent?: IPage;
    menuOrder: string;
}

export interface IPage {
    pageId: string;
    slug: string;
    uri: string;
    title: string;
    content: string;
    children?: IPage[];
    parent?: IPage;
    featuredImage?: IFeaturedImage;
    menuOrder: string;
    seo?: {
        title: string;
        description: string;
        canonical?: string;
        og?: {
            author?: string;
            description?: string;
            image?: string;
            modifiedTime?: string;
            publishedTime?: string;
            publisher?: string;
            title?: string;
            type?: string;
        };
        article?: {};
        robots?: {};
        twitter?: {};
    };
}
