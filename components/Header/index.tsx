import Link from "next/link";
import styles from "@/components/Header/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">HOME</Link>
      <Link href="/shiba">SHIBA</Link>
      <Link href="/akita">AKITA</Link>
    </header>
  );
}

export { Header }
