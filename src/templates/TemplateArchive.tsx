import type { Metadata } from 'next'
import Section from '@/components/Section';
import Container from '@/components/Container';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination/Pagination';

import {IPostCard} from "@/utils/interfaces/posts";
import ContentBox from "@/components/ContentBox";
import PageHeading from "@/components/Heading/PageHeading";
import {IPagination} from "@/utils/interfaces/commons";
import appConfig from "@/utils/lib/config";

type TTemplateArchiveProps = {
  slug: string;
  title: string;
  posts: IPostCard[];
  content: string;
  pagination: IPagination
}
export default function TemplateArchive({
  title = 'Archive',
  posts,
  slug,
  content,
  pagination,
}: TTemplateArchiveProps) {

  return (
    <div>
      <Section>
        <PageHeading title={title}>
          <h1>{title}</h1>
        </PageHeading>
      </Section>

      <Section>
        {Array.isArray(posts) && (
          <>
            <ul className="games-grid">
              {posts.map((post) => {
                return (
                  <li className="games-grid__item" key={post.slug}>
                    <PostCard post={post}/>
                  </li>
                );
              })}
            </ul>
            {pagination && (
              <Pagination
                currentPage={pagination?.currentPage}
                pagesCount={pagination?.pagesCount}
                basePath={pagination?.basePath}
              />
            )}
          </>
        )}
      </Section>

      {content && (
        <Section>
          <ContentBox>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </ContentBox>
        </Section>
      )}
    </div>
  );
}
