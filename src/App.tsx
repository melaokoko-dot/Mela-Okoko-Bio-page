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

// --- CONFIGURABLE CONTENT ---
// Edit this section to update your website information

const SITE_CONTENT = {
  name: "MELA OKOKO",
  role: "ARCHITECTURAL TECHNOLOGIST + STREET & DOCUMENTARY PHOTOGRAPHER",
  location: "NAIROBI, KENYA",
  bio: "MELA OKOKO IS AN ARCHITECTURAL TECHNOLOGIST AND A STREET AND DOCUMENTARY PHOTOGRAPHER IN NAIROBI KENYA. HIS WORK EXPLORES THE INTERSECTION OF BUILT ENVIRONMENTS AND NARRATIVE STORYTELLING. THROUGH PRECISION DESIGN AND CANDID DOCUMENTATION, HE SEEKS TO CAPTURE THE SOUL OF THE SPACES WE INHABIT.",
  contacts: {
    email: "MELAOKOKO@GMAIL.COM",
    phone: "+254 000 000 000",
    instagram: "@MELA_OKOKO",
    instagramUrl: "https://instagram.com/mela_okoko" 
  },
  collaborations: [
    "NAIROBI DESIGN WEEK",
    "BRITISH COUNCIL KENYA",
    "MARA FOUNDATION",
    "VOGUE ARCHITECTURE",
    "STUDIO N",
    "INDEPENDENT NARRATIVES"
  ]
};

