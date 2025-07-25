import { useLiveQuery } from "dexie-react-hooks";
import db from "../db/db";

export function useVentaActual(id_vta) {
  const venta = useLiveQuery(
    () => (id_vta ? db.ventas.get(id_vta) : null),
    [id_vta]
  );

  const cliente = useLiveQuery(
    () => (venta?.id_cli ? db.clientes.get(venta.id_cli) : null),
    [venta?.id_cli]
  );

  const entrega = useLiveQuery(
    () => (venta?.id_entrega ? db.entrega.get(venta.id_entrega) : null),
    [venta?.id_entrega]
  );

  return { venta, cliente, entrega };
}
