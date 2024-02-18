import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {  GetServerSideProps, NextPage } from "next";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// interface SearchDogImage {
//   message: string;
//   status: string;
// }

interface IndexPageProps {
  initialDogImageUrl: string;
}

const fetchDogImage = async (): Promise<string> => {
  const res = await fetch("https://dog.ceo/api/breed/shiba/images/random/1");
  const result = await res.json();
  return result.message[0];
};

const Home: NextPage<IndexPageProps> = ( {initialDogImageUrl} ) => {
  const [dogImageUrl, setDogImageUrl] = useState(initialDogImageUrl);

  const handleClick = async () => {
    const dogImage = await fetchDogImage();
    setDogImageUrl(dogImage);
  };
  
  return (
    <div className={styles.container}>
      <h1>今日のHACHI</h1>
      <img src={dogImageUrl} alt="shiba image" />
      <button onClick={handleClick}>ワンワン !</button>
    </div>
  );
};

// Run API even when page loads with SSR
export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const dogImage = await fetchDogImage();
  return {
    props: {
      initialDogImageUrl: dogImage,
    },
  };
};

export default Home;
