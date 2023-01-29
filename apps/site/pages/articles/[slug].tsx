import {
  getParsedFileContentBySlug,
  markdown as renderMarkdown,
} from '@akbdev/markdown';
import { Youtube } from '@akbdev/shared/mdx-elements';
import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';

type FrontMatter = {
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
  };
};

export interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

type Props = {
  frontMatter: FrontMatter;
  html: MDXRemoteProps;
} & ArticleProps;

const mdxElements = {
  Youtube,
};

const POSTS_PATH = join(process.cwd(), '_articles');

const Article = ({ frontMatter, html }: Props) => {
  return (
    <div className="m-6">
      <article className="prose prose-lg">
        <h1>{frontMatter.title}</h1>
        <div>
          by {frontMatter.author.name} <span>{frontMatter.date}</span>
        </div>
      </article>
      <hr />
      <MDXRemote {...html} components={mdxElements} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: {
  params: ArticleProps;
}) => {
  // 1. parse the content of our markdown and separate it into frontmatter and content
  const articleMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );

  // 2. convert markdown content => HTML
  const renderHTML = await renderMarkdown(articleMarkdownContent.content);

  return {
    props: {
      frontMatter: articleMarkdownContent.frontMatter,
      html: renderHTML,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));
  // http://localhost:4200/articles/dynamic-routing
  return {
    paths,
    fallback: false,
  };
};

export default Article;
