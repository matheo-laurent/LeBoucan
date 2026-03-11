// src/components/Map.jsx
import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  ISLAND_OUTLINE, ELEVATION_ZONES, POIS, POI_TYPE_COLORS,
  CAMERA, LIGHTS, SCENE_COLORS, OCEAN_RINGS,
} from '../data/map.js';

function normToXZ(nx, ny, scale = 2.0) {
  return [(nx - 0.5) * scale, (ny - 0.5) * scale];
}

function buildShape(points) {
  const shape = new THREE.Shape();
  const [x0, z0] = normToXZ(points[0][0], points[0][1]);
  shape.moveTo(x0, z0);
  for (let i = 1; i < points.length; i++) {
    const [x, z] = normToXZ(points[i][0], points[i][1]);
    shape.lineTo(x, z);
  }
  shape.closePath();
  return shape;
}

function buildZoneMesh(zone, baseHeight) {
  const pts = zone.points ?? ISLAND_OUTLINE;
  const shape = buildShape(pts);
  const thickness = zone.height - baseHeight;
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.006,
    bevelSegments: 3,
    curveSegments: 24,
  });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, baseHeight, 0);
  const topMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(zone.color) });
  const sideMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(zone.sideColor) });
  return new THREE.Mesh(geo, [sideMat, topMat]);
}

function buildOceanDisc() {
  const geo = new THREE.CylinderGeometry(1.5, 1.5, 0.04, 72);
  const mat = new THREE.MeshLambertMaterial({ color: SCENE_COLORS.ocean });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = -0.02;
  return mesh;
}

function buildRings() {
  const group = new THREE.Group();
  OCEAN_RINGS.forEach((r, i) => {
    const geo = new THREE.RingGeometry(r - 0.01, r + 0.01, 72);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc, transparent: true,
      opacity: 0.25 - i * 0.06, side: THREE.DoubleSide,
    });
    group.add(new THREE.Mesh(geo, mat));
  });
  return group;
}

function Map() {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const islandGroupRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ down: false, x: 0, y: 0 });
  const rotRef = useRef({ x: 0.38, y: -0.3 });
  const velRef = useRef({ x: 0, y: 0 });
  const [activePoi, setActivePoi] = useState(null);
  const [projectedPois, setProjectedPois] = useState([]);

  const projectPois = useCallback(() => {
    if (!cameraRef.current || !mountRef.current || !islandGroupRef.current) return;
    const el = mountRef.current;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const cam = cameraRef.current;
    const projected = POIS.map((poi) => {
      const [x, z] = normToXZ(poi.nx, poi.ny);
      const vec = new THREE.Vector3(x, 0.1, -z);
      vec.applyEuler(islandGroupRef.current.rotation);
      vec.project(cam);
      return { ...poi, sx: ((vec.x + 1) / 2) * w, sy: ((-vec.y + 1) / 2) * h, behind: vec.z > 1 };
    });
    setProjectedPois(projected);
  }, []);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xdbeafe, 0.12);

    const cam = new THREE.PerspectiveCamera(CAMERA.fov, el.clientWidth / el.clientHeight, CAMERA.near, CAMERA.far);
    cam.position.set(...CAMERA.position);
    cam.lookAt(...CAMERA.target);
    cameraRef.current = cam;

    scene.add(new THREE.AmbientLight(LIGHTS.ambient.color, LIGHTS.ambient.intensity));
    const sun = new THREE.DirectionalLight(LIGHTS.sun.color, LIGHTS.sun.intensity);
    sun.position.set(...LIGHTS.sun.position);
    sun.castShadow = true;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(LIGHTS.fill.color, LIGHTS.fill.intensity);
    fill.position.set(...LIGHTS.fill.position);
    scene.add(fill);

    scene.add(buildOceanDisc());
    scene.add(buildRings());

    const islandGroup = new THREE.Group();
    islandGroupRef.current = islandGroup;
    let prevHeight = 0;
    ELEVATION_ZONES.forEach((zone) => {
      const mesh = buildZoneMesh(zone, prevHeight);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      islandGroup.add(mesh);
      prevHeight = zone.height;
    });
    islandGroup.rotation.x = rotRef.current.x;
    islandGroup.rotation.y = rotRef.current.y;
    scene.add(islandGroup);

    let lastTime = performance.now();
    const animate = (now) => {
      frameRef.current = requestAnimationFrame(animate);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (!pointerRef.current.down) {
        velRef.current.y *= 0.92;
        velRef.current.x *= 0.92;
        rotRef.current.y += velRef.current.y * dt;
        rotRef.current.x += velRef.current.x * dt;
        rotRef.current.x = Math.max(-0.1, Math.min(1.0, rotRef.current.x));
      }
      islandGroup.rotation.y = rotRef.current.y;
      islandGroup.rotation.x = rotRef.current.x;
      projectPois();
      renderer.render(scene, cam);
    };
    frameRef.current = requestAnimationFrame(animate);

    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [projectPois]);

  const onPointerDown = (e) => { pointerRef.current = { down: true, x: e.clientX, y: e.clientY }; };
  const onPointerMove = (e) => {
    if (!pointerRef.current.down) return;
    const dx = e.clientX - pointerRef.current.x;
    const dy = e.clientY - pointerRef.current.y;
    velRef.current.y = dx * 0.015;
    velRef.current.x = dy * 0.010;
    rotRef.current.y += dx * 0.008;
    rotRef.current.x = Math.max(-0.1, Math.min(1.0, rotRef.current.x + dy * 0.006));
    pointerRef.current = { down: true, x: e.clientX, y: e.clientY };
  };
  const onPointerUp = () => { pointerRef.current.down = false; };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-sky-100">
      <div
        ref={mountRef}
        className="h-full w-full"
        style={{ cursor: 'grab', touchAction: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      />

      {projectedPois.filter((p) => !p.behind).map((poi) => (
        <button
          key={poi.id}
          onClick={() => setActivePoi(activePoi?.id === poi.id ? null : poi)}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
          style={{ left: poi.sx, top: poi.sy }}
          aria-label={poi.label}
        >
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-sm shadow-md"
            style={{ backgroundColor: POI_TYPE_COLORS[poi.type] ?? '#f59e0b' }}
          >
            {poi.emoji}
          </span>
        </button>
      ))}

      {activePoi && (
        <div
          className="absolute left-4 top-4 z-30 max-w-[190px] rounded-2xl border-2 border-white/80 bg-white/90 p-3 shadow-2xl backdrop-blur-md"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          <div className="text-xl">{activePoi.emoji}</div>
          <div className="mt-1 text-sm font-black text-gray-800">{activePoi.label}</div>
          <div className="mt-0.5 text-xs text-gray-500">{activePoi.description}</div>
          <button onClick={() => setActivePoi(null)} className="mt-2 text-xs text-gray-400 underline hover:text-gray-700">
            Fermer
          </button>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/20 px-3 py-1 text-xs text-white backdrop-blur-sm">
        🖱️ Glissez pour faire tourner
      </div>

      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm">
        <span className="text-lg">🧭</span>
      </div>
    </div>
  );
}

export default Map;