import React, { useState, useEffect } from 'react';
import Node from './components/Node';
import Navbar from './components/Navbar';
import { getInitialGrid } from './utils/helpers';
import { dijkstra, getNodesInShortestPathOrder } from './algorithms/dijkstra';

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
    const startNode = grid[10][5];
    const finishNode = grid[10][35];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
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
      <Navbar visualizeDijkstra={visualizeDijkstra} clearGrid={() => setGrid(getInitialGrid())} />
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