/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
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

const ART_PROJECTS: Project[] = [
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
    category: 'VISUAL ART',
    description: 'A SERIES OF HIGH-CONTRAST ABSTRACTS EXPLORING THE GEOMETRY OF HUMAN CONSTRUCTION.',
    coverImage: 'https://picsum.photos/seed/mela-art-2/1200/800',
    images: [
      'https://picsum.photos/seed/mela-art-2-1/1200/800',
      'https://picsum.photos/seed/mela-art-2-2/1200/800',
    ]
  }
];

// --- Components ---

const InfoPage = ({ onClose }: { onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-white text-black z-[100] p-8 flex flex-col overflow-y-auto"
  >
    <div className="flex justify-between items-start mb-16">
      <h1 className="font-bold">MELA OKOKO</h1>
      <button onClick={onClose} className="opacity-60 hover:opacity-100">CLOSE</button>
    </div>

    <div className="max-w-xl">
      <p className="leading-relaxed mb-12 opacity-80">
        MELA OKOKO IS AN ARCHITECT AND VISUAL ARTIST BASED IN LAGOS. HIS WORK EXPLORES THE INTERSECTION OF BUILT ENVIRONMENTS AND NARRATIVE STORYTELLING. THROUGH PRECISION DESIGN AND CANDID DOCUMENTATION, HE SEEKS TO CAPTURE THE SOUL OF THE SPACES WE INHABIT.
      </p>

      <div className="space-y-4 mb-16">
        <h2 className="opacity-40">CONTACT</h2>
        <div className="space-y-1">
          <p>MELAOKOKO@GMAIL.COM</p>
          <p>+234 81 000 000 00</p>
        </div>
      </div>

      <div className="space-y-4 pb-20">
        <h2 className="opacity-40">CLIENTS + COLLABORATIONS</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-2 opacity-60">
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
      <button onClick={onBack} className="opacity-60 hover:opacity-100">BACK</button>
      <h1 className="opacity-20">{project.category}</h1>
    </div>

    <div className="w-full mx-auto md:w-1/2">
      <div className="mb-12">
        <h2 className="font-bold mb-4 tracking-[0.2em]">{project.title}</h2>
        <p className="opacity-60 leading-relaxed">{project.description}</p>
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
  const [mode, setMode] = useState<'design' | 'art'>('design'); 
  const [showInfo, setShowInfo] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = useMemo(() => 
    mode === 'design' ? DESIGN_PROJECTS : ART_PROJECTS, 
  [mode]);

  const handleModeToggle = (m: 'design' | 'art') => {
    setMode(m);
    setSelectedProject(null);
  };

  return (
    <div className={`fixed inset-0 transition-colors duration-500 ease-in-out flex flex-col tracking-wider ${
      mode === 'design' ? 'bg-white text-black' : 'bg-black text-white'
    }`}>
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-[80]">
        <div className="font-bold">
          MELA OKOKO
        </div>

        {/* Toggle Mode (Text Only) */}
        <div className="flex gap-4">
          <button 
            onClick={() => handleModeToggle('design')}
            className={`transition-opacity ${mode === 'design' ? 'font-bold' : 'opacity-20'}`}
          >
            DESIGN
          </button>
          <span className="opacity-10">/</span>
          <button 
            onClick={() => handleModeToggle('art')}
            className={`transition-opacity ${mode === 'art' ? 'font-bold' : 'opacity-20'}`}
          >
            ART
          </button>
        </div>

        <div>
          <button 
            onClick={() => setShowInfo(true)}
            className="opacity-40 hover:opacity-100 transition-opacity"
          >
            INFO
          </button>
        </div>
      </header>

      {/* Vertical Snappy Scroll Portfolio */}
      <main className="scroll-container flex-1 transition-opacity duration-700">
        {projects.map((project) => (
          <section 
            key={project.id} 
            className="scroll-item px-8"
          >
            {/* Image Container (50% desktop, 100% mobile) */}
            <div 
              onClick={() => setSelectedProject(project)}
              className="w-full md:w-1/2 grainy-bw cursor-pointer mb-8"
            >
              <img 
                src={project.coverImage} 
                alt={project.title} 
                className="w-full grayscale contrast-125"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Text Below */}
            <div className="w-full md:w-1/2 flex flex-col gap-2 text-center md:text-left">
              <div 
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer group"
              >
                <h2 className="font-bold transition-opacity group-hover:opacity-60 tracking-[0.2em]">{project.title}</h2>
                <p className="opacity-40 tracking-[0.3em] text-[10px]">{project.category}</p>
              </div>
            </div>
          </section>
        ))}

        {/* Footer inside scroll or floating? Floating is better for simplicity */}
      </main>

      {/* Overlays */}
      <AnimatePresence>
        {showInfo && <InfoPage onClose={() => setShowInfo(false)} />}
        {selectedProject && <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />}
      </AnimatePresence>

      {/* Floating Footer */}
      <footer className="fixed bottom-8 left-0 w-full opacity-10 text-center pointer-events-none z-[75]">
        LAGOS — 2026
      </footer>
    </div>
  );
}
