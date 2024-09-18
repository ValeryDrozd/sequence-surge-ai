const Polygon = styled.polygon`
  fill: ${(props) => props.bgColor};
  stroke: black;
  stroke-width: 2;
  cursor: pointer;
  text {
    fill: ${(props) => props.textColor};
    font-size: 14px;
    font-weight: bold;
  }
`;

function Polyhedron({ points, number, color, onClick }) {
  const hexToRgb = (hex) => {
    let bigint = parseInt(hex.slice(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r, g, b];
  };

  const [r, g, b] = hexToRgb(color);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const textColor = brightness > 180 ? 'black' : 'white'; // Adjust text color based on brightness

  return (
    <g onClick={onClick}>
      <Polygon points={points.map((p) => p.join(',')).join(' ')} bgColor={color} />
      <text x={points[0][0]} y={points[0][1]} textColor={textColor}>
        {number}
      </text>
    </g>
  );
}
