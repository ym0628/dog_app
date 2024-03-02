import styles from "@/components/Headline/Headline.module.css";

type Props = {
  title: string
}

const Headline = (props: Props) => {
  return (
    <div>
      <h1 className={styles.title}>
        {props.title}
      </h1>
    </div>
  );
}

export { Headline }
