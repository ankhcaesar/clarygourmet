# ClaryGPToVta - Documentación  


-   **Estructura general del proyecto:**
clary-gourmet/
├── public/            # Assets estáticos
│   ├── icons/         # Íconos SVG
│   ├── imgs/          # Imágenes generales
│   └── favico.svg     # Favicon
├── src/
│   ├── components/    # Componentes reutilizables
│   ├── context/       # Gestión de estado global
│   ├── db/            # Conexiones a bases de datos
│   ├── hooks/         # Custom hooks
│   ├── pages/         # Vistas principales
│   ├── styles/        # Estilos globales
│   ├── App.jsx        # Componente principal
│   └── main.jsx       # Punto de entrada
├── .env               # Variables de entorno
├── package.json       # Dependencias
└── README.md          # Documentación


Estilos  
- Uso de **CSS Modules** para evitar colisiones.  
- Breakpoints: `480px` (móvil), `768px` (tablet), `1024px` (desktop).  
- Variables CSS para colores y sombras (opcional).  

Flujo de Trabajo  
1. **Inicio**: Animación → Redirige a `/Categorias`.  
2. **Categorias**: Muestra tarjetas con productos.  
3. **Carrito**: Gestión de items + resumen.  
4. **Checkout**: Formulario de envío → Resumen → Confirmación.

## Dependencias Clave

Este proyecto utiliza las siguientes tecnologías principales:

- **React**: Librería para construir la interfaz de usuario.
- **Vite**: Herramienta de construcción y servidor de desarrollo.
- **Supabase**: Backend como servicio (base de datos, autenticación).
- **IndexedDB**: Base de datos del lado del cliente para almacenamiento local.
- **React Router**: Para la navegación declarativa en la aplicación.
- **use-debounce**: Hook para retrasar la ejecución de funciones.

## Configuración e Instalación

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd clarygourmet
    ```
3.  Instala las dependencias:
    ```bash
    npm install

## Ejecución

-   Para iniciar el servidor de desarrollo con recarga en caliente:
    ```bash
    npm run dev

    La aplicación estará disponible en `http://localhost:5173/` (o el puerto que indique Vite).

-   Para construir la aplicación para producción:
    ```bash
    npm run build
    
    Esto generará los archivos de producción en el directorio `dist/`.

-   Para previsualizar la construcción de producción localmente:
    ```bash
    npm run preview
    
## Notas sobre la Base de Datos

-   **Supabase:**
    *   Asegúrate de tener un proyecto Supabase configurado.
    *   Necesitarás las credenciales (URL y clave `anon`) y configurarlas en las variables de entorno (ej. `.env` file). Consulta el archivo `db/supabaseclient.jsx` para ver cómo se utilizan.
    *   [Instrucciones adicionales si es necesario, ej. migración de esquema]

-   **IndexedDB:**
    *   La base de datos IndexedDB (`db/db.jsx`) se inicializa automáticamente al cargar la aplicación si no existe.
    *   Almacena datos localmente en el navegador del usuario.

