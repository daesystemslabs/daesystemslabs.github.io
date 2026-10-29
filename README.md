# DAESystemsLabs — Página Web

Sitio web estático en español para presentar las aplicaciones de escritorio para Windows de **DAESystemsLabs**: **Xtecla**, **KioscoApp** y **AlacartaApp**.

## 📸 Cómo agregar capturas de pantalla reales
Para mostrar las capturas reales de Xtecla y KioscoApp:
1. Creá una carpeta llamada `images/` en la raíz del proyecto.
2. Guardá la captura de Xtecla como `images/xtecla.png`.
3. Guardá la captura de KioscoApp como `images/kiosco.png`.

El sitio web detectará automáticamente las imágenes y permitirá visualizarlas en alta resolución haciendo clic o mediante el botón de lupa. Si las imágenes no están presentes, se mostrarán las ilustraciones decorativas vectoriales como alternativa.

## 🔗 Configurar enlaces de Microsoft Store
En `script.js`, actualizá los valores de `storeLinks.xtecla` y `storeLinks.kiosco` con las URLs oficiales de Microsoft Store de cada aplicación:
```javascript
const storeLinks = {
  xtecla: "https://apps.microsoft.com/detail/...",
  kiosco: "https://apps.microsoft.com/detail/..."
};
```

## Publicar con GitHub Pages
Subí estos archivos al repositorio de GitHub Pages. En la configuración de tu repositorio (**Settings → Pages**), elegí publicar desde la rama `main`, carpeta `/ (root)`.
