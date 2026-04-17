/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// --- Data Types ---

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  images: string[];
}

// --- Mock Data ---

const DESIGN_PROJECTS: Project[] = [
  {
    id: 'arch-1',
    title: 'MINIMALIST RESIDENCE',
    category: 'ARCHITECTURE',
    description: 'A STUDY IN LIGHT AND VOID. THIS RESIDENTIAL PROJECT EMPHASIZES NEGATIVE SPACE AND NATURAL ILLUMINATION.',
    coverImage: 'https://picsum.photos/seed/mela-arch-1/1200/800',
    images: [
      'https://picsum.photos/seed/mela-arch-1-1/1200/800',
      'https://picsum.photos/seed/mela-arch-1-2/1200/800',
      'https://picsum.photos/seed/mela-arch-1-3/1200/800',
    ]
  },
  {
    id: 'furn-1',
    title: 'OAK SLOTTED TABLE',
    category: 'FURNITURE',
    description: 'PRECISION JOINERY MEETS ORGANIC FORM. A SOLID OAK DINING TABLE DESIGNED FOR DURABILITY AND AESTHETIC SIMPLICITY.',
    coverImage: 'https://picsum.photos/seed/mela-furn-1/1200/800',
    images: [
      'https://picsum.photos/seed/mela-furn-1-1/1200/800',
      'https://picsum.photos/seed/mela-furn-1-2/1200/800',
    ]
  },
  {
    id: 'arch-2',
    title: 'URBAN PAVILION',
    category: 'ARCHITECTURE',
    description: 'A TEMPORARY STRUCTURE DESIGNED FOR COMMUNITY GATHERING, UTILIZING RECYCLED STEEL AND GLASS.',
    coverImage: 'https://picsum.photos/seed/mela-arch-2/1200/800',
    images: [
      'https://picsum.photos/seed/mela-arch-2-1/1200/800',
    ]
  }
];

const PHOTO_PROJECTS: Project[] = [
  {
    id: 'art-1',
    title: 'LAGOS MIDDAY',
    category: 'PHOTOGRAPHY',
    description: 'DOCUMENTING THE HARSH SHADOWS AND VIBRANT ENERGY OF LAGOS AT ITS PEAK HOURS.',
    coverImage: 'https://picsum.photos/seed/mela-art-1/1200/800',
    images: [
      'https://picsum.photos/seed/mela-art-1-1/1200/800',
      'https://picsum.photos/seed/mela-art-1-2/1200/800',
    ]
  },
  {
    id: 'art-2',
    title: 'FORM & SHADOW',
    category: 'PHOTOGRAPHY',
    description: 'A SERIES OF HIGH-CONTRAST ABSTRACTS EXPLORING THE GEOMETRY OF HUMAN CONSTRUCTION.',
    coverImage: 'https://picsum.photos/seed/mela-art-2/1200/800',
    images: [
      'https://picsum.photos/seed/mela-art-2-1/1200/800',
      'https://picsum.photos/seed/mela-art-2-2/1200/800',
    ]
  }
];

// --- Utilities ---

const CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+&/-.";

// --- Components ---

const SCRAMBLE_SYMBOLS = "X■□▪▫▲▼◈▣";

const ScrambleChar = (props: any) => {
  const [displayChar, setDisplayChar] = useState(props.char || " ");

  useEffect(() => {
    if (props.char === displayChar) return;

    let iteration = 0;
    const maxIterations = 10 + Math.floor(Math.random() * 10);
    const interval = setInterval(() => {
      if (iteration >= maxIterations) {
        setDisplayChar(props.char);
        clearInterval(interval);
        return;
      }

      const randomSymbol = SCRAMBLE_SYMBOLS[Math.floor(Math.random() * SCRAMBLE_SYMBOLS.length)];
      setDisplayChar(randomSymbol);
      iteration++;
    }, 40 + iteration * 2);

    return () => clearInterval(interval);
  }, [props.char]);

  return (
    <span className="inline-block w-[1ch] text-center font-bold">
      {displayChar.toUpperCase()}
    </span>
  );
};

const RollingText = (props: any) => {
  const text = props.text || "";
  
  return (
    <div className="flex whitespace-nowrap overflow-hidden">
      {text.split('').map((char: string, index: number) => (
        <ScrambleChar key={index} char={char} />
      ))}
    </div>
  );
};

