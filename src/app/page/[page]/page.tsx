import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import {getAllPosts, getPagesCount, getPaginatedPosts} from "@/utils/lib/posts";
import Section from "@/components/Section";
import {getPageByUri} from "@/utils/lib/pages";
import ContentBox from "@/components/ContentBox";
import {unstable_noStore} from "next/cache";
import {Metadata} from "next";
import appConfig from "@/utils/lib/config";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByUri('homepage');

  if (page && page.seo) {
    return {
      title: page.seo.title,
      description: page.seo.description,
    };
  }

  return {};
}

export default async function HomeGames({params}: { params: { page: number } }) {

  if (!appConfig.export) {
    unstable_noStore();
  }

  const {posts, pagination} = await getPaginatedPosts(params.page);
  const page = await getPageByUri('homepage');

  if (!page) {
    return {
      props: {},
      notFound: true,
    };
  }

  return (
    <div className="page">

      <Section
        title="All games"
      >
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
            addCanonical={false}
            currentPage={pagination.currentPage}
            pagesCount={pagination?.pagesCount}
            basePath=''
          />
        )}
      </Section>

      <Section>
        <ContentBox>
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: page.content,
            }}
          />
        </ContentBox>
      </Section>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const pagesCount = await getPagesCount(posts, 10);

  const paths = [...new Array(pagesCount)].map((_, i) => {
    return { page: String(i + 1) };
  });

  return paths;
}

