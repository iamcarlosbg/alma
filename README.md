# ALMA Ebanistería - Sitio Web

![ALMA Ebanistería](https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&h=400&fit=crop)

Sitio web profesional para ALMA Ebanistería con configurador de muebles interactivo, galería de proyectos y sistema de cotizaciones.

## 🌟 Características

### ✨ Funcionalidades Principales

- **Configurador de Muebles Interactivo**: Permite a los clientes diseñar sus propios muebles ajustando:
  - Tipo de mueble (Mesa, Estantería, Escritorio)
  - Dimensiones personalizadas (largo, ancho, alto)
  - Tipo de madera (Roble, Nogal, Cerezo, Pino)
  - Acabado (Natural, Barnizado, Lacado)
  - Cálculo de precio en tiempo real

- **Galería de Proyectos**: 
  - Sistema de filtrado por categorías
  - Imágenes de alta calidad
  - Información detallada de cada proyecto

- **Sección Sobre Nosotros**: Historia y valores de la empresa

- **Formulario de Contacto**: Con integración de mapa de Google Maps

- **Diseño Responsive**: Optimizado para móviles, tablets y desktop

### 🎨 Diseño

- Paleta de colores cálidos y naturales que refleja la artesanía en madera
- Tipografía elegante con Cormorant Garamond y Work Sans
- Animaciones suaves y transiciones
- Interfaz moderna e intuitiva

## 📁 Estructura del Proyecto

```
alma-ebanisteria/
│
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript interactivo
└── README.md          # Este archivo
```

## 🚀 Instalación en GitHub Pages

### Opción 1: Subir archivos manualmente

1. **Crea un repositorio en GitHub**:
   - Ve a [github.com](https://github.com) e inicia sesión
   - Click en "New repository"
   - Nombre: `alma-ebanisteria` (o el que prefieras)
   - Marca como "Public"
   - Click en "Create repository"

2. **Sube los archivos**:
   - Click en "uploading an existing file"
   - Arrastra los tres archivos: `index.html`, `styles.css`, `script.js`
   - Click en "Commit changes"

3. **Activa GitHub Pages**:
   - Ve a Settings → Pages
   - En "Source", selecciona "main" branch
   - Click en "Save"
   - Tu sitio estará disponible en: `https://tu-usuario.github.io/alma-ebanisteria`

### Opción 2: Usar Git (Línea de comandos)

```bash
# 1. Inicializa el repositorio
git init

# 2. Agrega los archivos
git add .

# 3. Haz el primer commit
git commit -m "Initial commit - ALMA Ebanistería website"

# 4. Conecta con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/alma-ebanisteria.git

# 5. Sube los archivos
git branch -M main
git push -u origin main
```

Luego activa GitHub Pages desde Settings → Pages

## ⚙️ Configuración y Personalización

### Cambiar Información de Contacto

En `index.html`, busca la sección de contacto y modifica:

```html
<!-- Email -->
<a href="mailto:info@almaebanisteria.com">info@almaebanisteria.com</a>

<!-- Teléfono -->
<a href="tel:+34123456789">+34 123 456 789</a>

<!-- Dirección -->
<p>Calle del Artesano 45<br>28001 Madrid, España</p>
```

### Cambiar Mapa de Ubicación

En `index.html`, busca el iframe del mapa y genera uno nuevo en [Google Maps](https://www.google.com/maps):

1. Busca tu dirección en Google Maps
2. Click en "Compartir" → "Insertar un mapa"
3. Copia el código iframe
4. Reemplaza el iframe existente

### Modificar Precios Base

En `script.js`, busca el objeto `basePrices`:

```javascript
const basePrices = {
    mesa: 300,        // Precio base por m² para mesas
    estanteria: 250,  // Precio base por m² para estanterías
    escritorio: 350   // Precio base por m² para escritorios
};
```

### Cambiar Imágenes de Proyectos

En `index.html`, reemplaza las URLs de Unsplash con tus propias imágenes:

```html
<img src="TU_IMAGEN.jpg" alt="Descripción">
```

**Recomendaciones para imágenes**:
- Formato: JPG o WebP
- Tamaño: 800x600px mínimo
- Peso: < 500KB por imagen
- Calidad: Alta resolución

## 🔄 Actualizar el Sitio

### Método Manual (GitHub Web):
1. Ve a tu repositorio
2. Click en el archivo que quieres editar
3. Click en el ícono del lápiz (Edit)
4. Realiza cambios
5. Click en "Commit changes"
6. Los cambios se reflejarán en 1-2 minutos

### Método Git:
```bash
# Realiza cambios en los archivos
# Luego:

git add .
git commit -m "Descripción de los cambios"
git push
```

## 📝 Próximas Mejoras (Futuro)

### Para Implementar Stripe:

1. **Crear cuenta en Stripe**:
   - Regístrate en [stripe.com](https://stripe.com)
   - Obtén tus API keys

2. **Agregar Stripe.js**:
```html
<script src="https://js.stripe.com/v3/"></script>
```

3. **Implementar checkout**:
```javascript
// En script.js
const stripe = Stripe('TU_PUBLIC_KEY');

// Crear sesión de checkout cuando se solicite cotización
const response = await fetch('/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        furnitureConfig: config,
        price: calculatedPrice 
    })
});
```

**Nota**: Stripe requiere un backend (servidor). Necesitarás:
- Netlify Functions, Vercel Functions, o similar
- O migrar a una plataforma con backend (Firebase, etc.)

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con variables CSS y Grid/Flexbox
- **JavaScript Vanilla**: Sin dependencias externas
- **Google Fonts**: Tipografía profesional
- **GitHub Pages**: Hosting gratuito

## 📱 Compatibilidad

- ✅ Chrome/Edge (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Dispositivos móviles iOS y Android

## 🐛 Solución de Problemas

### El sitio no se ve bien en GitHub Pages
- Verifica que los nombres de archivos sean exactos: `index.html`, `styles.css`, `script.js`
- Asegúrate de que están en la raíz del repositorio
- Espera 2-3 minutos después de activar Pages

### Las imágenes no cargan
- Las URLs de Unsplash pueden cambiar. Considera subir tus propias imágenes
- Usa rutas relativas si subes imágenes: `<img src="./images/proyecto1.jpg">`

### El formulario no envía datos
- Actualmente los formularios solo muestran alertas
- Para envío real, necesitas integrar un servicio como:
  - [Formspree](https://formspree.io) (gratis)
  - [EmailJS](https://www.emailjs.com) (gratis)
  - [Netlify Forms](https://www.netlify.com/products/forms/) (si migras a Netlify)

## 📧 Soporte

Para preguntas o ayuda con la implementación, puedes:
- Abrir un "Issue" en GitHub
- Contactar a través del formulario del sitio (una vez configurado)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

---

**Hecho con ❤️ para ALMA Ebanistería**
