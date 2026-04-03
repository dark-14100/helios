export const AU_SCALE = 40
export const RADIUS_SCALE = 0.001
export const MOON_ORBIT_SCALE = 8

export interface MoonData {
  name: string
  radius: number          // scene units
  orbitRadius: number     // scene units from parent planet
  orbitPeriod: number     // days
  texturePath: string
}

export interface PlanetData {
  name: string
  radius: number          // scene units (exaggerated for visibility)
  semiMajorAxis: number   // scene units (log-scaled from AU)
  eccentricity: number
  orbitalPeriod: number   // days
  axialTilt: number       // degrees
  texturePath: string
  color: number           // fallback hex if texture missing
  moons: MoonData[]
  hasRings?: boolean
  ringTexturePath?: string
  nightTexturePath?: string
}

export const planets: PlanetData[] = [
  {
    name: 'Helios',
    radius: 6.0,
    semiMajorAxis: 0,
    eccentricity: 0,
    orbitalPeriod: 1, // Prevent division by 0
    axialTilt: 7.25,
    texturePath: '/textures/sun.jpg', // Missing texture falls back natively
    color: 0xffd700,
    moons: [],
    hasRings: false
  },
  {
    name: 'Mercury',
    radius: 0.4,
    semiMajorAxis: 8,
    eccentricity: 0.205,
    orbitalPeriod: 87.97,
    axialTilt: 0.03,
    texturePath: '/textures/mercury.jpg',
    color: 0x888888,
    moons: []
  },
  {
    name: 'Venus',
    radius: 0.9,
    semiMajorAxis: 14,
    eccentricity: 0.007,
    orbitalPeriod: 224.70,
    axialTilt: 177.4,
    texturePath: '/textures/venus.jpg',
    color: 0xe3bb76,
    moons: []
  },
  {
    name: 'Earth',
    radius: 1.0,
    semiMajorAxis: 20,
    eccentricity: 0.017,
    orbitalPeriod: 365.25,
    axialTilt: 23.5,
    texturePath: '/textures/earth_day.jpg',
    nightTexturePath: '/textures/earth_night.jpg',
    color: 0x4fa3e0,
    moons: [
      {
        name: 'Luna',
        radius: 0.27,
        orbitRadius: 3.5,
        orbitPeriod: 27.3,
        texturePath: '/textures/moon.jpg'
      }
    ]
  },
  {
    name: 'Mars',
    radius: 0.55,
    semiMajorAxis: 28,
    eccentricity: 0.093,
    orbitalPeriod: 686.97,
    axialTilt: 25.2,
    texturePath: '/textures/mars.jpg',
    color: 0xc1440e,
    moons: [
      {
        name: 'Phobos',
        radius: 0.08,
        orbitRadius: 2.0,
        orbitPeriod: 0.32,
        texturePath: '/textures/moon.jpg'
      },
      {
        name: 'Deimos',
        radius: 0.05,
        orbitRadius: 2.8,
        orbitPeriod: 1.26,
        texturePath: '/textures/moon.jpg'
      }
    ]
  },
  {
    name: 'Jupiter',
    radius: 3.5,
    semiMajorAxis: 44,
    eccentricity: 0.049,
    orbitalPeriod: 4332.59,
    axialTilt: 3.1,
    texturePath: '/textures/jupiter.jpg',
    color: 0xd39c7e,
    moons: [
      {
        name: 'Io',
        radius: 0.12,
        orbitRadius: 6.0,
        orbitPeriod: 1.77,
        texturePath: '/textures/moon.jpg'
      },
      {
        name: 'Europa',
        radius: 0.11,
        orbitRadius: 8.0,
        orbitPeriod: 3.55,
        texturePath: '/textures/moon.jpg'
      },
      {
        name: 'Ganymede',
        radius: 0.18,
        orbitRadius: 10.5,
        orbitPeriod: 7.15,
        texturePath: '/textures/moon.jpg'
      },
      {
        name: 'Callisto',
        radius: 0.15,
        orbitRadius: 14.0,
        orbitPeriod: 16.69,
        texturePath: '/textures/moon.jpg'
      }
    ]
  },
  {
    name: 'Saturn',
    radius: 2.9,
    semiMajorAxis: 62,
    eccentricity: 0.057,
    orbitalPeriod: 10759.22,
    axialTilt: 26.7,
    texturePath: '/textures/saturn.jpg',
    color: 0xc5ab6e,
    hasRings: true,
    ringTexturePath: '/textures/saturn_ring.png',
    moons: [
      {
        name: 'Titan',
        radius: 0.18,
        orbitRadius: 8.0,
        orbitPeriod: 15.95,
        texturePath: '/textures/moon.jpg'
      },
      {
        name: 'Enceladus',
        radius: 0.08,
        orbitRadius: 5.5,
        orbitPeriod: 1.37,
        texturePath: '/textures/moon.jpg'
      }
    ]
  },
  {
    name: 'Uranus',
    radius: 1.8,
    semiMajorAxis: 78,
    eccentricity: 0.046,
    orbitalPeriod: 30688.50,
    axialTilt: 97.8,
    texturePath: '/textures/uranus.jpg',
    color: 0x0d5fb8,
    moons: [
      {
        name: 'Titania',
        radius: 0.1,
        orbitRadius: 6.0,
        orbitPeriod: 8.71,
        texturePath: '/textures/moon.jpg'
      },
      {
        name: 'Oberon',
        radius: 0.1,
        orbitRadius: 8.0,
        orbitPeriod: 13.46,
        texturePath: '/textures/moon.jpg'
      }
    ]
  },
  {
    name: 'Neptune',
    radius: 1.7,
    semiMajorAxis: 92,
    eccentricity: 0.010,
    orbitalPeriod: 60182.00,
    axialTilt: 28.3,
    texturePath: '/textures/neptune.jpg',
    color: 0x3e66f9,
    moons: [
      {
        name: 'Triton',
        radius: 0.12,
        orbitRadius: 5.5,
        orbitPeriod: 5.88,
        texturePath: '/textures/moon.jpg'
      }
    ]
  }
]