// ASSET MANAGEMENT:
// To swap images, upload your photos to the /public/assets/photos/ folder.
// Organize them into numerical folders for each collection.
// Examples: '/assets/photos/01_nairobi-midday/cover.jpg', etc.
const PROJECT_DATA: Project[] = [
  {
    id: 'street',
    title: 'SHADES OF NAIROBI',
    category: 'STREET PHOTOGRAPHY',
    description: 'A SERIES OF HIGH-CONTRAST ABSTRACTS EXPLORING THE GEOMETRY OF HUMAN CONSTRUCTION AND STREET NARRATIVES.',
    coverImage: '/assets/photos/01_shades-of-nairobi/SON-18.jpg',
    images: [
      '/assets/photos/01_shades-of-nairobi/SON-1.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-2.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-3.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-4.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-5.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-6.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-7.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-8.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-9.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-10.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-11.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-12.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-13.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-14.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-15.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-16.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-17.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-18.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-19.jpg',
      '/assets/photos/01_shades-of-nairobi/SON-20.jpg',
    ]
  },
  {
    id: 'cradle-of-forgotten',
    title: 'CRADLE OF THE FORGOTTEN',
    category: 'DOCUMENTARY',
    description: 'CANDID MOMENTS CAPTURED IN THE HEART OF THE CITY, FOCUSING ON THE INDIVIDUALS WHO DEFINE NAIROBI.',
    coverImage: '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-18.jpg',
    images: [
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-1.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-2.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-3.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-4.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-5.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-6.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-7.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-8.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-9.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-10.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-11.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-12.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-13.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-14.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-15.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-16.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-17.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-18.jpg',
      '/assets/photos/02_cradle-of-forgotten/Cradle of the forgoten-19.jpg',
    ]
  },
  {
    id: 'seeds-of-nomad',
    title: 'SEEDS OF A NOMAD',
    category: 'DOCUMENTARY',
    description: 'EXPLORING THE GEOMETRY AND SCALE OF NAIROBI\'S EVOLVING ARCHITECTURAL LANDSCAPE.',
    coverImage: '/assets/photos/03_seeds-of-nomad/Seeds of a Normad-5.jpg',
    images: [
      '/assets/photos/03_seeds-of-nomad/Seeds of a Normad-1.jpg',
      '/assets/photos/03_seeds-of-nomad/Seeds of a Normad-2.jpg',
      '/assets/photos/03_seeds-of-nomad/Seeds of a Normad-3.jpg',
      '/assets/photos/03_seeds-of-nomad/Seeds of a Normad-4.jpg',
      '/assets/photos/03_seeds-of-nomad/Seeds of a Normad-5.jpg',
      '/assets/photos/03_seeds-of-nomad/Seeds of a Normad-6.jpg',
      '/assets/photos/03_seeds-of-nomad/Seeds of a Normad-7.jpg',
      '/assets/photos/03_seeds-of-nomad/Seeds of a Normad-8.jpg',
      '/assets/photos/03_seeds-of-nomad/Seeds of a Normad-9.jpg',
      '/assets/photos/03_seeds-of-nomad/Seeds of a Normad-10.jpg',
      '/assets/photos/03_seeds-of-nomad/Seeds of a Normad-11.jpg',
      '/assets/photos/03_seeds-of-nomad/Seeds of a Normad-12.jpg',
      '/assets/photos/03_seeds-of-nomad/Seeds of a Normad-13.jpg',
    ]
  },
  {
    id: 'children-of-nairobi',
    title: 'CHILDREN OF NAIROBI',
    category: 'STREET PHOTOGRAPHY',
    description: 'THE CITY TRANSFORMED BY ARTIFICIAL LIGHT AND LONG EXPOSURES.',
    coverImage: '/assets/photos/04_children-of-nairobi/Children of colour-3.jpg',
    images: [
      '/assets/photos/04_children-of-nairobi/Children of colour-1.jpg',
      '/assets/photos/04_children-of-nairobi/Children of colour-2.jpg',
      '/assets/photos/04_children-of-nairobi/Children of colour-3.jpg',
      '/assets/photos/04_children-of-nairobi/Children of colour-4.jpg',
      '/assets/photos/04_children-of-nairobi/Children of colour-5.jpg',
      '/assets/photos/04_children-of-nairobi/Children of colour-6.jpg',
      '/assets/photos/04_children-of-nairobi/Children of colour-8.jpg',
      '/assets/photos/04_children-of-nairobi/Children of colour-9.jpg',
      '/assets/photos/04_children-of-nairobi/Children of colour-10.jpg',
      '/assets/photos/04_children-of-nairobi/Children of colour-11.jpg',
      '/assets/photos/04_children-of-nairobi/Children of colour-12.jpg',
    ]
  },
  {
    id: 'street-of-colour',
    title: 'STREET OF COLOUR',
    category: 'STREET PHOTOGRAPHY',
    description: 'STORIES OF TRADITION AND MODERNITY INTERTWINED IN EVERYDAY KENYAN LIFE.',
    coverImage: '/assets/photos/05_street-of-colour/SOC-8.jpg',
    images: [
      '/assets/photos/05_street-of-colour/SOC-1.jpg',
      '/assets/photos/05_street-of-colour/SOC-2.jpg',
      '/assets/photos/05_street-of-colour/SOC-3.jpg',
      '/assets/photos/05_street-of-colour/SOC-4.jpg',
      '/assets/photos/05_street-of-colour/SOC-5.jpg',
      '/assets/photos/05_street-of-colour/SOC-6.jpg',
      '/assets/photos/05_street-of-colour/SOC-7.jpg',
      '/assets/photos/05_street-of-colour/SOC-8.jpg',
      '/assets/photos/05_street-of-colour/SOC-9.jpg',
      '/assets/photos/05_street-of-colour/SOC-10.jpg',
      '/assets/photos/05_street-of-colour/SOC-11.jpg',
      '/assets/photos/05_street-of-colour/SOC-12.jpg',
      '/assets/photos/05_street-of-colour/SOC-13.jpg',
      '/assets/photos/05_street-of-colour/SOC-14.jpg',
      '/assets/photos/05_street-of-colour/SOC-15.jpg',
      '/assets/photos/05_street-of-colour/SOC-16.jpg',
      '/assets/photos/05_street-of-colour/SOC-17.jpg',
      '/assets/photos/05_street-of-colour/SOC-18.jpg',
      '/assets/photos/05_street-of-colour/SOC-19.jpg',
      '/assets/photos/05_street-of-colour/SOC-20.jpg',
      '/assets/photos/05_street-of-colour/SOC-21.jpg',
      '/assets/photos/05_street-of-colour/SOC-22.jpg',
      '/assets/photos/05_street-of-colour/SOC-23.jpg',
      '/assets/photos/05_street-of-colour/SOC-24.jpg',
      '/assets/photos/05_street-of-colour/SOC-25.jpg',
      '/assets/photos/05_street-of-colour/SOC-26.jpg',
      '/assets/photos/05_street-of-colour/SOC-27.jpg',
      '/assets/photos/05_street-of-colour/SOC-28.jpg',
    ]
  },
  {
    id: 'kibera-art',
    title: 'KIBERA ART DISTRICT',
    category: 'DOCUMENTARY',
    description: 'FINDING SIMPLICITY IN THE CHAOS OF THE URBAN ENVIRONMENT.',
    coverImage: '/assets/photos/06_kibera-art/Kibera-1.jpg',
    images: [
      '/assets/photos/06_kibera-art/Kibera-1.jpg',
      '/assets/photos/06_kibera-art/Kibera-2.jpg',
      '/assets/photos/06_kibera-art/Kibera-3.jpg',
      '/assets/photos/06_kibera-art/Kibera-4.jpg',
      '/assets/photos/06_kibera-art/Kibera-5.jpg',
      '/assets/photos/06_kibera-art/Kibera-6.jpg',
      '/assets/photos/06_kibera-art/Kibera-7.jpg',
      '/assets/photos/06_kibera-art/Kibera-8.jpg',
      '/assets/photos/06_kibera-art/Kibera-9.jpg',
      '/assets/photos/06_kibera-art/Kibera-10.jpg',
      '/assets/photos/06_kibera-art/Kibera-11.jpg',
      '/assets/photos/06_kibera-art/Kibera-12.jpg',
      '/assets/photos/06_kibera-art/Kibera-13.jpg',
      '/assets/photos/06_kibera-art/Kibera-14.jpg',
      '/assets/photos/06_kibera-art/Kibera-15.jpg',
      '/assets/photos/06_kibera-art/Kibera-16.jpg',
      '/assets/photos/06_kibera-art/Kibera-17.jpg',
      '/assets/photos/06_kibera-art/Kibera-18.jpg',
    ]
  }
];

