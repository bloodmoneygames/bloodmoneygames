/**
 * Build single post data
 */
import {IQueryData} from "@/utils/interfaces/commons";
import {IPage, IPageCard} from "@/utils/interfaces/pages";

export function mapPageData(pageData: IQueryData = {}): IPage {
  const {
    databaseId,
    slug,
    uri,
    title,
    content,
    parent,
    children,
    featuredImage,
    menuOrder,
  } = pageData;

  const page: IPage = {
    pageId: databaseId,
    slug: slug,
    uri: uri,
    title: title,
    content: content,
    children: children,
    parent: parent,
    menuOrder: menuOrder,
  }

  if (pageData.featuredImage) {
    page.featuredImage = featuredImage.node;
  }

  if (pageData.parent) {
    page.parent = pageData.parent.node;
  }

  if (pageData.children) {
    page.children = pageData.children.edges.map(({ node }: {node: object}) => node);
  }

  return page;
}

export function mapPageCardData(pageData: IQueryData = {}): IPageCard {
  const {
    databaseId,
    slug,
    uri,
    title,
    parent,
    children,
    featuredImage,
    menuOrder,
  } = pageData;

  const page: IPageCard = {
    pageId: databaseId,
    slug: slug,
    uri: slug,
    title: title,
    children: children,
    parent: parent,
    menuOrder: menuOrder,
  }

  if (pageData.parent) {
    page.parent = pageData.parent.node;
  }

  if (pageData.children) {
    page.children = pageData.children.edges.map(({ node }: {node: object}) => node);
  }

  return page;
}

/**
 * getBreadcrumbsByUri
 */

export function getBreadcrumbsByUri(uri: string, pages: IPage[]) {
  const breadcrumbs = [];
  const uriSegments = uri.split('/').filter((segment) => segment !== '');

  // We don't want to show the current page in the breadcrumbs, so pop off
  // the last chunk before we start

  uriSegments.pop();

  // Work through each of the segments, popping off the last chunk and finding the related
  // page to gather the metadata for the breadcrumbs

  do {
    const breadcrumb = pages.find((page) => page.uri === `/${uriSegments.join('/')}/`);

    // If the breadcrumb is the active page, we want to pass udefined for the uri to
    // avoid the breadcrumbs being rendered as a link, given it's the current page

    if (breadcrumb) {
      breadcrumbs.push({
        pageId: breadcrumb.pageId,
        title: breadcrumb.title,
        uri: breadcrumb.uri,
      });
    }

    uriSegments.pop();
  } while (uriSegments.length > 0);

  // When working through the segments, we're doing so from the lowest child to the parent
  // which means the parent will be at the end of the array. We need to reverse to show
  // the correct order for breadcrumbs

  breadcrumbs.reverse();

  return breadcrumbs;
}
