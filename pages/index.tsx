import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

interface SeachDogImage {
  message: string;
  status: string;
}

// const random = Math.floor( Math.random() * 19 ) + 1;
// console.log( random );

const fetchDogImage = async (): Promise<SeachDogImage> => {
  const res = await fetch("https://dog.ceo/api/breed/shiba/images/random/1");
  const result = await res.json();
  return result.message[0];
};

const handleClick = async () => {
  const dogImage = await fetchDogImage();
  console.log(dogImage);
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>今日のHACHI</h1>
      <img src="https://images.dog.ceo/breeds/shiba/shiba-1.jpg" alt="shiba image" />
      <button onClick={handleClick}>ワンワン !</button>
    </div>
  );
};

export default Home;
