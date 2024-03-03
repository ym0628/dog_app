import styles from "@/styles/Akita.module.css";
import { Header } from "@/components/Header";
import { Headline } from "@/components/Headline";
import Image from "next/image"
import {  GetServerSideProps, NextPage } from "next";
import { useCallback, useState } from "react";
import { useBgLightblue } from "@/hooks/useBgLightblue";

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
  useBgLightblue();

  const handleClick = useCallback( async () => {
    const dogImage = await fetchDogImage();
    setDogImageUrl(dogImage);
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <Headline title="今日のAKITA" />
      <Image
        src={dogImageUrl}
        alt="akita image"
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

export default Akita;
