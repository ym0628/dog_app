import styles from "@/styles/Home.module.css";
import { Header } from "@/components/Header";
import { Headline } from "@/components/Headline";
import Image from "next/image"

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Headline title="今日のDOG" />
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
