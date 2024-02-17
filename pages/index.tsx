import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { NextPage } from "next";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// interface SearchDogImage {
//   message: string;
//   status: string;
// }

// const random = Math.floor( Math.random() * 19 ) + 1;
// console.log( random );

const Home: NextPage = () => {
  const [dogImageUrl, setDogImageUrl] = useState("");

  const fetchDogImage = async (): Promise<string> => {
    const res = await fetch("https://dog.ceo/api/breed/shiba/images/random/1");
    const result = await res.json();
    return result.message[0];
  };
  
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

export default Home;
