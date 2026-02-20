import React, { useState, useEffect } from 'react';
import Node from './components/Node';
import Navbar from './components/Navbar';
import { getInitialGrid } from './utils/helpers';
import { dijkstra, getNodesInShortestPathOrder } from './algorithms/dijkstra';
import { bfs } from './algorithms/bfs';
import { dfs } from './algorithms/dfs';

function App() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  useEffect(() => {
    setGrid(getInitialGrid());
  }, []);

  const handleMouseDown = (row, col) => {
    const newGrid = toggleWall(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    setGrid(toggleWall(grid, row, col));
  };

  const handleMouseUp = () => setMouseIsPressed(false);

  const visualizeDijkstra = () => {
    resetGridState();
    const startNode = grid[10][5];
    const finishNode = grid[10][35];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animate(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualizeBFS = () => {
    resetGridState();
    const startNode = grid[10][5];
    const finishNode = grid[10][35];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animate(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualizeDFS = () => {
    resetGridState();
    const startNode = grid[10][5];
    const finishNode = grid[10][35];
    // pass true so DFS will exhaustively search and return the shortest path
    const visitedNodesInOrder = dfs(grid, startNode, finishNode, true);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animate(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => animatePath(nodesInShortestPathOrder), 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 
            'w-6 h-6 border border-blue-100 animate-visited';
        }
      }, 10 * i);
    }
  };

  const resetGridState = () => {
    // clear any previous visit markers so repeated runs look clean
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const node = grid[row][col];
        node.isVisited = false;
        node.distance = Infinity;
        node.previousNode = null;
        // restore base DOM class so old animation styles are removed
        const elem = document.getElementById(`node-${row}-${col}`);
        if (elem) {
          const bgClass = node.isFinish
            ? 'bg-red-500'
            : node.isStart
            ? 'bg-green-500'
            : node.isWall
            ? 'bg-slate-800 border-slate-800'
            : 'bg-white';
          elem.className = `w-6 h-6 border border-blue-100 transition-all duration-300 ${bgClass}`;
        }
      }
    }
  };

  const animatePath = (path) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 
            'w-6 h-6 border border-blue-100 animate-shortest-path';
        }
      }, 50 * i);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
        visualizeDijkstra={visualizeDijkstra} 
        visualizeBFS={visualizeBFS} 
        visualizeDFS={visualizeDFS}
        clearGrid={() => setGrid(getInitialGrid())} 
      />
      <div className="flex flex-col items-center mt-10">
        <div className="flex flex-col border border-slate-300 shadow-2xl">
          {grid.map((row, rIdx) => (
            <div key={rIdx} className="flex">
              {row.map((node, cIdx) => (
                <Node key={cIdx} {...node} onMouseDown={handleMouseDown} onMouseEnter={handleMouseEnter} onMouseUp={handleMouseUp} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const toggleWall = (grid, row, col) => {
  const newGrid = [...grid];
  const node = newGrid[row][col];
  newGrid[row][col] = { ...node, isWall: !node.isWall };
  return newGrid;
};

export default App;