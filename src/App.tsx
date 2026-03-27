/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Brain, Cpu, Zap, Activity, ChevronDown, Rocket, Atom, Dna, Layers, ArrowRight, Image as ImageIcon, X, Terminal, Shield, Database } from 'lucide-react';

const TOPICS = [
  {
    id: 'quantum',
    title: 'Quantum Computing',
    icon: <Atom />,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    desc: 'Exploring the sub-atomic realm where bits become qubits, unlocking infinite computational possibilities.',
    color: 'from-cyan-500/20 to-blue-500/20',
    details: {
      intro: "Quantum computing represents a paradigm shift in how we process information. Unlike classical bits that are either 0 or 1, qubits exist in a state of superposition, allowing for massive parallel calculations. This technology is poised to revolutionize cryptography, material science, and complex system modeling.",
      data: [
        { label: "Processing Power", value: "10^15 FLOPS" },
        { label: "Coherence Time", value: "100ms" },
        { label: "Error Rate", value: "0.001%" },
        { label: "Qubit Count", value: "1,121" },
        { label: "Temp Requirement", value: "15 mK" }
      ],
      vision: "By 2030, quantum supremacy will enable us to solve molecular simulations that would take classical supercomputers millions of years, leading to breakthroughs in carbon capture and life-saving medications."
    }
  },
  {
    id: 'agi',
    title: 'AGI Development',
    icon: <Brain />,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    desc: 'The quest for Artificial General Intelligence: machines that can learn, reason, and create like humans.',
    color: 'from-amber-500/20 to-orange-500/20',
    details: {
      intro: "Artificial General Intelligence (AGI) is the hypothetical intelligence of a machine that has the capacity to understand or learn any intellectual task that a human being can. It is the 'Holy Grail' of AI research, promising a future where machines can solve humanity's most complex problems autonomously.",
      data: [
        { label: "Parameter Count", value: "100T+" },
        { label: "Reasoning Score", value: "98.5%" },
        { label: "Learning Rate", value: "Exponential" },
        { label: "Context Window", value: "10M Tokens" },
        { label: "Energy Efficiency", value: "85%" }
      ],
      vision: "AGI will act as a global co-pilot for humanity, accelerating scientific discovery by centuries and managing global resources with perfect efficiency and zero bias."
    }
  },
  {
    id: 'bio',
    title: 'Bio-Digital Integration',
    icon: <Dna />,
    image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=800',
    desc: 'Merging biological systems with silicon architecture to redefine what it means to be human.',
    color: 'from-emerald-500/20 to-teal-500/20',
    details: {
      intro: "The boundary between biology and technology is dissolving. Neural-link interfaces and synthetic biology are creating a new hybrid existence where digital memory and biological intuition coexist. This integration allows for direct brain-to-computer communication and the repair of biological functions through digital overrides.",
      data: [
        { label: "Neural Bandwidth", value: "1 Gbps" },
        { label: "Synapse Latency", value: "1.2ms" },
        { label: "Integration Level", value: "Level 4" },
        { label: "Biocompatibility", value: "99.9%" },
        { label: "Power Draw", value: "50mW" }
      ],
      vision: "A future where human consciousness can be augmented with real-time digital knowledge, effectively eliminating the learning curve for complex skills and allowing for the digital preservation of memories."
    }
  },
  {
    id: 'neural',
    title: 'Neural Interfaces',
    icon: <Activity />,
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    desc: 'Direct brain-computer links enabling seamless thought-to-action control and sensory augmentation.',
    color: 'from-blue-500/20 to-indigo-500/20',
    details: {
      intro: "Neural interfaces are the ultimate bridge between the mind and the machine. By capturing and interpreting neural signals, these systems allow users to control digital environments and physical prosthetics with thought alone, while also providing sensory feedback directly to the brain.",
      data: [
        { label: "Signal Fidelity", value: "99.2%" },
        { label: "Channel Count", value: "16,384" },
        { label: "Feedback Lag", value: "5ms" },
        { label: "Battery Life", value: "72 Hours" },
        { label: "Safety Rating", value: "Grade A" }
      ],
      vision: "Imagine a world where language barriers are non-existent because we can share thoughts and emotions directly, and where physical disabilities are completely overcome through advanced neural-controlled robotics."
    }
  },
  {
    id: 'space',
    title: 'Deep Space Exploration',
    icon: <Rocket />,
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    desc: 'Autonomous AI fleets charting the unknown reaches of our galaxy and beyond.',
    color: 'from-purple-500/20 to-indigo-500/20',
    details: {
      intro: "AI-driven spacecraft are the pioneers of the 21st century. These autonomous systems can make split-second decisions millions of miles away from Earth, navigating asteroid belts and charting exoplanets without human intervention, paving the way for interstellar travel.",
      data: [
        { label: "Fleet Autonomy", value: "99.9%" },
        { label: "Signal Delay", value: "22 mins" },
        { label: "Discovery Rate", value: "3 planets/day" },
        { label: "Max Velocity", value: "0.1c" },
        { label: "Mission Duration", value: "50+ Years" }
      ],
      vision: "Establishing the first autonomous mining colonies on the Jovian moons, managed entirely by decentralized AI networks, providing Earth with limitless resources for the next millennium."
    }
  },
  {
    id: 'meta',
    title: 'Metaverse Architecture',
    icon: <Layers />,
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
    desc: 'Designing the virtual landscapes and digital cities where the next generation will thrive.',
    color: 'from-pink-500/20 to-rose-500/20',
    details: {
      intro: "The Metaverse is more than a game; it's a parallel social and economic reality. Architects are now building physics-defying structures that host global communities in persistent digital realms, where ownership is verified by blockchain and creativity is the only limit.",
      data: [
        { label: "Concurrent Users", value: "500M+" },
        { label: "Economy Size", value: "$2.4T" },
        { label: "Render Latency", value: "8ms" },
        { label: "Asset Interop", value: "Full" },
        { label: "Spatial Audio", value: "3D Object" }
      ],
      vision: "Creating hyper-realistic digital twins of Earth's most endangered ecosystems, allowing for virtual conservation, global education, and a sustainable way for humanity to explore the beauty of our world."
    }
  }
];

