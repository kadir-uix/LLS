import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType, type SeoHandleFunction} from '@shopify/hydrogen';
import {defer, type LoaderArgs} from '@shopify/remix-oxygen';
import {SanityPreview} from 'hydrogen-sanity';
import {Suspense} from 'react';

import ModuleGrid from '~/components/modules/ModuleGrid';
import type {SanityHomePage} from '~/lib/sanity';
import {fetchGids, notFound, validateLocale} from '~/lib/utils';
import {HOME_PAGE_QUERY} from '~/queries/sanity/home';

const seo: SeoHandleFunction = ({data}) => ({
  title: data?.page?.seo?.title || 'Sanity x Hydrogen',
  description:
    data?.page?.seo?.description ||
    'A custom storefront powered by Hydrogen and Sanity',
});

export const handle = {
  seo,
};

export async function loader({context, params}: LoaderArgs) {
  validateLocale({context, params});

  const cache = context.storefront.CacheCustom({
    mode: 'public',
    maxAge: 60,
    staleWhileRevalidate: 60,
  });

  const page = await context.sanity.query<SanityHomePage>({
    query: HOME_PAGE_QUERY,
    cache,
  });

  if (!page) {
    throw notFound();
  }

  // Resolve any references to products on the Storefront API
  const gids = fetchGids({page, context});

  return defer({
    page,
    gids,
    analytics: {
      pageType: AnalyticsPageType.home,
    },
  });
}

export default function Index() {
  const {page, gids} = useLoaderData<typeof loader>();
  // console.log(page.modules);
  // console.log(page.modules);
  const productModules = page.modules.filter(
    (module) => module._type === 'module.product',
  );
  const heroModules = page.modules.filter(
    (module) => module._type === 'module.image',
  );

  return (
    <SanityPreview data={page} query={HOME_PAGE_QUERY}>
      {(page) => (
        <Suspense>
          <Await resolve={gids}>
            {/* Page hero */}
            {/* <ModuleGrid items={productModules} /> */}

            {/* {page?.hero && <HomeHero hero={page.hero} />} */}
            {/* <div className="flex">
              {page?.modules && (
                <div className={clsx('mb-32 mt-24 px-4', 'md:px-8')}>
                  <ModuleGrid items={page.modules} />
                </div>
              )}
            </div> */}
            <div className="hero-start flex">
              <ModuleGrid items={heroModules} />
            </div>
            {productModules.length > 0 && (
              <div className="featured-products px-4">
                <h2 className="mb-4 mt-8 text-2xl">Featured Products</h2>
                <ModuleGrid items={productModules} />
              </div>
            )}
          </Await>
        </Suspense>
      )}
    </SanityPreview>
  );
}
