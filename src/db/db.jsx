import Dexie from "dexie";
const db = new Dexie('clarygptovta');
db.version(9).stores(
    {
        categorias: 'id_cats, categoria, imagen_categoria',
        sub_categorias: 'id_subcats, sub_categorias, categoria, imagen_subcategoria',
        articulos: 'id_arts, id_subcats,id_cats, articulo, descripcion, imagen_articulo, valor_venta, estado, presentacion, disponible ',
        ventas: 'id_vta, fecha_hora, id_cli, id_carrito, total_venta, entrega,id_entrega',
        carrito: 'id_carrito, [id_vta+id_arts], id_arts, nombreArts, cant, valor_venta, valor_x_cant',
        clientes: 'id_cli, nombre, whatsapp, nro_alternativo, departamento, distrito, calle, numero_calle, piso, depto',
        entrega: 'id_entrega, fechayhora, mensaje, estado'
    }
);
export default db;

