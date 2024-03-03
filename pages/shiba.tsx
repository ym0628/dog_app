import styles from "@/styles/Shiba.module.css";
import { Header } from "@/components/Header";
import { Headline } from "@/components/Headline";
import Image from "next/image"
import {  GetServerSideProps, NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

interface IndexPageProps {
  initialDogImageUrl: string;
}

const fetchDogImage = async (): Promise<string> => {
  const res = await fetch("https://dog.ceo/api/breed/shiba/images/random/1");
  const result = await res.json();
  return result.message[0];
};

const Shiba: NextPage<IndexPageProps> = ( {initialDogImageUrl} ) => {
  const [dogImageUrl, setDogImageUrl] = useState(initialDogImageUrl);

  const handleClick = useCallback( async () => {
    const dogImage = await fetchDogImage();
    setDogImageUrl(dogImage);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = "beige";
    return () => {
      document.body.style.backgroundColor = "";
    }
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <Headline title="今日のSHIBA" />
      <Image
        src={dogImageUrl}
        alt="shiba image"
        width={300}
        height={300}
        priority
      />
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

export default Shiba;
