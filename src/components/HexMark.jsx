import React from 'react';

export const HexMark = ({ size = 36, color = "#F4801F", strokeWidth = 1.6 }) => {
  // Flat-top hexagon helper: center cx,cy, radius r
  const hex = (cx, cy, r) => {
    const pts = Array.from({length:6},(_,i)=>{
      const a = (Math.PI/3)*i - Math.PI/6;
      return (cx + r*Math.cos(a)) + "," + (cy + r*Math.sin(a));
    });
    return pts.join(" ");
  };
  const r = size * 0.27;
  const dx = r * 1.73; // horizontal spacing = sqrt(3)*r
  const dy = r * 1.5;  // vertical spacing = 1.5*r
  // 4-hex cluster: top-left, top-right, bottom-left, bottom-right offset
  const centers = [
    [size*0.28, size*0.30],  // top-left
    [size*0.28 + dx, size*0.30],  // top-right
    [size*0.28 + dx*0.5, size*0.30 + dy],  // bottom-middle-left
    [size*0.28 + dx*1.5, size*0.30 + dy],  // bottom-right
  ];
  return (
    <svg width={size} height={size} viewBox={"0 0 "+size+" "+size} fill="none" style={{flexShrink:0}}>
      {centers.map(([cx,cy],i)=>(
        <polygon key={i} points={hex(cx,cy,r)} stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round"/>
      ))}
    </svg>
  );
};

/* Large decorative hex mark for backgrounds */
export const HexMarkLarge = ({ size = 480, color = "#F4801F", opacity = 0.05 }) => (
  <div style={{position:"absolute",pointerEvents:"none",opacity}}>
    <HexMark size={size} color={color} strokeWidth={0.8}/>
  </div>
);