const GALLERY = [
  'https://picsum.photos/seed/tech1/600/800',
  'https://picsum.photos/seed/tech2/800/600',
  'https://picsum.photos/seed/tech3/600/600',
  'https://picsum.photos/seed/tech4/800/800',
  'https://picsum.photos/seed/tech5/600/800',
  'https://picsum.photos/seed/tech6/800/600'
];

const PLANETS = [
  { 
    name: "Mercury", 
    desc: "The smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth's Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",
    stats: { distance: "57.9M km", temp: "167°C", gravity: "3.7 m/s²" }
  },
  { 
    name: "Venus", 
    desc: "Spinning slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Venus_from_Mariner_10.jpg",
    stats: { distance: "108.2M km", temp: "464°C", gravity: "8.87 m/s²" }
  },
  { 
    name: "Earth", 
    desc: "Our home planet is the only place we know of so far that’s inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
    stats: { distance: "149.6M km", temp: "15°C", gravity: "9.8 m/s²" }
  },
  { 
    name: "Mars", 
    desc: "A dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    stats: { distance: "227.9M km", temp: "-65°C", gravity: "3.71 m/s²" }
  },
  { 
    name: "Jupiter", 
    desc: "More than twice as massive as the other planets of our solar system combined. The giant planet's Great Red Spot is a centuries-old storm bigger than Earth.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
    stats: { distance: "778.5M km", temp: "-110°C", gravity: "24.79 m/s²" }
  },
  { 
    name: "Saturn", 
    desc: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
    stats: { distance: "1.4B km", temp: "-140°C", gravity: "10.44 m/s²" }
  },
  { 
    name: "Uranus", 
    desc: "Uranus—seventh planet from the Sun—rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",
    stats: { distance: "2.9B km", temp: "-195°C", gravity: "8.69 m/s²" }
  },
  { 
    name: "Neptune", 
    desc: "The eighth and most distant major planet orbiting our Sun—is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg",
    stats: { distance: "4.5B km", temp: "-201°C", gravity: "11.15 m/s²" }
  },
  { 
    name: "Proxima b", 
    desc: "A super-Earth exoplanet that orbits an M-type star. Its mass is 1.07 Earths, it takes 11.2 days to complete one orbit of its star, and is 0.04856 AU from its star.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Artist%27s_impression_of_Proxima_Centauri_b_around_the_red_dwarf_star_Proxima_Centauri.jpg/1200px-Artist%27s_impression_of_Proxima_Centauri_b_around_the_red_dwarf_star_Proxima_Centauri.jpg",
    stats: { distance: "4.2 Light Years", temp: "-39°C", gravity: "1.1g" }
  },
  { 
    name: "Kepler-186f", 
    desc: "The first Earth-size planet discovered in the 'Goldilocks zone' of another star. It orbits a star much cooler and redder than our Sun.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Kepler-186f_artist_concept.jpg/1200px-Kepler-186f_artist_concept.jpg",
    stats: { distance: "582 Light Years", temp: "-85°C", gravity: "Unknown" }
  }
];

