import Section from "@/components/Section";
import {getAllPages, getPageByUri} from "@/utils/lib/pages";
import ContentBox from "@/components/ContentBox";
import {unstable_noStore} from "next/cache";
import {Metadata} from "next";
import PageHeading from "@/components/Heading/PageHeading";
import appConfig from "@/utils/lib/config";

export async function generateMetadata({params}: { params: { slug: string } }): Promise<Metadata> {
  const page = await getPageByUri(params.slug);

  if (page && page.seo) {
    return {
      title: page.seo.title,
      description: page.seo.description,
    };
  }

  return {};
}

export default async function Page({params}: { params: { slug: string } }) {

  if (!appConfig.export) {
    unstable_noStore();
  }

  const page = await getPageByUri(params.slug);

  if (!page) {
    return {
      props: {},
      notFound: true,
    };
  }

  return (
    <div className="page">

      <Section>
        <PageHeading title={page.title}>
          <h1>{page.title}</h1>
        </PageHeading>
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
  const pages = await getAllPages();

  if (!pages) {
    return [];
  }

  const paths = pages.map((page) => {
    const {slug} = page;

    return {
      slug
    };
  });

  return paths;
}

