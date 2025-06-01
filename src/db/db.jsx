import Dexie from "dexie";

const db = new Dexie('clarygptovta');

db.version(1).stores(
    {
        ventas: '++id_vta, fecha_hora, id_cli, id_arts, cant, valor_unit, valor_total',
        clientes: '++id_cli, nombre, whatsapp, nro_alternativo, ciudad, barrio, calle, numero_calle, piso, depto',
        entrega:'++id_entrega, id_cli, fechayhora, delivery, mensaje'
    }
);
export default db;