const InfoPage = ({ onClose }: { onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-white text-black z-[120] p-8 flex flex-col overflow-y-auto"
  >
    <div className="flex justify-between items-start mb-24 px-4 md:px-12">
      <h1 className="font-bold tracking-widest">MELA OKOKO</h1>
      <button onClick={onClose} className="opacity-60 hover:opacity-100 font-bold uppercase tracking-widest">CLOSE</button>
    </div>

    <div className="max-w-xl mx-auto md:ml-12">
      <p className="leading-relaxed mb-16 opacity-80 uppercase tracking-[0.1em] font-medium">
        MELA OKOKO IS AN ARCHITECT AND PHOTOGRAPHER IN NAIROBI KENYA. HIS WORK EXPLORES THE INTERSECTION OF BUILT ENVIRONMENTS AND NARRATIVE STORYTELLING. THROUGH PRECISION DESIGN AND CANDID DOCUMENTATION, HE SEEKS TO CAPTURE THE SOUL OF THE SPACES WE INHABIT.
      </p>

      <div className="space-y-6 mb-20">
        <h2 className="opacity-40 uppercase tracking-[0.2em] font-bold">CONTACT</h2>
        <div className="space-y-2">
          <p>MELAOKOKO@GMAIL.COM</p>
          <p>+254 000 000 000</p>
        </div>
      </div>

      <div className="space-y-6 pb-20">
        <h2 className="opacity-40 uppercase tracking-[0.2em] font-bold">CLIENTS + COLLABORATIONS</h2>
        <div className="flex flex-wrap gap-x-12 gap-y-3 opacity-60 uppercase tracking-wider">
          <p>LAGOS STATE GOVERNMENT</p>
          <p>BRITISH COUNCIL</p>
          <p>NIKE ART GALLERY</p>
          <p>VOGUE ARCHITECTURE</p>
          <p>STUDIO N</p>
          <p>INDEPENDENT CREATORS</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const ProjectDetail = ({ project, onBack }: { project: Project, onBack: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-inherit text-inherit z-[110] p-8 flex flex-col overflow-y-auto"
  >
    <div className="flex justify-between items-start mb-16 px-4 md:px-0">
      <button onClick={onBack} className="opacity-60 hover:opacity-100 font-bold uppercase tracking-widest">BACK</button>
      <h1 className="opacity-20 font-bold uppercase tracking-widest">{project.category}</h1>
    </div>

    <div className="w-full mx-auto md:w-1/2">
      <div className="mb-12">
        <h2 className="font-bold mb-4 tracking-[0.2em] uppercase">{project.title}</h2>
        <p className="opacity-60 leading-relaxed uppercase tracking-wider">{project.description}</p>
      </div>

      <div className="space-y-12 pb-24">
        {project.images.map((img, idx) => (
          <div key={idx} className="grainy-bw">
            <img 
              src={img} 
              alt={`${project.title} ${idx + 1}`} 
              className="w-full grayscale contrast-125"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [mode, setMode] = useState<'design' | 'photo'>('design'); 
  const [showInfo, setShowInfo] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = useMemo(() => 
    mode === 'design' ? DESIGN_PROJECTS : PHOTO_PROJECTS, 
  [mode]);

  const activeProject = projects[activeIndex] || projects[0];

  const handleModeToggle = (m: 'design' | 'photo') => {
    setMode(m);
    setSelectedProject(null);
    setActiveIndex(0);
    const container = document.querySelector('.scroll-container');
    if (container) container.scrollTop = 0;
  };

  useEffect(() => {
    const observerOptions = {
      root: document.querySelector('.scroll-container'),
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.scroll-item');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [projects]);

  return (
    <div className={`fixed inset-0 transition-colors duration-500 ease-in-out flex flex-col tracking-wider ${
      mode === 'design' ? 'bg-white text-black' : 'bg-black text-white'
    }`}>
      
      {/* Header */}
      <header className={`fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-[110] ${
        mode === 'design' ? 'bg-white' : 'bg-black'
      } transition-colors duration-500`}>
        <div className="font-bold tracking-widest uppercase">
          MELA OKOKO
        </div>

        {/* Toggle Mode (Text Only) */}
        <div className="flex gap-6">
          <button 
            onClick={() => handleModeToggle('design')}
            className={`transition-opacity tracking-widest uppercase ${mode === 'design' ? 'font-bold' : 'opacity-20 hover:opacity-50'}`}
          >
            DESIGN
          </button>
          <span className="opacity-10">/</span>
          <button 
            onClick={() => handleModeToggle('photo')}
            className={`transition-opacity tracking-widest uppercase ${mode === 'photo' ? 'font-bold' : 'opacity-20 hover:opacity-50'}`}
          >
            PHOTO
          </button>
        </div>

        <div>
          <button 
            onClick={() => setShowInfo(true)}
            className="font-bold hover:opacity-50 transition-opacity uppercase tracking-widest"
          >
            INFO
          </button>
        </div>
      </header>

      {/* Vertical Snappy Scroll Portfolio */}
      <main className="scroll-container flex-1 transition-opacity duration-700 h-screen overflow-y-auto pt-16">
        {projects.map((project, idx) => (
          <section 
            key={project.id} 
            data-index={idx}
            className="scroll-item px-8 flex flex-col items-center justify-center min-h-[100vh]"
          >
            {/* Image Container (50% desktop, 100% mobile) */}
            <div 
              onClick={() => setSelectedProject(project)}
              className="w-full md:w-1/2 grainy-bw cursor-pointer group flex items-center justify-center overflow-hidden"
              style={{ maxHeight: 'calc(100vh - 300px)' }}
            >
              <img 
                src={project.coverImage} 
                alt={project.title} 
                className="max-h-full w-auto object-contain grayscale contrast-125 transition-transform duration-500 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Reduced spacing by 60% (h-48 -> h-20) to facilitate snap */}
            <div className="h-20 w-full shrink-0" />
          </section>
        ))}
      </main>

      {/* Static Rolling Text Overlay (Solid Plane only around text) */}
      <div className="fixed bottom-0 left-0 w-full py-12 flex justify-center z-[100] pointer-events-none">
        <div className="w-full md:w-1/2 px-8 flex flex-col gap-3 text-center md:text-left pointer-events-auto">
          <div 
            onClick={() => setSelectedProject(activeProject)}
            className={`cursor-pointer group inline-block self-center md:self-start p-6 ${
              mode === 'design' ? 'bg-white/90 text-black' : 'bg-black/90 text-white'
            } backdrop-blur-sm transition-colors duration-500`}
          >
            <div className="font-bold tracking-[0.2em] mb-2 uppercase">
              <RollingText text={activeProject?.title || ""} />
            </div>
            <div className="opacity-40 tracking-[0.3em] font-bold uppercase">
              <RollingText text={activeProject?.category || ""} />
            </div>
          </div>
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {showInfo && <InfoPage onClose={() => setShowInfo(false)} />}
        {selectedProject && <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />}
      </AnimatePresence>

    </div>
  );
}
