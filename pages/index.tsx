import styles from "@/styles/Home.module.css";
import { Header } from "@/components/Header";
import Image from "next/image"

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <h1>今日のDOG</h1>
      <Image
        src="/dog.png"
        alt="dog image"
        width={300}
        height={300}
        priority
      />
    </div>
  );
};

export default Home;
