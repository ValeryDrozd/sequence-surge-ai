import * as d3Voronoi from 'd3-voronoi';
import * as d3Color from 'd3-color';

// Function to generate random points
export const generateRandomPoints = (count) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    points.push([Math.random() * 500, Math.random() * 500]);
  }
  return points;
};

// Function to generate polyhedrons
export const generatePolyhedrons = (count) => {
  const newPoints = generateRandomPoints(count);
  const voronoi = d3Voronoi.voronoi()
    .extent([[0, 0], [500, 500]])
    .polygons(newPoints);

  return voronoi.map((polygon, index) => ({
    id: index + 1,
    points: polygon,
    number: index + 1,
    color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
    isVisible: true, // Add visibility property
  }));
};

// Function to calculate centroid
export const calculateCentroid = (points) => {
  const x = points.reduce((sum, p) => sum + p[0], 0) / points.length;
  const y = points.reduce((sum, p) => sum + p[1], 0) / points.length;
  return [x, y];
};
