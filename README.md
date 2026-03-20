# 🧮 CalculatorPro

Una aplicación web de calculadora potente, elegante y completa. Combina cálculo estándar, científico, de fechas y una amplia gama de conversores de unidades en una sola herramienta.

![CalculatorPro Banner](./docs/assets/readme/banner.png)

## 🌟 Características (Features)

### 1. Modo Estándar (Standard Mode)
- Operaciones aritméticas básicas: suma, resta, multiplicación y división.
- Historial de cálculos: guarda automáticamente tus operaciones para consultarlas en cualquier momento.
- Diseño responsivo: experiencia perfecta en cualquier dispositivo.

### 2. Modo Científico (Scientific Mode)
- Funciones trigonométricas: sin, cos, tan (con soporte para DEG/RAD).
- Operaciones logarítmicas: log, ln.
- Potencias y raíces: x², x^y, √x, 10^x.
- Constantes matemáticas: soporte para π y e.
- Otros: valor absoluto (|x|), factoriales (n!) y módulo (mod).

### 3. Cálculo de Fechas (Date Calculation)
- Calcula la diferencia entre dos fechas (años, meses, días).
- Suma o resta días a una fecha específica.

### 4. Mega Conversor (Mega Converter)
Incluye más de 13 tipos de conversiones:
- **Finanzas**: Moneda (Currency) - *Soporte con tasas en tiempo real*.
- **Geometría**: Longitud (Length), Área (Area), Volumen (Volume), Ángulos (Angle).
- **Física**: Peso y Masa (Weight & Mass), Velocidad (Speed), Energía (Energy), Potencia (Power), Presión (Pressure), Temperatura (Temperature).
- **Digital**: Datos (Data - bit, KB, MB, GB, TB).
- **Tiempo**: Conversión entre unidades de tiempo.

### 5. Experiencia de Usuario (UX/UI)
- **Modo Oscuro/Claro**: Cambia con un solo clic para proteger tu vista.
- **Efecto Glassmorphism**: Diseño visual moderno y sofisticado.
- **Implementación Nativa**: Construido con HTML5, CSS3 (Vanilla CSS) y JavaScript puro (ES6+), sin dependencias pesadas y con carga ultrarrápida.

## 🛠️ Tecnologías (Tech Stack)

- **Frontend**: HTML5, Vanilla CSS3 (Custom Properties, Grid, Flexbox).
- **Lógica**: Vanilla JavaScript (ES Modules).
- **Iconos**: Font Awesome 5 Pro.
- **Tipografía**: Google Fonts (Outfit, Inter).

## 🚀 Inicio Rápido (Quick Start)

### Ejecución Local
Como este proyecto utiliza módulos de JavaScript (ES Modules), se recomienda usar un servidor local para evitar problemas de CORS.

1. **Clonar el proyecto**:
   ```bash
   git clone https://github.com/JorgeValerio3/Calculadora.git
   ```
2. **Iniciar servidor**:
   Si tienes Node.js instalado, puedes usar `serve`:
   ```bash
   npx serve ./docs
   ```
   O utiliza la extensión **Live Server** de VS Code.

### Despliegue
El proyecto está optimizado para desplegarse directamente en GitHub Pages. Solo necesitas configurar la carpeta `docs` como la fuente de tu sitio.

## 📁 Estructura del Proyecto (Folder Structure)

```text
Calculadora/
├── docs/               # Código fuente y activos estáticos (GitHub Pages)
│   ├── assets/         # Estilos e imágenes
│   ├── module/         # Módulos de lógica central en JS
│   ├── programs/       # Plantillas HTML para cada modo
│   ├── index.html      # Punto de entrada
│   └── script.js       # Lógica principal del sistema
└── README.md           # Documentación del proyecto
```

## 📄 Licencia (License)

Este proyecto está bajo la licencia [MIT License](LICENSE).

---
Creado con ❤️ por [Jorge Valerio](https://github.com/JorgeValerio3)