import { Inter } from "next/font/google";
import styles from "@/styles/Akita.module.css";
import { Header } from "@/components/Header";
import {  GetServerSideProps, NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// interface SearchDogImage {
//   message: string;
//   status: string;
// }

interface IndexPageProps {
  initialDogImageUrl: string;
}

const fetchDogImage = async (): Promise<string> => {
  const res = await fetch("https://dog.ceo/api/breed/akita/images/random/1");
  const result = await res.json();
  return result.message[0];
};

const Akita: NextPage<IndexPageProps> = ( {initialDogImageUrl} ) => {
  const [dogImageUrl, setDogImageUrl] = useState(initialDogImageUrl);

  const handleClick = useCallback( async () => {
    const dogImage = await fetchDogImage();
    setDogImageUrl(dogImage);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = "lightblue";
    return () => {
      document.body.style.backgroundColor = "";
    }
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <h1>今日のAKITA</h1>
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

export default Akita;
