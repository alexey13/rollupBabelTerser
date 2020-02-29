//Material
const material = new THREE.MeshPhysicalMaterial({
	color: new THREE.Color('#f3b0c2'),
	emissive: new THREE.Color('#f3b0c2'),
	emissiveIntensity: 0.35,
	metalness: 0.35,
	morphTargets: true,
	roughness: 0.5,
	clearcoat: 0,
	clearcoatRoughness: 0.1,
	reflectivity: 1,
	side: THREE.DoubleSide,
});