import styles from "./Sumador.module.css"

import iconomas from "/icons/mas.svg"
import iconomenos from "/icons/menos.svg"

function Sumador({ value, setValue, disabled }) {
    const aumentar = () => setValue(prev => prev + 1);
    const disminuir = () => setValue(prev => (prev > 0 ? prev - 1 : 0));

    return (
        <section className={styles.principal}>

            <button className={styles.resta} onClick={disminuir} disabled={disabled}>
                <img src={iconomenos} alt="resta" />
            </button>
            <p className={styles.titulovalor}>{value}</p>
            <button className={styles.suma} onClick={aumentar} disabled={disabled}>
                <img src={iconomas} alt="suma" />
            </button>


        </section>
    )
}
export default Sumador