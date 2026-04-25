import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function AboutPage() {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo
        templateTitle='About'
        description='AlchemistJack is a artist that creates art, plating, 3D printing, and more...'
      />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout pt-20'>
            <h2 data-fade='0'>About{' '}<Accent>AlchemistJack's</Accent></h2>
          </div>
        </section>

        <section>
          <div className='layout mt-16'>
            <h2>Okay, so...</h2>
            <article className='prose mt-4 dark:prose-invert'>
              <p>
                Alchemy is only kind of real. It's a philsophy, an aim to purify and perfect.
                The name alchemist in "AlchemistJack's" is more specifically a reference to the alchemical art of
                chrysopoeia, the transmutation of base metals into gold. Unfortunately, it's not possible to turn base metals into gold.
                Instead, I use it to reference the process of creating art, and the process of creating something from nothing.
              </p>

              <p>
                More specifically, what I do is turn things gold...on the outside, and plate them in other metals too!
                My art comes in two main forms:
                <ul>
                  <li>Plated organic objects</li>
                  <li>Plated printed art</li>
                </ul>
              </p>
            </article>
          </div>
        </section>

        <section>
          <div className='layout mt-16'>
            <h2>How's it done?</h2>
            <article className='prose mt-4 dark:prose-invert'>
              <p>
                The process isn't super complicated, it's just a lot of steps.
                You find an object you can spray paint, something that doesn't have moving parts preferably.
                You spray paint that object in a layer of conductive paint. You then take the object and clean the crap out of it
                using a process called electocleaning, and degreasing. You then tie the object to a copper wire andplace the object in a bath of a substance that has copper in it.
                Then, you run electricity from a piece of copper, through the bath, and into the object. After a few hours you get a shiny copper thing!
                After that, you repeat the process with nickel, then gold, and you're done!
              </p>
            </article>
          </div>
        </section>

        <section>
          <div className='layout mt-16'>
            <h2>Plated organic objects</h2>
            <article className='prose mt-4 dark:prose-invert'>
              <p>
                For these, I take organic objects and plate them in gold, silver, or other metals. I like to bring
                out the natural beauty of the object and enhance it with the metal. I also like to spread awareness of
                the fact that fossils aren't that rare, and that they can be found all over the world, and they aren't hard to find
                if you know where to look. I've plated a few objects, such as:
                <ul>
                  <li>Ammonite fossils</li>
                  <li>Trilobite fossils</li>
                  <li>Mausosaurus teeth fossiles</li>
                  <li>Seashells</li>
                  <li>Shark teeth</li>
                  <li>And more! See my projects page or my etsy store for more examples!</li>
                </ul>
              </p>
            </article>
          </div>
        </section>

        <section>
          <div className='layout mt-16'>
            <h2>Plated printed objects</h2>
            <article className='prose mt-4 dark:prose-invert'>
              <p>
                There's something deeply satisfying about starting with just an idea,
                and then turning it into a shiny 24 karat gold piece of art. The process used to
                coat a shark tooth in gold can be used to coat just about anything you can spray paint,
                and since we can use 3D printing to make objects you can imagine, we can make just about anything you can think of!
                I don't have a lot of examples yet other than a gold sea turtle necklace I made, but stay tuned!
              </p>
              {'\n\n\n'}
            </article>
          </div>
        </section>
      </main>
    </Layout >
  );
}
