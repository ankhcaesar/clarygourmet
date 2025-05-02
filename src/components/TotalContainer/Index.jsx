import { useContext } from "react"
import styles from "./TotalContainer.module.css";
function TotalContainer({ children }) {

    return (
        <section className={styles.SuperContainer}>
            {children}
        </section>
    )
}
export default TotalContainer