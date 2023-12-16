import Hero from '../components/hero';
import SearchBar from '../components/searchbar';
import React from 'react'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./page.module.css"

export default function Home() {
  return (
    <div>
      {/* <SearchBar /> */}
      <Hero />
    </div>
  );
}
