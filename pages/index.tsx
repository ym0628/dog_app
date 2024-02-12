import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>今日のHACHI</h1>
      <img src="https://images.dog.ceo/breeds/shiba/shiba-1.jpg" alt="shiba image" />
      <button>ワンワン !</button>
    </div>
  );
};

export default Home;
