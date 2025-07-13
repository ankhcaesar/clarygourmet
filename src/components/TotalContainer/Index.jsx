import { useContext } from "react";
import styles from "./TotalContainer.module.css";
import { GlobalContext } from "../../context/GlobalContext";
import Loader from "../Loader/Index";
import ScrollContainer from "../ScrollContaiiner/Index";

function TotalContainer({ children }) {
  const { loader } = useContext(GlobalContext);

  return (
    <section className={styles.total__container}>
      
      <ScrollContainer direction="vertical" scrollStep={100}>
        {children}
      </ScrollContainer>
        {loader.show && <Loader />}
    </section>
  );
}

export default TotalContainer;
