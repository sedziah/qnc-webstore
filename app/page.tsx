// app/page.tsx

import Hero from '../components/hero';
import SearchBar from '../components/searchbar';
import DealsHeader from 'components/deals';
import React from 'react'

export default function Home() {
  return (
    <div>
      <SearchBar />
      <Hero />
      <DealsHeader />
    </div>
  );
}
