import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';

export interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

const POSTS_PATH = join(process.cwd(), '_articles');

const Article = ({ slug }: ArticleProps) => {
  return (
    <div>
      <h1>Visiting, {slug}</h1>
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticleProps> = async ({
  params,
}: {
  params: ArticleProps;
}) => {
  return {
    props: {
      slug: params.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));
  // http://localhost:4200/articles/dynamic-routing
  return {
    // paths: [
    //   {
    //     params: {
    //       slug: 'page1',
    //     },
    //   },
    //   {
    //     params: {
    //       slug: 'page2',
    //     },
    //   },
    // ],
    paths,
    fallback: false,
  };
};

export default Article;
