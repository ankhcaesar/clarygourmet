import styles from "./Filtrado.module.css";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useLocation } from "react-router-dom";
import { useArticulosPorSubcategorias } from "../../hooks/useArticulosPorSubcategorias";
import ScrollContainer from "../../components/ScrollContaiiner/Index";
import TarjetasProductos from "../../components/TarjetasProductos/Index";
import AddCarrito from "../../components/AddCarrito/Index";
import { ProductionQuantityLimits } from "@mui/icons-material";


function Filtrado() {
  const location = useLocation();
  const { id_cats, categoria } = location.state;
  const { setBotonMenu, addCarrito, setCabecera, setAddCarrito, setLoader, botonVibrar } = useContext(GlobalContext);
  const { data, loading } = useArticulosPorSubcategorias(id_cats);


  useEffect(() => {
    setBotonMenu("subcategorias");
    setCabecera((prev) => ({ ...prev, titulo: categoria, origen: "categorias" }));

    if (loading) {
      setLoader({ show: true });
    } else {
      setLoader({ show: false });
    }
  }, [loading]);

  return (
    <section className={styles.filtrado}>
      <section className={styles.filtrado__principal}>
        {data.length === 0 ? (
          <div className={styles.carrito__principal__mensaje}>
            <ProductionQuantityLimits fontSize="large" sx={{ color: "red" }} />
            <p className={styles.carrito__principal__mensaje_mensaje}>No hay productos para mostrar.</p>
          </div>
        ) : (
          <ScrollContainer direction="vertical" scrollStep={260}>
            {data.map((grupo) => (
              <section key={grupo.id_subcats} className={styles.filtrado__subcats}>
                <h2 className={styles.filtrado__titulo}>{grupo.sub_categorias}</h2>
                {grupo.articulos.length === 0 ? (
                  <div className={styles.carrito__principal__mensaje}>
                    <ProductionQuantityLimits fontSize="large" sx={{ color: "red" }} />
                    <p className={styles.carrito__principal__mensaje_mensaje}>No hay productos para mostrar.</p>
                  </div>
                ) : (
                  <div className={styles.filtrado__articulos}>
                    <ScrollContainer direction="horizontal" scrollStep={400}>
                      {grupo.articulos.map((arts) => (
                        <TarjetasProductos
                          key={arts.id_arts}
                          nombre={arts.articulo}
                          imagen={arts.imagenUrl || arts.imagen_articulo}
                          onclick={() => { botonVibrar(25); setAddCarrito({ show: true, data: [arts] }) }}
                        />

                      ))}
                    </ScrollContainer>
                  </div>
                )}

              </section>

            ))}
          </ScrollContainer>
        )}
      </section>
      {addCarrito.show && <AddCarrito data={addCarrito.data} />}
    </section>
  );
}

export default Filtrado;
