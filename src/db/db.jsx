import Dexie from "dexie";

const db = new Dexie('clarygptovta');

db.version(5).stores(
    {
        ventas: 'id_vta, fecha_hora, id_cli, id_carrito, total_venta, entrega,id_entrega',
        carrito: 'id_carrito, [id_vta+id_arts], id_arts, cant, valor_venta, valor_x_cant',
        clientes: 'id_cli, nombre, whatsapp, nro_alternativo, ciudad, barrio, calle, numero_calle, piso, depto',
        entrega: 'id_entrega, fechayhora, mensaje, estado'
    }
);
export default db;