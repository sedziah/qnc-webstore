// app/page.tsx

import type { ReactElement } from 'react';
import Hero from '../components/hero';
import SearchBar from '../components/searchbar';
import DealsHeader from '../components/deals/index';
import Carousel from '../components/imageSlider/index';

import disableConsoleInProduction from '../logger';

// Disable console logs in production
disableConsoleInProduction();

if (process.env.NODE_ENV === 'production') {
  console.log = function () {};
}

export default function Home(): ReactElement {
  return (
    <div>
      <SearchBar />
      <Hero />
      <DealsHeader />
      <Carousel />
    </div>
  );
}
