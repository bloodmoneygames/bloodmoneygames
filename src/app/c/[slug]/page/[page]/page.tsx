import {getAllCategories, getCategoryBySlug} from '@/utils/lib/categories';
import {getPagesCount, getPaginatedPostsByCategoryId, getPostsByCategoryId} from '@/utils/lib/posts';

import TemplateArchive from '@/templates/TemplateArchive';
import {Metadata} from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const {category} = await getCategoryBySlug(params.slug);

  if (category && category.seo) {
    return {
      title: category.seo.title,
      description: category.seo.description,
    };
  }

  return {};
}

export default async function CategoryPage({params}: { params: { slug: string, page: string } }) {

  const {category} = await getCategoryBySlug(params.slug);

  if (!category) {
    return {};
  }

  const {id, title, content, slug} = category;

  if (!category) {
    return {
      props: {},
      notFound: true,
    };
  }

  const {posts, pagination} = await getPaginatedPostsByCategoryId(id, parseInt(params.page));
  pagination.basePath = '/c/' + slug;

  return <TemplateArchive
    title={title}
    posts={posts}
    pagination={pagination}
    slug={slug}
    content={content}
  />;
}

export async function generateStaticParams({params}: {
  params: { slug: string}
}) {
  const {category} = await getCategoryBySlug(params.slug);

  if (!category) {
    return [];
  }

  const {id} = category;
  const posts = await getPostsByCategoryId(id);

  if (!posts) {
    return [];
  }

  const pagesCount = await getPagesCount(posts, 10);

  const paths = [...new Array(pagesCount)].map((_, i) => {
    return { page: String(i + 1) };
  });

  return paths;
}
