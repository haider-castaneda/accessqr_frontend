# AccessQR — Frontend

Interfaz web del sistema de control de ingreso y salida mediante códigos QR.
Proyecto formativo, ficha 3410645 — Centro de Biotecnología Agropecuaria, Mosquera.

> **Prototipo académico.** Se demuestra únicamente con datos ficticios.

Necesita el backend en marcha: https://github.com/haider-castaneda/accessqr_backend

---

## Qué hace

Doce pantallas repartidas en tres zonas:

- **Pública.** Inicio con acceso del personal y consulta del código QR, registro
  de usuarios nuevos, confirmación y credencial con el QR.
- **Portería.** Escáner con la cámara, registro de visitantes, reposición de
  códigos y revisión de solicitudes pendientes. Pensada para usarse de pie, con
  el teléfono en una mano.
- **Administración.** Resumen con indicadores, solicitudes pendientes, usuarios,
  historial, reportes y cuentas de personal.

## Tecnologías

| Herramienta | Versión | Para qué |
|---|---|---|
| React | 19.3.1 | Interfaz |
| Vite | 8.3.4 | Servidor de desarrollo y empaquetado |
| react-router-dom | 7.18.4 | Navegación y protección por rol |
| html5-qrcode | 2.3.8 | Lectura del QR con la cámara |
| Bootstrap | 5.3.8 | Rejilla y estilos base |
| @vitejs/plugin-basic-ssl | 2.3.0 | HTTPS local, necesario para la cámara |

## Estructura

```
src/
├── App.jsx                 Rutas y protección por rol
├── main.jsx
├── index.css               Tema: color, tipografía, forma
├── estilos/ui.css          Componentes de interfaz (clases aq-)
├── components/             Navbar, Cargando, EstadoVacio, Iconos
├── services/
│   ├── api.js              Peticiones, token y manejo del 401
│   ├── sesion.js           Guardar, leer y borrar la sesión
│   └── formato.js          Fechas y colores de estado
└── pages/
    ├── Home/ Registro/ Confirmacion/ MiQR/
    ├── Lector/             Lector, Escaner, Visitantes, ReponerQR, PendientesCelador
    └── PanelAdmin/         PanelAdmin, Resumen, Pendientes, Usuarios, Historial,
                            Reportes, Personal
```

---

## Instalación

Requisitos previos: Node.js 20 o superior, y el backend corriendo en el puerto 5000.

```bash
git clone https://github.com/haider-castaneda/accessqr_frontend.git
cd accessqr_frontend
npm ci
npm run dev
```

Abre `https://localhost:5173`.

### Por qué arranca en HTTPS

Los navegadores solo permiten usar la cámara en páginas seguras o en `localhost`.
Como la portería se usa desde un celular, el proyecto incluye el plugin
`basic-ssl`, que genera un certificado local. La primera vez el navegador avisa
de que el certificado no es de confianza: hay que entrar en **Configuración
avanzada** y continuar. Es normal; el certificado lo emite el propio Vite.

### Cómo llegan las peticiones al backend

El código pide `/api/...` sin escribir ninguna dirección. Vite reenvía esas rutas
al puerto 5000 mediante el proxy configurado en `vite.config.js`, de modo que en
desarrollo el navegador cree que todo viene del mismo sitio y CORS no interviene.

Solo al desplegar hace falta definir la dirección real. Para eso está
`.env.example`:

```
VITE_API_URL=https://tu-backend-real.com/api
```

En desarrollo no se crea ningún `.env`: sin esa variable, las peticiones salen a
`/api` y el proxy hace el resto.

## Probar desde el celular

1. Averiguar la dirección del computador con `ipconfig` (línea *Dirección IPv4*).
2. Al arrancar, Vite imprime una línea **Network** con `https://192.168.x.x:5173`.
   Esa es la dirección que se abre en el teléfono.
3. El celular debe estar en la misma red wifi. Si la red aísla los dispositivos,
   usar el punto de acceso del teléfono y conectar el computador a él.
4. Aceptar el aviso del certificado y dar permiso a la cámara cuando lo pida.

Si la página no carga, lo más probable es el firewall de Windows: la primera vez
que arranca Vite pregunta si permite el acceso y hay que aceptarlo en redes
privadas.

## Compilar para producción

```bash
npm run build
npm run preview
```

En producción no se duplica el lector de QR. Si durante el desarrollo aparecen
dos cámaras, es el modo estricto de React montando el componente dos veces; no
ocurre en la versión compilada.

## Accesos de demostración

Con la base de datos de ejemplo del backend:

| Rol | Documento | Contraseña |
|---|---|---|
| Administrador | 1070998877 | Prueba2026 |

Los usuarios (aprendices, instructores, empleados y miembros) no tienen sesión:
consultan su código QR con su documento y su contraseña cada vez, desde la
pantalla de inicio. Es una decisión de diseño: el QR es lo único que necesitan y
así no queda nada abierto en un computador prestado.

## Autores

Edison Alejandro López Mojica y Haider Santiago Castañeda Contreras.
Ficha 3410645 — Tecnico en Análisis y Desarrollo de Software.