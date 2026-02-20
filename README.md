# 🚀 Pathfinding Visualizer

A high-performance web application built with **React** and **Tailwind CSS** that visualizes classic graph search algorithms. This project demonstrates advanced knowledge of **Data Structures and Algorithms (DSA)**, **Direct DOM Manipulation** for smooth animations, and **Modern Web Development** practices.

## ✨ Features
- **Dijkstra's Algorithm**: Guarantees the shortest path in a weighted graph.
- **Breadth-First Search (BFS)**: Explores nodes level by level and finds the shortest path on an unweighted grid.
- **Depth-First Search (DFS)**: Goes as deep as possible along each branch; the visualization now includes an option to compute the *shortest* path by brute force, which requires searching every reachable node and is therefore highly inefficient compared to BFS or Dijkstra.  This contrasts the naive DFS with a tuned version that still uses depth‑first exploration but guarantees optimal results.
- **Interactive Maze Building**: Click and drag to draw walls and create complex obstacles.
- **Real-time Visualization**: Watch the algorithm explore the grid with custom-designed Tailwind CSS animations.
- **Responsive & High Performance**: Optimized rendering to maintain 60FPS during large-scale grid traversals.

## 🛠️ Tech Stack
- **Frontend**: React.js (Hooks, Context API)
- **Styling**: Tailwind CSS v4 (Custom Keyframes & Animations)
- **Build Tool**: Vite
- **Algorithm Logic**: Pure JavaScript (Graph Theory)

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

### Algorithm Options

Use the buttons in the navbar to select which search you want to visualize.  After walls have been drawn:
1. Click **Dijkstra** for the standard weighted algorithm.
2. Click **BFS** to see breadth-first exploration; the shortest path will still be found.
3. Click **DFS** to watch depth-first traversal.  Under the hood the app performs a brute-force search to guarantee the shortest path, which means it touches every reachable cell before settling on the route – the animation will therefore be much slower compared to the other algorithms.
4. Use **Clear Grid** to reset the board at any time.

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/sunnybhardwaj2027/pathfinding-visualizer.git](https://github.com/sunnybhardwaj2027/pathfinding-visualizer.git)