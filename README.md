# 3D Data Visualizer

A lightweight, interactive web application for visualizing 3D coordinate data in a 2D line chart. Built with React, TypeScript, and uPlot for high-performance rendering.

## Features

- 📊 Visualize 3D coordinate data in an interactive line chart
- 📁 Simple file upload interface
- 🎨 Color-coded series for X, Y, and Z coordinates
- 🔄 Responsive design that works on all screen sizes
- ⚡ Fast rendering with uPlot library

## Data Format

Upload a text or CSV file with the following format:

```
x1,y1,z1;x2,y2,z2;x3,y3,z3;...
```

- Each `x,y,z` represents a 3D coordinate point
- Points are separated by semicolons (`;`)
- Values within each point are separated by commas (`,`)

## Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/whabbot/pedometer.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Technologies Used

- React
- TypeScript
- Vite
- uPlot
- WebAssembly (WASM)
- Rust
- CSS3

## Building the wasm-pedometer crate

```bash
cd frontend
npm run build:wasm
```

## License

The Rust code in rust-core is a port of the pedometer pipeline from [500 Lines or Less -
A Pedometer in the Real World by Dessy Daskalov](https://aosabook.org/en/500L/a-pedometer-in-the-real-world.html)

The original work is licensed under the [Creative Commons License](https://aosabook.org/en/license.html)
