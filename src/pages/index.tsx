import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { FaInstagram, FaStore } from 'react-icons/fa';
import { IoArrowDownOutline } from 'react-icons/io5';
import { InView } from 'react-intersection-observer';

import { sortByDate } from '@/lib/mdx.client';
import { getAllFilesFrontmatter, getFeatured } from '@/lib/mdx.server';
import { generateRss } from '@/lib/rss';
import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/posts/BlogCard';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import type { BlogFrontmatter } from '@/types/frontmatters';

function uniqueBySlug(posts: BlogFrontmatter[]) {
  const seen = new Set<string>();
  return posts.filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

export default function IndexPage({
  featuredPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const populatedPosts = useInjectContentMeta('projects', featuredPosts);

  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo />

      <main>
        <section
          className={clsx(
            'min-h-main -mt-20 mb-20 flex flex-col justify-center',
            isLoaded && 'fade-in-start'
          )}
        >
          <article className='layout flex flex-col items-center text-center'>
            <div className='mt-1 w-fit max-w-full' data-fade='2'>
              <h1 className='text-3xl !leading-[0.7] md:text-5xl 2xl:text-6xl'>
                <Accent>Alchemist</Accent>
                <Accent>Jack's</Accent>
              </h1>
              <p className='mt-0 text-right text-sm leading-none text-gray-700 dark:text-gray-200 md:text-base 2xl:text-lg'>
                By Randal Brookins
              </p>
            </div>

            <p
              className='mx-auto mt-12 max-w-4xl leading-relaxed text-gray-700 dark:text-gray-200 md:mt-16 md:text-lg 2xl:text-xl'
              data-fade='4'
            >
              Art, plating, 3D printing, and more...
            </p>
            <div
              data-fade='5'
              className='mt-8 flex flex-wrap justify-center gap-4 md:!text-lg'
            >
              <div className='group relative'>
                <div
                  className={clsx(
                    'absolute -inset-0.5 animate-tilt rounded blur',
                    'bg-gradient-to-r from-primary-200 via-primary-300 to-primary-500',
                    'opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
                  )}
                />
                <ButtonLink href='#intro'>See what I've made</ButtonLink>
              </div>
              <ButtonLink href='/about'>Learn about what I do</ButtonLink>
            </div>
            <div
              data-fade='6'
              className='mt-4 flex flex-wrap justify-center gap-4 gap-y-2 md:mt-8'
            >
              <UnstyledLink
                href='https://www.instagram.com/alchemistjacks'
                className={clsx(
                  'inline-flex items-center gap-1 text-sm font-medium md:text-base',
                  'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white',
                  'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                  'transition-colors'
                )}
              >
                <FaInstagram className='shrink-0' />
                <span>AlchemistJack's Instagram</span>
              </UnstyledLink>

              <UnstyledLink
                href='https://alchemistjacks.etsy.com'
                className={clsx(
                  'inline-flex items-center gap-1 text-sm font-medium md:text-base',
                  'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white',
                  'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                  'transition-colors'
                )}
              >
                <FaStore className='shrink-0' />
                <span>AlchemistJack's Etsy</span>
              </UnstyledLink>
            </div>
          </article>
          <UnstyledLink
            href='#intro'
            className={clsx(
              'absolute bottom-2 left-1/2 -translate-x-1/2 md:bottom-10',
              'cursor-pointer rounded-md transition-colors',
              'hover:text-primary-300 focus-visible:text-primary-300'
            )}
          >
            <IoArrowDownOutline className='h-8 w-8 animate-bounce md:h-10 md:w-10' />
          </UnstyledLink>
        </section>

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              id='intro'
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article
                className={clsx(
                  'layout flex flex-col-reverse items-center md:flex-row md:justify-start',
                  'md:gap-4'
                )}
                data-fade='0'
              >
                {/* <div className='mt-8 h-full w-full md:mt-0'>
                  <h2 className='text-4xl md:text-6xl'>
                    <Accent className='inline decoration-clone leading-snug dark:leading-none'>
                      The art of Alchemy
                    </Accent>
                  </h2>
                  <div className='mt-4 text-base text-gray-600 dark:text-gray-300 md:text-lg'>
                    <Tooltip
                      withUnderline
                      tipChildren={
                        <>
                          Okay, so. Alchemy is only kind of real. It's a philsophy, an aim to purify and perfect.
                          The name alchemist in "AlchemistJack's" is more specifically a reference to the alchemical art of
                          chrysopoeia, the transmutation of base metals into gold. Unfortunately, it's not possible to turn base metals into gold.
                          Instead, I use it to reference the process of creating art, and the process of creating something from nothing.
                        </>
                      }
                    >
                      <span>Mental model</span>
                    </Tooltip>{' '}
                    will make front-end development more{' '}
                    <strong className='text-gray-700 dark:text-gray-200'>
                      predictable
                    </strong>{' '}
                    by seeing how they work{' '}
                    <strong className='text-gray-700 dark:text-gray-200'>
                      fundamentally
                    </strong>
                    . In these projects, I'm sharing how I approach something and
                    how my mental model affect my learning about a certain topic.
                  </div>
                </div> */}
                {/* <div className='h-full w-full'>
                  <ul className='relative h-full'>
                    {populatedIntro[1] ? (
                      <BlogCard
                        className={clsx(
                          'absolute max-w-[350px] transform-gpu',
                          'top-1/2 translate-y-[-55%] md:translate-y-[-50%] lg:translate-y-[-60%]',
                          'left-1/2 -translate-x-1/2 md:translate-x-[-50%] lg:translate-x-[-30%]',
                          'rotate-3 md:rotate-6 lg:rotate-12',
                          'pointer-events-none md:pointer-events-auto'
                        )}
                        post={populatedIntro[1]}
                      />
                    ) : null}
                    {populatedIntro[0] ? (
                      <BlogCard
                        className='mx-auto max-w-[350px]'
                        post={populatedIntro[0]}
                      />
                    ) : null}
                  </ul>
                </div> */}
              </article>
            </section>
          )}
        </InView>

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article className='layout' data-fade='0'>
                <h2 className='text-2xl md:text-4xl' id='projects'>
                  <Accent>Featured projects</Accent>
                </h2>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {populatedPosts.map((post, i) => (
                    <BlogCard
                      key={post.slug}
                      post={post}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink className='mt-4' href='/projects'>
                  See what I've made
                </ButtonLink>
              </article>
            </section>
          )}
        </InView>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  generateRss();

  const posts = await getAllFilesFrontmatter('projects');
  const sorted = sortByDate([...posts]);

  const preferredFeatured = getFeatured(posts, [
    'gradient-border-is-hard',
    'advanced-react-patterns',
    'fully-reusable-components',
    'react-core-concept-rendering-state',
    'nextjs-auth-hoc',
    'nextjs-fetch-method',
  ]);
  const featuredPosts = uniqueBySlug([
    ...preferredFeatured,
    ...sorted.filter((b) => !preferredFeatured.some((p) => p.slug === b.slug)),
  ]).slice(0, 6);

  return {
    props: {
      featuredPosts,
    },
  };
}