// --- Components ---

const SCRAMBLE_SYMBOLS = "0123456789";

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
    className="fixed inset-0 bg-white/80 backdrop-blur-xl text-black z-[120] p-8 flex flex-col overflow-y-auto"
  >
    <div className="flex justify-between items-start mb-24 px-4 md:px-12">
      <h1 className="font-bold tracking-widest">{SITE_CONTENT.name}</h1>
      <button onClick={onClose} className="opacity-60 hover:opacity-100 font-bold uppercase tracking-widest">CLOSE</button>
    </div>

    <div className="max-w-xl mx-auto md:ml-12">
      <p className="leading-relaxed mb-16 opacity-80 uppercase tracking-[0.1em] font-medium">
        {SITE_CONTENT.bio}
      </p>

      <div className="space-y-8 mb-20">
        <h2 className="opacity-40 uppercase tracking-[0.2em] font-bold">CONTACT</h2>
        <div className="space-y-4">
          <div>
            <p className="opacity-40 text-[10px] mb-1">EMAIL</p>
            <p>{SITE_CONTENT.contacts.email}</p>
          </div>
          <div>
            <p className="opacity-40 text-[10px] mb-1">PHONE</p>
            <p>{SITE_CONTENT.contacts.phone}</p>
          </div>
          <div>
            <p className="opacity-40 text-[10px] mb-1">INSTAGRAM</p>
            <a href={SITE_CONTENT.contacts.instagramUrl} target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity">
              {SITE_CONTENT.contacts.instagram}
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-6 pb-20">
        <h2 className="opacity-40 uppercase tracking-[0.2em] font-bold">CLIENTS + COLLABORATIONS</h2>
        <div className="flex flex-wrap gap-x-12 gap-y-3 opacity-60 uppercase tracking-wider">
          {SITE_CONTENT.collaborations.map(collab => (
            <p key={collab}>{collab}</p>
          ))}
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
    className="fixed inset-0 bg-white text-black z-[110] p-8 flex flex-col overflow-y-auto"
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
  const [showInfo, setShowInfo] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = useMemo(() => PROJECT_DATA, []);
  const activeProject = projects[activeIndex] || projects[0];

  const scrollToTop = () => {
    const container = document.querySelector('.scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    <div className="fixed inset-0 transition-colors duration-500 ease-in-out flex flex-col tracking-wider bg-white text-black">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-8 flex items-center z-[110] bg-white transition-colors duration-500">
        <div className="flex-1">
          <button 
            onClick={scrollToTop}
            className="font-bold tracking-widest uppercase hover:opacity-50 transition-opacity"
          >
            {SITE_CONTENT.name}
          </button>
        </div>

        <div className="flex-1 text-right">
          <button 
            onClick={() => setShowInfo(true)}
            className="font-bold hover:opacity-50 transition-opacity uppercase tracking-widest"
          >
            INFO
          </button>
        </div>
      </header>

      {/* Vertical Snappy Scroll Portfolio */}
      <main className="scroll-container transition-opacity duration-700 h-screen overflow-y-auto pt-0 text-black">
        {projects.map((project, idx) => (
          <section 
            key={project.id} 
            data-index={idx}
            className="scroll-item px-8 flex flex-col items-center justify-center h-screen relative"
          >
            {/* Image Container */}
            <div 
              onClick={() => setSelectedProject(project)}
              className="w-full md:w-1/2 grainy-bw cursor-pointer group flex items-center justify-center overflow-hidden"
              style={{ maxHeight: 'calc(100vh - 250px)' }}
            >
              <img 
                src={project.coverImage} 
                alt={project.title} 
                className="max-h-full w-auto object-contain grayscale contrast-125 transition-transform duration-500 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
            </div>
          </section>
        ))}
      </main>

      {/* Static Rolling Text Overlay (Solid Plane only around text) */}
      <div className="fixed bottom-0 left-0 w-full py-12 flex justify-center z-[100] pointer-events-none">
        <div className="w-full md:w-1/2 px-8 flex flex-col gap-3 text-center md:text-left pointer-events-auto">
          <div 
            onClick={() => setSelectedProject(activeProject)}
            className="cursor-pointer group inline-block self-center md:self-start p-6 bg-white/90 text-black backdrop-blur-sm transition-colors duration-500"
          >
            <div className="font-bold tracking-[0.2em] mb-2 uppercase">
              <RollingText text={activeProject?.title || ""} />
            </div>
            
            {/* Added Collection Description in overlay */}
            <div className="mt-2 mb-3 max-w-sm hidden md:block">
               <p className="text-[10px] opacity-40 uppercase tracking-widest leading-relaxed">
                 {activeProject?.description}
               </p>
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
