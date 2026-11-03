import fs from 'node:fs/promises';
const json = JSON.parse(await fs.readFile('public/GIS/cityGIS.json','utf8'));
console.log('features:', json.features.length);
const types = new Map();
let bad = 0;
for (const f of json.features) { if (!f.geometry) { bad += 1; continue; } types.set(f.geometry.type, (types.get(f.geometry.type) || 0) + 1); }
console.log('bad geometry features:', bad);
console.log('geometry types:', Object.fromEntries(types));
const firstPoly = json.features.find(f => f.geometry && f.geometry.type === 'Polygon');
if (firstPoly) console.log('first Polygon rings:', firstPoly.geometry.coordinates.length, firstPoly.geometry.coordinates[0].length);
const firstMulti = json.features.find(f => f.geometry && f.geometry.type === 'MultiPolygon');
if (firstMulti) console.log('first MultiPolygon polygons:', firstMulti.geometry.coordinates.length);
