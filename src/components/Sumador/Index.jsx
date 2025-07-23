import { useContext } from "react";
import styles from "./Sumador.module.css"
import { Add, Remove } from "@mui/icons-material"
import { GlobalContext } from "../../context/GlobalContext";


function Sumador({ value, setValue, disabled }) {
    const{botonVibrar}=useContext(GlobalContext)
    const aumentar = () => setValue(prev => prev + 1);
    const disminuir = () => setValue(prev => (prev > 0 ? prev - 1 : 0));

    return (
        <section className={styles.principal}>

            <button className={styles.principal__resta} onClick={()=>{{botonVibrar(10);disminuir()}}} disabled={disabled}>
                <Add fontSize="medium"/>
            </button>
            <p className={styles.principal__titulovalor}>{value}</p>
            <button className={styles.principal__suma} onClick={()=>{{botonVibrar(10);aumentar()}}} disabled={disabled}>
                <Remove fontSize="medium"/>
            </button>


        </section>
    )
}
export default Sumador