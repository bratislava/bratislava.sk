import { PageBySlugQuery } from '@bratislava/strapi-sdk-homepage';
import { GetStaticPaths, GetStaticProps } from 'next';
import PageWrapper from '../components/layouts/PageWrapper';
import GeneralPage from '../components/pages/generalPage';
import { client } from '../utils/gql';
import { parseFooter, parseMainMenu } from '../utils/page';
import { ssrTranslations } from '../utils/translations';
import { arrayify, isPresent, shouldSkipStaticPaths } from '../utils/utils';

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = [];
  if (shouldSkipStaticPaths()) return { paths, fallback: 'blocking' };

  const { pages } = await client.PagesStaticPaths();
  if (pages) {
    paths = pages.map(({ slug }) => ({
      params: {
        slug: slug.split('/'),
      },
    }));
  }

  console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS`);
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale ?? 'sk';
  const slug = arrayify(ctx.params.slug).join('/');

  const { pageBySlug, footer, mainMenu } = await client.PageBySlug({
    slug,
    locale,
  });

  if (!pageBySlug) return { notFound: true } as { notFound: true };

  const pageTranslations = ['common'];

  if (
    pageBySlug.sections
      ?.filter(isPresent)
      .find((section) => section.__typename === 'ComponentSectionsCalculator')
  ) {
    pageTranslations.push('minimum-calculator');
  }
  if (
    pageBySlug.sections
      ?.filter(isPresent)
      .find((section) => section.__typename === 'ComponentSectionsNewsletter')
  ) {
    pageTranslations.push('newsletter');
  }

  return {
    props: {
      slug,
      page: pageBySlug,
      footer,
      mainMenu,
      ...(await ssrTranslations(ctx, pageTranslations)),
    },
    revalidate: 120, // every two minutes TODO change
  };
};

interface GenericPageProps {
  slug: string;
  page: NonNullable<PageBySlugQuery['pageBySlug']>;
  footer: PageBySlugQuery['footer'];
  mainMenu: PageBySlugQuery['mainMenu'];
}

const Page = ({ page, footer, mainMenu }: GenericPageProps) => {
  const parsedFooter = parseFooter(footer);
  const menuItems = parseMainMenu(mainMenu?.filter(isPresent) ?? []);

  return (
    <PageWrapper
      locale={page.locale ?? 'sk'}
      slug={page.slug ?? ''}
      localizations={page.localizations?.filter(isPresent)}
    >
      <GeneralPage page={page} footer={parsedFooter} menuItems={menuItems} />
    </PageWrapper>
  );
};

export default Page;
