import * as THREE from 'three'

export function createAsteroidBelt(scene: THREE.Scene, innerRadius: number, outerRadius: number, count: number) {
  const beltGroup = new THREE.Group()

  // Using a simple instanced mesh for performance
  const geometry = new THREE.DodecahedronGeometry(0.1, 0)
  const material = new THREE.MeshStandardMaterial({ 
    color: 0x888888,
    roughness: 0.8,
    metalness: 0.2
  })

  const instancedMesh = new THREE.InstancedMesh(geometry, material, count)
  
  const dummy = new THREE.Object3D()
  
  for (let i = 0; i < count; i++) {
    // Random angle
    const theta = Math.random() * Math.PI * 2
    // Random distance within belt
    const r = innerRadius + Math.random() * (outerRadius - innerRadius)
    
    const x = Math.cos(theta) * r
    const z = Math.sin(theta) * r
    const y = (Math.random() - 0.5) * 1.5 // Some vertical scatter

    dummy.position.set(x, y, z)
    
    // Random rotation
    dummy.rotation.x = Math.random() * Math.PI
    dummy.rotation.y = Math.random() * Math.PI
    dummy.rotation.z = Math.random() * Math.PI
    
    // Random scale
    const scale = 0.5 + Math.random() * 1.5
    dummy.scale.set(scale, scale, scale)
    
    dummy.updateMatrix()
    instancedMesh.setMatrixAt(i, dummy.matrix)
  }

  beltGroup.add(instancedMesh)
  scene.add(beltGroup)
  
  return beltGroup
}

export function createShootingStars(scene: THREE.Scene) {
  const shootingStarsGroup = new THREE.Group()
  const geometry = new THREE.BufferGeometry()
  
  const count = 5 // Few active shooting stars
  const positions = new Float32Array(count * 3)
  const velocities: THREE.Vector3[] = []
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 800
    positions[i * 3 + 1] = (Math.random() - 0.5) * 800
    positions[i * 3 + 2] = (Math.random() - 0.5) * 800
    
    velocities.push(new THREE.Vector3(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    ))
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const material = new THREE.PointsMaterial({ 
    color: 0xffffff,
    size: 2,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  })
  
  const points = new THREE.Points(geometry, material)
  shootingStarsGroup.add(points)
  scene.add(shootingStarsGroup)
  
  const animate = (delta: number) => {
    const posAttribute = geometry.getAttribute('position')
    
    for (let i = 0; i < count; i++) {
      let x = posAttribute.getX(i)
      let y = posAttribute.getY(i)
      let z = posAttribute.getZ(i)
      
      const vel = velocities[i]
      x += vel.x * delta
      y += vel.y * delta
      z += vel.z * delta
      
      // Reset if too far
      if (Math.abs(x) > 600 || Math.abs(y) > 600 || Math.abs(z) > 600) {
        x = (Math.random() - 0.5) * 800
        y = (Math.random() - 0.5) * 800
        z = (Math.random() - 0.5) * 800
      }
      
      posAttribute.setXYZ(i, x, y, z)
    }
    posAttribute.needsUpdate = true
  }
  
  return { group: shootingStarsGroup, animate }
}