const PlanetScrollItem = ({ planet, index }: { planet: typeof PLANETS[0], index: number }) => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity, scale, willChange: "transform, opacity" }}
      className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 py-32 min-h-[80vh] relative`}
    >
      {/* 3D Planet Sphere */}
      <motion.div 
        style={{ y, willChange: "transform" }}
        className="relative w-64 h-64 md:w-[450px] md:h-[450px] flex-shrink-0"
      >
        {/* Glow Effect */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[#00f2ff]/20 rounded-full blur-[100px]" 
        />
        
        {/* The Sphere */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,242,255,0.1)] group"
        >
          {/* Texture Layer - Animates background position to simulate rotation */}
          <motion.div 
            style={{ 
              rotate,
              backgroundImage: `url(${planet.image})`,
              backgroundSize: '200% 100%',
              willChange: "transform"
            }}
            className="absolute inset-0 bg-cover bg-center grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
          />
          
          {/* 3D Shading Overlay (Radial Gradient) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_transparent_0%,_rgba(0,0,0,0.8)_100%)] pointer-events-none" />
          
          {/* Atmospheric Rim Light */}
          <div className="absolute inset-0 rounded-full border-2 border-white/10 pointer-events-none" />
        </motion.div>

        {/* Orbit Ring */}
        <div className="absolute inset-[-20%] border border-white/5 rounded-full rotate-45 pointer-events-none" />
      </motion.div>

      {/* Planet Info */}
      <div className="flex-1 space-y-8 text-center lg:text-left">
        <motion.div
          initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ willChange: "transform, opacity" }}
        >
          <span className="text-[#00f2ff] font-mono text-sm tracking-[0.5em] uppercase mb-4 block">Celestial Body 0{index + 1}</span>
          <h3 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-glow">{planet.name}</h3>
          <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-2xl mb-12">
            {planet.desc}
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0">
            {Object.entries(planet.stats).map(([key, value]) => (
              <div key={key} className="glass-panel p-4 rounded-2xl border-white/5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">{key}</div>
                <div className="text-lg font-bold text-[#00f2ff]">{value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const CIVILIZATIONS = [
  { 
    type: "Type I", 
    title: "Planetary Civilization", 
    desc: "Harnesses the total energy output of its home planet. Controls weather, earthquakes, and volcanoes.",
    tech: ["Global Fusion Grid", "Weather Control Satellites", "Oceanic Cities", "Planetary Internet"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    details: "A Type I civilization has achieved complete mastery over its home planet's energy resources. This includes the ability to manipulate planetary weather patterns, harvest energy from the core, and build vast subterranean or oceanic megacities. They are truly a global species, with unified communication and energy networks."
  },
  { 
    type: "Type II", 
    title: "Stellar Civilization", 
    desc: "Harnesses the total energy output of its home star. Capable of building megastructures like Dyson Spheres.",
    tech: ["Dyson Swarms", "Star Lifting", "Interstellar Beacons", "Antimatter Propulsion"],
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200",
    details: "A Type II civilization has outgrown its home planet and now looks to its parent star for power. By constructing Dyson Spheres or Swarms, they can capture nearly 100% of a star's luminosity. This level of energy allows for near-light-speed travel, the engineering of entire solar systems, and the beginning of interstellar colonization."
  },
  { 
    type: "Type III", 
    title: "Galactic Civilization", 
    desc: "Harnesses the total energy output of its entire home galaxy. Controls the fabric of space-time.",
    tech: ["Wormhole Networks", "Galactic Computing", "Star System Engineering", "Quantum Teleportation"],
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1200",
    details: "A Type III civilization is a true master of the cosmos. They have colonized their entire home galaxy and can harness the energy of billions of stars. They possess the technology to manipulate space-time itself, creating stable wormholes for instantaneous travel and building galaxy-sized computing networks that can simulate entire universes."
  }
];

export default function App() {
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<typeof TOPICS[0] | null>(null);
  const [showSpecs, setShowSpecs] = useState(false);
  const [isFutureWorld, setIsFutureWorld] = useState(false);
  const [isTraveling, setIsTraveling] = useState(false);
  const [selectedCiv, setSelectedCiv] = useState<typeof CIVILIZATIONS[0] | null>(null);

  const startTimeTravel = () => {
    setIsTraveling(true);
    setTimeout(() => {
      setIsFutureWorld(true);
      setIsTraveling(false);
      window.scrollTo(0, 0);
    }, 3000);
  };

  const scrollToNexus = () => {
    document.getElementById('nexus-frontiers')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isFutureWorld) {
    return (
      <div className="relative w-full min-h-screen custom-scrollbar overflow-x-hidden bg-[#020205] text-white selection:bg-[#00f2ff] selection:text-black">
        {/* Future World Background */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0a0a2a] via-[#020205] to-[#000]" />
          <div className="starfield" />
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'radial-gradient(#00f2ff 0.5px, transparent 0.5px)', 
            backgroundSize: '80px 80px' 
          }} />
        </div>

        <div className="relative z-10 flex flex-col items-center w-full px-6">
          {/* Future Nav */}
          <header className="w-full max-w-7xl py-8 flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => setIsFutureWorld(false)}
            >
              <div className="p-2 bg-[#00f2ff]/10 rounded-lg border border-[#00f2ff]/20 group-hover:border-[#00f2ff]/50 transition-all">
                <Rocket className="text-[#00f2ff]" size={28} />
              </div>
              <span className="text-xl font-bold tracking-tighter uppercase font-mono text-glow">Future Nexus</span>
            </motion.div>
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsFutureWorld(false)}
              className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 hover:text-[#00f2ff] transition-colors flex items-center gap-2"
            >
              <ArrowRight size={14} className="rotate-180" />
              Return to Present
            </motion.button>
          </header>

          {/* Future Hero */}
          <section className="py-40 text-center max-w-5xl relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative z-10"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mb-12"
              >
                <div className="w-32 h-32 rounded-full border-2 border-[#00f2ff]/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-2 border-[#00f2ff]/40 border-dashed animate-[spin_20s_linear_infinite]" />
                  <Rocket className="text-[#00f2ff]" size={48} />
                </div>
              </motion.div>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/10">
                THE SOLAR <br /> <span className="text-[#00f2ff] text-glow">FRONTIER</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-3xl mx-auto">
                Welcome to the year 3026. Humanity has transcended its planetary cradle, 
                becoming a multi-stellar species. Explore the legacy of our origins.
              </p>
            </motion.div>
            
            {/* Floating Elements for Immersive Feel */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, Math.random() * 100 - 50, 0],
                    x: [0, Math.random() * 100 - 50, 0],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 10 + Math.random() * 10, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute w-24 h-24 bg-[#00f2ff]/5 rounded-full blur-3xl"
                  style={{ 
                    left: `${Math.random() * 100}%`, 
                    top: `${Math.random() * 100}%` 
                  }}
                />
              ))}
            </div>
          </section>

          {/* Solar System Journey */}
          <section className="w-full max-w-7xl py-32 relative">
            <div className="absolute -left-40 top-1/2 w-80 h-80 bg-[#00f2ff]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="text-center mb-32">
              <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-[#00f2ff] mb-6">Celestial Archive</h2>
              <h3 className="text-6xl md:text-7xl font-bold tracking-tight">Journey Through the Void</h3>
            </div>
            
            <div className="space-y-40">
              {PLANETS.map((planet, i) => (
                <PlanetScrollItem key={planet.name} planet={planet} index={i} />
              ))}
            </div>
          </section>

          {/* Civilization Types */}
          <section className="w-full max-w-7xl py-40 border-t border-white/5 relative">
            <div className="absolute -right-40 top-1/2 w-80 h-80 bg-[#00f2ff]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="text-center mb-32">
              <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-[#00f2ff] mb-6">The Kardashev Scale</h2>
              <h3 className="text-6xl md:text-7xl font-bold tracking-tight">Evolution of Intelligence</h3>
            </div>

            <div className="space-y-24">
              {CIVILIZATIONS.map((civ, i) => (
                <motion.div
                  key={civ.type}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  onClick={() => setSelectedCiv(civ)}
                  className="glass-panel p-12 md:p-20 rounded-[60px] relative overflow-hidden group flex flex-col lg:flex-row gap-12 items-center cursor-pointer hover:border-[#00f2ff]/30 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00f2ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-0 right-0 p-12 text-[12rem] font-black text-white/[0.03] font-mono select-none pointer-events-none group-hover:text-[#00f2ff]/5 transition-all">
                    {civ.type.split(' ')[1]}
                  </div>
                  <div className="lg:w-1/2 relative z-10">
                    <span className="text-[#00f2ff] font-mono text-sm mb-6 block tracking-[0.3em] uppercase">{civ.type}</span>
                    <h4 className="text-5xl font-bold mb-8 tracking-tight group-hover:text-glow transition-all">{civ.title}</h4>
                    <p className="text-xl text-white/50 mb-10 font-light leading-relaxed">{civ.desc}</p>
                    <div className="flex items-center gap-2 text-[#00f2ff] text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                      Access Archive <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                    {civ.tech.map((t, j) => (
                      <motion.div 
                        key={t}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + j * 0.1 }}
                        className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10 text-xs font-mono tracking-widest hover:bg-[#00f2ff]/10 hover:border-[#00f2ff]/30 transition-all"
                      >
                        {t}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Future Tech Adaptation */}
          <section className="w-full max-w-6xl py-40 text-center relative">
            <div className="absolute inset-0 bg-[#00f2ff]/5 blur-[150px] rounded-full pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-12 md:p-24 rounded-[60px] md:rounded-[80px] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f2ff]/50 to-transparent" />
              <h3 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Technological Adaptation</h3>
              <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-16 max-w-3xl mx-auto">
                Technology now evolves with us. Neural-adaptive systems and programmable matter 
                reshape our world based on human intent and environmental harmony.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
                {[
                  { icon: <Atom size={28} />, title: "Molecular Assembly", desc: "Matter synthesized from atmospheric carbon and pure energy." },
                  { icon: <Brain size={28} />, title: "Collective Mind", desc: "Instantaneous global problem solving via shared neural networks." },
                  { icon: <Layers size={28} />, title: "Reality Folding", desc: "Manipulating local gravity to bridge physical distances." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="space-y-4 group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#00f2ff]/10 flex items-center justify-center text-[#00f2ff] group-hover:scale-110 transition-transform border border-[#00f2ff]/20">
                      {item.icon}
                    </div>
                    <h5 className="text-xl font-bold tracking-tight">{item.title}</h5>
                    <p className="text-sm text-white/40 font-light leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <footer className="w-full py-20 border-t border-white/5 text-center">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4 text-white/20 text-[10px] font-mono uppercase tracking-[0.5em]">
                <Rocket size={16} />
                <span>Neural Nexus // Future Division // Year 3026</span>
              </div>
              <p className="text-white/10 text-[8px] font-mono uppercase tracking-[1em]">Humanity Transcended</p>
            </div>
          </footer>
        </div>

        {/* Civilization Detail Modal */}
        <AnimatePresence>
          {selectedCiv && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/95 backdrop-blur-md" 
                onClick={() => setSelectedCiv(null)} 
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-6xl max-h-[90vh] glass-panel rounded-[60px] overflow-hidden flex flex-col md:flex-row z-10"
              >
                <button 
                  onClick={() => setSelectedCiv(null)}
                  className="absolute top-10 right-10 z-20 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10"
                >
                  <X size={24} />
                </button>

                <div className="w-full md:w-1/2 h-80 md:h-auto relative overflow-hidden">
                  <motion.img 
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={selectedCiv.image} 
                    alt={selectedCiv.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#020205]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020205] md:hidden" />
                </div>

                <div className="flex-1 p-10 md:p-20 overflow-y-auto custom-scrollbar bg-[#020205]/60">
                  <div className="mb-12">
                    <span className="text-[#00f2ff] font-mono text-sm tracking-[0.5em] uppercase mb-4 block">{selectedCiv.type} Protocol</span>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">{selectedCiv.title}</h2>
                    <div className="w-20 h-1 bg-[#00f2ff] rounded-full" />
                  </div>

                  <div className="space-y-12">
                    <div>
                      <h5 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/30 mb-6">Archive Description</h5>
                      <p className="text-2xl text-white/80 leading-relaxed font-light">
                        {selectedCiv.details}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/30 mb-6">Technological Milestones</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedCiv.tech.map((t, i) => (
                          <div key={i} className="p-6 glass-panel rounded-3xl border-white/5 flex items-center gap-4">
                            <div className="w-2 h-2 bg-[#00f2ff] rounded-full shadow-[0_0_10px_#00f2ff]" />
                            <span className="text-sm font-mono tracking-widest text-white/60">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedCiv(null)}
                      className="w-full py-8 bg-[#00f2ff] text-black font-black text-lg uppercase tracking-widest rounded-[32px] hover:shadow-[0_0_60px_rgba(0,242,255,0.5)] transition-all"
                    >
                      Close Archive
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen custom-scrollbar overflow-x-hidden">
      {/* Time Travel Animation */}
      <AnimatePresence>
        {isTraveling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0">
              {[...Array(60)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    scale: 0, 
                    x: 0, 
                    y: 0, 
                    opacity: 0 
                  }}
                  animate={{ 
                    scale: [0, 1, 0], 
                    x: (Math.random() - 0.5) * window.innerWidth * 2, 
                    y: (Math.random() - 0.5) * window.innerHeight * 2,
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 1 + Math.random() * 2, 
                    repeat: Infinity, 
                    delay: Math.random() * 2,
                    ease: "easeIn"
                  }}
                  className="time-warp-line"
                  style={{ 
                    left: "50%", 
                    top: "50%",
                    transform: `rotate(${Math.random() * 360}deg)`,
                    willChange: "transform, opacity"
                  }}
                />
              ))}
            </div>
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-[#00f2ff] font-mono text-2xl md:text-4xl tracking-[1em] uppercase text-glow mb-8"
              >
                Time Warp Initiated
              </motion.div>
              <div className="h-1 w-64 md:w-96 bg-white/10 rounded-full overflow-hidden mx-auto border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-[#00f2ff]/20 via-[#00f2ff] to-[#00f2ff]/20 shadow-[0_0_20px_#00f2ff]"
                />
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-white/40 font-mono text-[10px] uppercase tracking-[0.5em]"
              >
                Recalibrating Spacetime Coordinates...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* High-Performance CSS Background */}
      <div className="canvas-container" style={{ background: 'radial-gradient(circle at 50% 50%, #0a0a1a 0%, #020205 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(#00f2ff 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} />
      </div>

      {/* Overlay UI */}
      <div className="relative z-10 flex flex-col items-center w-full min-h-screen px-6">
        
        {/* Navigation */}
        <header className="w-full max-w-7xl py-8 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="p-2 bg-[#00f2ff]/10 rounded-lg border border-[#00f2ff]/20">
              <Brain className="text-[#00f2ff]" size={28} />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase font-mono text-glow">Neural Nexus</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex gap-10 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40"
          >
            <button onClick={scrollToNexus} className="hover:text-[#00f2ff] transition-colors relative group">
              Exploration
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00f2ff] transition-all group-hover:w-full" />
            </button>
            <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#00f2ff] transition-colors relative group">
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00f2ff] transition-all group-hover:w-full" />
            </button>
            <button onClick={() => setShowSpecs(true)} className="hover:text-[#00f2ff] transition-colors relative group">
              Nexus Core
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00f2ff] transition-all group-hover:w-full" />
            </button>
          </motion.div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl pt-32 pb-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 glass-panel rounded-full mb-8 border-[#00f2ff]/20">
              <span className="w-2 h-2 bg-[#00f2ff] rounded-full animate-pulse shadow-[0_0_10px_#00f2ff]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#00f2ff]">System Online: Nexus v2.0</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-10 leading-[0.9] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/10 relative">
              BEYOND THE <br /> <span>DIGITAL VEIL</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
              Witness the convergence of human creativity and machine intelligence. 
              A multi-dimensional exploration of the technologies shaping our tomorrow.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={scrollToNexus}
                className="group px-10 py-5 bg-[#00f2ff] text-black font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,242,255,0.4)] flex items-center gap-3"
              >
                Enter the Nexus
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={startTimeTravel}
                className="group px-10 py-5 glass-panel rounded-full font-bold hover:bg-white/10 transition-all border-white/10 flex items-center gap-3"
              >
                Sail to Future World
                <Rocket size={20} className="group-hover:-translate-y-1 transition-transform" />
              </button>
              <button 
                onClick={() => setShowSpecs(true)}
                className="px-10 py-5 glass-panel rounded-full font-bold hover:bg-white/10 transition-all border-white/10"
              >
                System Specs
              </button>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="mt-32 text-white/10"
          >
            <ChevronDown size={40} strokeWidth={1} />
          </motion.div>
        </main>

        {/* Topics Section */}
        <section id="nexus-frontiers" className="w-full max-w-7xl py-40">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-[#00f2ff] mb-6 text-glow">Exploration Modules</h2>
              <h3 className="text-5xl md:text-6xl font-bold tracking-tight">Trending Frontiers</h3>
            </div>
            <p className="text-white/30 max-w-sm text-right font-light">
              Dive into the specific domains where innovation is accelerating at an exponential rate. Click to explore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TOPICS.map((topic, i) => (
              <motion.div 
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedTopic(topic)}
                onMouseEnter={() => setHoveredTopic(topic.id)}
                onMouseLeave={() => setHoveredTopic(null)}
                className="group relative glass-panel rounded-[40px] overflow-hidden p-1 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="relative h-[400px] rounded-[38px] overflow-hidden">
                  <motion.img 
                    src={topic.image} 
                    alt={topic.title}
                    animate={{ scale: hoveredTopic === topic.id ? 1.1 : 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/40 to-transparent p-10 flex flex-col justify-end">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-white/10 rounded-2xl border border-white/10 text-[#00f2ff]">
                        {topic.icon}
                      </div>
                      <h4 className="text-3xl font-bold">{topic.title}</h4>
                    </div>
                    <p className="text-white/60 leading-relaxed max-w-md group-hover:text-white transition-colors duration-500">
                      {topic.desc}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-[#00f2ff] text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore Module <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Visual Gallery Section */}
        <section id="gallery" className="w-full max-w-7xl py-40 border-t border-white/5">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 text-[#00f2ff] mb-6">
              <ImageIcon size={20} />
              <span className="text-xs font-mono uppercase tracking-[0.5em]">Visual Archive</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter">Nexus Gallery</h3>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {GALLERY.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className="glass-panel rounded-3xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={img} 
                  alt={`Gallery ${i}`}
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full max-w-4xl py-40 border-t border-white/5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-12 md:p-16 rounded-[60px] relative overflow-hidden"
          >
            <h4 className="text-xs font-mono uppercase tracking-[0.5em] text-[#00f2ff] mb-6 text-glow">Connect with the Nexus</h4>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">For any query or idea suggestion</h3>
            <p className="text-white/50 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              We are always looking for new frontiers to explore. Reach out through our social channels to collaborate or share your vision.
            </p>
            <div className="flex justify-center gap-8">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 transition-all hover:scale-110"
              >
                <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center text-white group-hover:text-[#00f2ff] group-hover:border-[#00f2ff]/50 transition-all">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">Facebook</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 transition-all hover:scale-110"
              >
                <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center text-white group-hover:text-[#00f2ff] group-hover:border-[#00f2ff]/50 transition-all">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">Instagram</span>
              </a>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="w-full py-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-white/20 text-[10px] font-mono uppercase tracking-[0.5em]">
          <div className="flex items-center gap-4">
            <Brain size={16} />
            <span>Neural Nexus v2.1.0 // Protocol: Secure</span>
          </div>
          <span>© 2026 Prince Pattanayek // All Rights Reserved</span>
          <div className="flex gap-10">
            <button className="hover:text-[#00f2ff] transition-colors">Terminal</button>
            <button className="hover:text-[#00f2ff] transition-colors">Network</button>
            <button className="hover:text-[#00f2ff] transition-colors">Auth</button>
          </div>
        </footer>
      </div>

      {/* Topic Detail Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
              onClick={() => setSelectedTopic(null)} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 200
              }}
              className="relative w-full max-w-6xl max-h-[90vh] glass-panel rounded-[60px] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.8)] z-10"
            >
              {/* Back Button */}
              <button 
                onClick={() => setSelectedTopic(null)}
                className="absolute top-10 left-10 z-40 flex items-center gap-3 px-8 py-4 bg-black/80 hover:bg-[#00f2ff] hover:text-black rounded-full border border-[#00f2ff]/30 text-white transition-all group shadow-2xl"
              >
                <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold">Back to Nexus</span>
              </button>

              <button 
                onClick={() => setSelectedTopic(null)}
                className="absolute top-10 right-10 z-20 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-5/12 h-80 md:h-auto relative overflow-hidden">
                <motion.img 
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src={selectedTopic.image} 
                  alt={selectedTopic.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#020205]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020205] md:hidden" />
              </div>

              <div className="flex-1 p-10 md:p-20 overflow-y-auto custom-scrollbar bg-[#020205]/60">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex items-center gap-8 mb-16 mt-16 md:mt-0">
                    <motion.div 
                      initial={{ rotate: -10, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", delay: 0.3 }}
                      className="p-6 bg-[#00f2ff]/10 rounded-[32px] text-[#00f2ff] border border-[#00f2ff]/20 shadow-[0_0_30px_rgba(0,242,255,0.2)]"
                    >
                      {selectedTopic.icon}
                    </motion.div>
                    <div>
                      <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-3">{selectedTopic.title}</h2>
                      <div className="flex items-center gap-4">
                        <span className="w-3 h-3 bg-[#00f2ff] rounded-full animate-pulse shadow-[0_0_10px_#00f2ff]" />
                        <span className="text-sm font-mono uppercase tracking-[0.3em] text-[#00f2ff]/60">Nexus Module // {selectedTopic.id.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-16">
                    <div className="relative">
                      <div className="absolute -left-10 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00f2ff] to-transparent opacity-30" />
                      <h5 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/30 mb-8 flex items-center gap-4">
                        <Terminal size={16} className="text-[#00f2ff]" /> 01. Contextual Overview
                      </h5>
                      <p className="text-2xl text-white/80 leading-relaxed font-light">
                        {selectedTopic.details.intro}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/30 mb-8 flex items-center gap-4">
                        <Database size={16} className="text-[#00f2ff]" /> 02. Core Metrics
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {selectedTopic.details.data.map((item, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="p-8 glass-panel rounded-[32px] border border-white/5 hover:border-[#00f2ff]/40 transition-all group relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00f2ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="text-xs font-mono uppercase tracking-widest text-white/20 block mb-3 group-hover:text-[#00f2ff]/50 transition-colors">{item.label}</span>
                            <span className="text-3xl font-bold text-[#00f2ff] group-hover:text-glow transition-all">{item.value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="p-10 rounded-[48px] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-8 text-white/5">
                        <Zap size={64} />
                      </div>
                      <h5 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/30 mb-8 flex items-center gap-4">
                        <Zap size={16} className="text-[#00f2ff]" /> 03. Strategic Horizon
                      </h5>
                      <p className="text-white/70 leading-relaxed italic font-light text-xl relative z-10">
                        "{selectedTopic.details.vision}"
                      </p>
                    </motion.div>

                    <button 
                      onClick={() => setSelectedTopic(null)}
                      className="w-full py-8 bg-[#00f2ff] text-black font-black text-lg uppercase tracking-widest rounded-[32px] hover:shadow-[0_0_60px_rgba(0,242,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4"
                    >
                      Terminate Session
                      <X size={24} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* System Specs Modal */}
      <AnimatePresence>
        {showSpecs && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/90" onClick={() => setShowSpecs(false)} />
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl glass-panel rounded-[40px] p-10 overflow-hidden"
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-3xl font-bold mb-2">System Specifications</h2>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#00f2ff]">Neural Nexus v2.1.0 // Core Diagnostics</p>
                </div>
                <button onClick={() => setShowSpecs(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {[
                  { icon: <Cpu size={18} />, label: "Processing Core", value: "Quantum-Silicon Hybrid // 128-Qubit" },
                  { icon: <Database size={18} />, label: "Neural Memory", value: "4.2 Petabytes // Holographic Storage" },
                  { icon: <Zap size={18} />, label: "Energy Source", value: "Zero-Point Energy Module" },
                  { icon: <Shield size={18} />, label: "Security Protocol", value: "AES-512 Quantum Resistant" },
                  { icon: <Activity size={18} />, label: "System Uptime", value: "99.9999% // Continuous Sync" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4 text-white/40">
                      {spec.icon}
                      <span className="text-xs font-mono uppercase tracking-widest">{spec.label}</span>
                    </div>
                    <span className="font-bold text-white/80">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-[#00f2ff]/5 rounded-3xl border border-[#00f2ff]/20">
                <p className="text-xs font-mono text-[#00f2ff] leading-relaxed">
                  [SYSTEM STATUS]: ALL MODULES OPERATIONAL. NEURAL SYNC AT 100%. READY FOR EXPLORATION.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
