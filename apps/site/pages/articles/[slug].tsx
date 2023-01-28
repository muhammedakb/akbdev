import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

/* eslint-disable-next-line */
export interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

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
  return {
    paths: [
      {
        params: {
          slug: 'page1',
        },
      },
      {
        params: {
          slug: 'page2',
        },
      },
    ],
    fallback: false,
  };
};

export default Article;
