const Node = ({ row, col, isStart, isFinish, isWall, onMouseDown, onMouseEnter, onMouseUp }) => {
  const bgClass = isFinish 
    ? 'bg-red-500' 
    : isStart 
    ? 'bg-green-500' 
    : isWall 
    ? 'bg-slate-800 border-slate-800' 
    : 'bg-white';

  return (
    <div
      id={`node-${row}-${col}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
      className={`w-6 h-6 border border-blue-100 transition-all duration-300 ${bgClass}`}
    />
  );
};

export default Node;