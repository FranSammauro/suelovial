# Suelo Vial — sitio estático

## Cómo verlo
Abrí `index.html` en el navegador (doble clic alcanza) o servilo con
un servidor local, por ejemplo:

```bash
python3 -m http.server 8000
```

y entrá a `http://localhost:8000`.

## Qué falta reemplazar (marcado en el código con comentarios `TODO` / `REEMPLAZO`)

1. **Video del hero** (`index.html`, sección `.hero`):
   - Poné el archivo en `assets/video/hero.mp4` (y opcionalmente un
     `.webm` para mejor compresión).
   - Descomentá el bloque `<video>` que está comentado arriba del
     `.hero__fallback`.
   - El fondo con líneas diagonales que ves ahora es solo un
     placeholder animado en CSS.

2. **Fotos de máquinas/camiones/terreno** (secciones `.equipamiento`
   y `.galeria`): reemplazá cada `src="assets/img/placeholder-*.svg"`
   por la foto real, guardándolas en `assets/img/`.

3. **Video vertical del iPhone**: tiene su propio slot en la galería
   (`.galeria__item.is-tall`), y ya está armado como `<video>` (no
   `<img>`, para no perder calidad convirtiéndolo a GIF). Guardá el
   archivo en `assets/video/vertical.mp4` y descomentá el `<source>`
   correspondiente en `index.html`.

4. **Datos de contacto**: ya están cargados el WhatsApp
   (+54 9 11 3775-8907), teléfono y mail reales. Si en algún momento
   quieren sumar una dirección con calle y número (hoy solo dice
   "Pilar, Buenos Aires"), se agrega en el mismo bloque de
   `.contacto__list` en `index.html`.

5. **Formulario de contacto**: hoy el botón "Enviar consulta" abre
   WhatsApp con el mensaje armado (no hay backend). Si prefieren que
   llegue por mail o a un CRM, hay que cambiar el handler en
   `js/script.js`.

## Estructura
```
index.html
css/styles.css
js/script.js
assets/img/       ← logo + placeholders de fotos
assets/video/     ← vacío, para el/los video(s) reales
```
