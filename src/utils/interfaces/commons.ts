export interface IAppConfig {
    export: boolean;
    development: boolean;
    endpoint: string;
    seo: boolean;
    postsPerPage?: number | false;
}

export interface IQueryData {
    [propName: string]: any;
}

export interface IPagination {
    currentPage: number;
    pagesCount: number;
    basePath?: string;
}
