export interface ICategoryCard {
    id: string;
    slug: string
    title: string
}

export interface ICategory {
    id: string;
    slug: string;
    title: string;
    content: string;
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
    }
}