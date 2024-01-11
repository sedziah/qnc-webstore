// app/page.tsx

import Hero from '../components/hero';
import SearchBar from '../components/searchbar';
import DealsHeader from '../components/deals/index';
import Carousel from "../components/imageSlider/index";
import React from 'react'
import Footer from '../components/footer/index';

export default function Home() {
  return (
    <div>
      <SearchBar />
      <Hero />
      <DealsHeader />
      <Carousel />
      <Footer />
    </div>
  );
}
