import { useContext } from "react"
import styles from "./TotalContainer.module.css";
import { GlobalContext } from "../../context/GlobalContext";
import Loader from "../Loader/Index";

function TotalContainer({ children }) {

    const{loader}=useContext(GlobalContext)

    return (
        <section className={styles.SuperContainer}>
            {children}
            {loader.show && <Loader/> }
        </section>
    )
}
export default TotalContainer