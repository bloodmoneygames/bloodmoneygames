import { ICategoryCard } from "./categories";

export interface IFeaturedImage {
    altText: string;
    caption?: string;
    sourceUrl: string;
    srcSet: string;
    sizes: string;
    id: number;
    mediaDetails?: {
        filteredSizes?: {
            name: string
            sourceUrl: string
        }[]
    }
}

export interface ICsPostOptions {
    flashFullwidth: boolean;
    fieldGroupName: string;
    flashBest: boolean;
    flashFavorites: boolean;
    flashIframe: string;
    flashLink: string;
    flashSide: boolean;
    flashType: string;
    shortDescription: string;
}

export interface IPostCard {
    postId: string;
    slug: string;
    title: string;
    categories: ICategoryCard[];
    featuredImage?: IFeaturedImage;
    isSticky: boolean;
    likes: {
        up: number;
        down: number;
    }
}

export interface IPost {
    postId: string;
    slug: string;
    title: string;
    metaTitle: string;
    description: string;
    content: string;
    categories?: ICategoryCard[];
    csOptionsPost: ICsPostOptions;
    featuredImage? : IFeaturedImage;
    isSticky: boolean;
    likes: {
        up: number;
        down: number;
    };
    rating: {
        count: number;
        total: number;
    };
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