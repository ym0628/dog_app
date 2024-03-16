import styles from "@/styles/Home.module.css";
import { Header } from "@/components/Header";
import { Headline } from "@/components/Headline";
import Image from "next/image"
import { Loading } from "@/components/Loading";

const Home = () => {
  return (
    <div>
      <div className={styles.loading}>
        <Loading />
      </div>
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
    </div>
  );
};

export default Home;
