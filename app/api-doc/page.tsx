import { getApiDocs } from "@/utils/swagger";
import ReactSwagger from "./react-swagger";
import styles from './reset.module.css';
export default async function IndexPage() {
  const spec = await getApiDocs();  
  return (
    <section className={styles.resetContainer}>
      <ReactSwagger spec={spec} />
    </section>
  );
}