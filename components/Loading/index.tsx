
import Image from "next/image"
import styles from "@/components/Loading/Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
        <div className={styles.loading_logo}>
          <div className={styles.fadeUp}>
            <div className={styles.fadeOut}>
                <Image
                  src="/logo.png"
                  alt="logo image"
                  width={200}
                  height={200}
                  priority
                />
            </div>
          </div>
        </div>
    </div>
  );
}

export { Loading }
