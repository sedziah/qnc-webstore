// app/page.tsx

import Hero from '../components/hero';
import SearchBar from '../components/searchbar';
import DealsHeader from '../components/deals/index';
import Carousel from "../components/imageSlider/index";
import Banner from "../components/banner/index";
import React from 'react'

export default function Home() {
  return (
    <div>
      <SearchBar />
      <Hero />
      <DealsHeader />
      <Carousel />
      <Banner src="/images/banner/qnc_banner_1.png" alt="banner"/>
    </div>
  );
}
