import { useContext } from "react";
import styles from "./Sumador.module.css"
import iconomas from "/icons/mas.svg"
import iconomenos from "/icons/menos.svg"
import { GlobalContext } from "../../context/GlobalContext";

function Sumador({ value, setValue, disabled }) {
    const{botonVibrar}=useContext(GlobalContext)
    const aumentar = () => setValue(prev => prev + 1);
    const disminuir = () => setValue(prev => (prev > 0 ? prev - 1 : 0));

    return (
        <section className={styles.principal}>

            <button className={styles.principal__resta} onClick={()=>{{botonVibrar(10);disminuir()}}} disabled={disabled}>
                <img src={iconomenos} alt="resta" />
            </button>
            <p className={styles.principal__titulovalor}>{value}</p>
            <button className={styles.principal__suma} onClick={()=>{{botonVibrar(10);aumentar()}}} disabled={disabled}>
                <img src={iconomas} alt="suma" />
            </button>


        </section>
    )
}
export default Sumador