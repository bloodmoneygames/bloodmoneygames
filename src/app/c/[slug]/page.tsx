import CategoryLayout from "@/app/c/[slug]/layout";
import {getAllCategories, getCategoryBySlug} from '@/utils/lib/categories';
import {getPaginatedPostsByCategoryId} from '@/utils/lib/posts';

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

export default async function Category({ params }: { params: { slug: string } }) {
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

  const {posts, pagination} = await getPaginatedPostsByCategoryId(id);
  pagination.basePath = '/c/' + slug;

  return <CategoryLayout>
  <TemplateArchive
    title={title}
    posts={posts}
    pagination={pagination}
    slug={slug}
    content={content}
  />
  </CategoryLayout>;
}
