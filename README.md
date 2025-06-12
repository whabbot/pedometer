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
   git clone https://github.com/whabbot/pedometer.git --recursive
   ```

> [!NOTE]  
> Note the `--recursive` flag, it will clone the submodules as well. If missed, you will need to run `git submodule update --init` to initialize the submodules.

2. Build the wasm-pedometer crate

   ```bash
   cd wasm-pedometer
   wasm-pack build --target web
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

> [!NOTE]  
> Note the `wasm-pedometer` dependency in the `package.json` file, it will use the wasm-pedometer crate created in the previous step.

4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Technologies Used

- React
- TypeScript
- Vite
- uPlot
- WebAssembly (WASM)
- Rust
- CSS3

## License

MIT
