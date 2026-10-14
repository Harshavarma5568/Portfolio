import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Braces, Check, ChevronDown,
  Code2, Cpu, ExternalLink, Layers3, Menu, MessageCircle, MoveUpRight, Orbit,
  Rocket, Send, Sparkles, X, Zap, ShoppingBag, Smartphone, Activity, Globe2
} from 'lucide-react';
import './styles.css';

const services = [
  { n: '01', icon: Globe2, title: 'Web experiences', text: 'High-performance websites with a clear story, beautiful details and a purpose behind every pixel.', tags: ['Web design', 'Development', 'SEO-ready'] },
  { n: '02', icon: Layers3, title: 'Digital products', text: 'Responsive dashboards and web apps that make complex workflows feel effortless.', tags: ['Web apps', 'Dashboards', 'Integrations'] },
  { n: '03', icon: Sparkles, title: 'AI & automation', text: 'Practical AI experiences that help teams work smarter and give customers more value.', tags: ['AI assistants', 'Automation', 'APIs'] },
  { n: '04', icon: Activity, title: 'IoT interfaces', text: 'Connected experiences for monitoring, control and turning real-world data into decisions.', tags: ['IoT dashboards', 'Telemetry', 'Control systems'] },
];
const projects = [
  { no: '01', name: 'Tokala Aqua Foods', category: 'E-commerce · Seafood', description: 'A seafood ordering experience designed around product discovery, reliable delivery and a smoother admin workflow.', stack: ['React', 'E-commerce', 'Responsive UI'], theme: 'aqua', label: 'Freshness, delivered.', icon: ShoppingBag },
  { no: '02', name: 'MI-Fit', category: 'Fitness · Web design', description: 'A bold digital home for a fitness brand, built to communicate energy, clarity and membership value.', stack: ['React', 'Motion', 'UI/UX'], theme: 'fit', label: 'Make your next move.', icon: Zap },
  { no: '03', name: 'Smart Grocery Buddy', category: 'Mobile product · Concept', description: 'A smarter grocery companion concept combining product discovery, planning and helpful recommendations.', stack: ['React Native', 'Firebase', 'OCR'], theme: 'grocery', label: 'Less planning. More living.', icon: Smartphone },
  { no: '04', name: 'AquaTech Control', category: 'IoT · Product prototype', description: 'A connected monitoring concept for pond equipment, with device status, remote controls and live telemetry.', stack: ['IoT', 'MQTT', 'Dashboards'], theme: 'iot', label: 'Control beyond the screen.', icon: Cpu },
];

function Starfield() {
  const mountRef = useRef(null);
  useEffect(() => {
    const host = mountRef.current; if (!host) return;
    let renderer, scene, camera, points, frame;
    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55, host.clientWidth / host.clientHeight, 0.1, 100);
      camera.position.z = 20;
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);
      const count = 900, positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) { positions[i*3] = (Math.random() - .5) * 55; positions[i*3+1] = (Math.random() - .5) * 35; positions[i*3+2] = (Math.random() - .5) * 28; }
      const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ color: 0x71b9ff, size: .035, transparent: true, opacity: .7, sizeAttenuation: true });
      points = new THREE.Points(geometry, material); scene.add(points);
      const resize = () => { if (!host.clientWidth) return; camera.aspect = host.clientWidth / host.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(host.clientWidth, host.clientHeight); };
      window.addEventListener('resize', resize);
      const tick = () => { frame = requestAnimationFrame(tick); points.rotation.y += .00028; points.rotation.x += .00008; renderer.render(scene, camera); };
      tick();
      return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); geometry.dispose(); material.dispose(); renderer.dispose(); if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement); };
    } catch (e) { return undefined; }
  }, []);
  return <div className="starfield" ref={mountRef} aria-hidden="true" />;
}

function MagneticButton({ children, href, onClick, variant = 'primary', target }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const move = (e) => { const r = ref.current?.getBoundingClientRect(); if (!r) return; setOffset({ x: (e.clientX - r.left - r.width / 2) * .08, y: (e.clientY - r.top - r.height / 2) * .12 }); };
  const reset = () => setOffset({ x: 0, y: 0 });
  const props = { ref, className: `button button-${variant}`, onMouseMove: move, onMouseLeave: reset, style: { '--mx': `${offset.x}px`, '--my': `${offset.y}px` } };
  return href ? <a {...props} href={href} target={target} rel={target === '_blank' ? 'noreferrer' : undefined}>{children}</a> : <button {...props} onClick={onClick}>{children}</button>;
}

function Header() {
  const [menu, setMenu] = useState(false);
  const links = [['Work', '#work'], ['Services', '#services'], ['Approach', '#approach'], ['About', '#about']];
  return <header className="header wrap">
    <a className="brand" href="#top" aria-label="HARVAR home"><span className="brand-mark"><span></span><span></span><span></span></span><span className="brand-word">HARVAR<span>®</span><small>Digital studio</small></span></a>
    <nav className={menu ? 'nav nav-open' : 'nav'}>{links.map(([name, href]) => <a key={name} href={href} onClick={() => setMenu(false)}>{name}</a>)}<a className="nav-mobile-cta" href="#contact" onClick={() => setMenu(false)}>Let's talk <ArrowUpRight size={15}/></a></nav>
    <a className="header-cta" href="#contact">Start a project <ArrowUpRight size={16}/></a>
    <button className="menu-toggle" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
  </header>;
}

function OrbitalVisual() {
  return <div className="visual-wrap" aria-label="Abstract 3D digital orb illustration">
    <div className="visual-grid"></div><div className="orbital orbital-one"></div><div className="orbital orbital-two"></div><div className="orbital orbital-three"></div>
    <motion.div className="core-orb" animate={{ rotateY: [0, 18, 0], rotateX: [0, -8, 0], y: [0, -8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
      <div className="orb-shine"></div><div className="orb-continent c1"></div><div className="orb-continent c2"></div><div className="orb-continent c3"></div><div className="orb-ring"></div>
    </motion.div>
    <motion.div className="float-card card-code" animate={{ y: [0, -8, 0], rotate: [-2, 0, -2] }} transition={{ duration: 5, repeat: Infinity }}><span className="float-icon"><Code2 size={17}/></span><span><b>Built with purpose</b><small>Design × Development</small></span><span className="live-dot"></span></motion.div>
    <motion.div className="float-card card-live" animate={{ y: [0, 7, 0], rotate: [2, 0, 2] }} transition={{ duration: 6, repeat: Infinity }}><span className="signal"><span></span><span></span><span></span></span><span><b>Experience online</b><small>Fast · Fluid · Responsive</small></span></motion.div>
    <div className="visual-caption"><span className="caption-line"></span><span>Ideas, engineered into impact.</span></div>
    <div className="visual-index">FIG. 001 <span>—</span> DIGITAL CRAFT</div>
  </div>;
}

function Hero() {
  return <section className="hero wrap" id="top">
    <div className="hero-copy">
      <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}><span className="eyebrow-pulse"></span> INDEPENDENT DIGITAL STUDIO <span className="eyebrow-sep">/</span> INDIA</motion.div>
      <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .15 }}>Digital experiences,<br/><span className="gradient-text">engineered.</span></motion.h1>
      <motion.p className="hero-description" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }}>We turn ambitious ideas into <strong>beautiful websites, useful products, and smarter digital experiences.</strong> Strategy, design and technology — working as one.</motion.p>
      <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .42 }}><MagneticButton href="#work">Explore selected work <ArrowUpRight size={17}/></MagneticButton><MagneticButton href="#contact" variant="secondary"><span className="play-icon"><ArrowDownRight size={15}/></span> Have a project in mind?</MagneticButton></motion.div>
      <motion.div className="hero-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65 }}><span className="note-avatars"><i>H</i><i>+</i></span><span>Small studio mindset.<b> Big-picture thinking.</b></span><span className="note-rule"></span><span className="note-status"><span></span> OPEN FOR SELECT PROJECTS</span></motion.div>
    </div>
    <motion.div className="hero-visual" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .25 }}><OrbitalVisual/></motion.div>
    <a className="scroll-cue" href="#work"><span>SCROLL TO EXPLORE</span><span className="scroll-line"></span></a>
  </section>;
}

function Marquee() { return <div className="marquee" aria-label="Services"><div className="marquee-track">{[0,1,2,3].map(n => <div className="marquee-set" key={n}><span>DESIGN WITH INTENT</span><Asterisk/><span>DEVELOP WITH CARE</span><Asterisk/><span>BUILD FOR WHAT'S NEXT</span><Asterisk/><span>MAKE IT MATTER</span><Asterisk/></div>)}</div></div>; }

function SectionHeading({ kicker, title, subtitle, number }) { return <div className="section-heading"><div className="section-number">{number}<span> / 04</span></div><div><div className="kicker">{kicker}</div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div>; }

function Services() { return <section className="section wrap" id="services"><SectionHeading number="01" kicker="WHAT WE DO" title={<>Thoughtful by design.<br/><span className="muted-heading">Powerful by build.</span></>} subtitle="From first sketch to final launch, we make digital work feel clear, considered and unmistakably yours."/><div className="services-grid">{services.map((s, i) => <motion.article className="service-card" key={s.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: i * .08 }}><div className="service-top"><span className="service-number">{s.n} — SERVICE</span><span className="service-icon"><s.icon size={21}/></span></div><h3>{s.title}</h3><p>{s.text}</p><div className="tag-list">{s.tags.map(t => <span key={t}>{t}</span>)}</div><a href="#contact" className="card-arrow" aria-label={`Discuss ${s.title}`}><ArrowUpRight size={19}/></a></motion.article>)}</div></section>; }

function ProjectVisual({ project }) { const Icon = project.icon; return <div className={`project-visual ${project.theme}`}><div className="browser-bar"><span className="browser-dots"><i></i><i></i><i></i></span><span className="browser-address">{project.name.toLowerCase().replaceAll(' ', '')}.studio</span><span className="browser-menu">•••</span></div><div className="project-art"><div className="art-orbit art-orbit-a"></div><div className="art-orbit art-orbit-b"></div><div className="art-copy"><span className="art-kicker">{project.category}</span><b>{project.label}</b><span className="art-button">Explore <ArrowUpRight size={12}/></span></div><div className="art-object"><Icon strokeWidth={1.1}/></div><div className="art-stamp">H<span>®</span></div></div></div>; }
function Projects() { const [active, setActive] = useState('All'); const filters = ['All', 'Websites', 'Products', 'IoT']; const filtered = projects.filter(p => active === 'All' || (active === 'Websites' && ['aqua','fit'].includes(p.theme)) || (active === 'Products' && p.theme === 'grocery') || (active === 'IoT' && p.theme === 'iot'));
 return <section className="section projects-section" id="work"><div className="wrap"><SectionHeading number="02" kicker="SELECTED WORK" title={<>Made to work.<br/><span className="muted-heading">Built to be remembered.</span></>} subtitle="A selection of concepts and builds exploring how thoughtful digital experiences can move a business forward."/><div className="project-toolbar"><span className="project-count">0{filtered.length} PROJECTS SHOWN</span><div className="filter-tabs">{filters.map(f => <button key={f} className={active === f ? 'filter active' : 'filter'} onClick={() => setActive(f)}>{f}</button>)}</div></div><div className="projects-grid">{filtered.map((p, i) => <motion.article className="project-card" key={p.no} layout initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ delay: i * .07 }}><ProjectVisual project={p}/><div className="project-meta"><div><span className="project-category">{p.category}</span><h3>{p.name}</h3></div><span className="project-no">/{p.no}</span></div><p className="project-description">{p.description}</p><div className="project-footer"><div className="project-stack">{p.stack.map(t => <span key={t}>{t}</span>)}</div><a href="#contact" className="project-link" aria-label={`Ask about ${p.name}`}><ArrowUpRight size={18}/></a></div></motion.article>)}</div><div className="projects-bottom"><span>Have something different in mind?</span><a href="#contact">Let's build it together <ArrowRight size={16}/></a></div></div></section>;
}

function Approach() { const steps = [{ n:'01', title:'Listen & define', text:'We start with your goals, audience and the problem worth solving. Clear direction before pixels.' }, { n:'02', title:'Shape the experience', text:'We map the journey, explore the visual direction and design the details that make it feel right.' }, { n:'03', title:'Build & refine', text:'Clean implementation, responsive behaviour and careful iteration across real devices.' }, { n:'04', title:'Launch with confidence', text:'We test the experience, help you go live and leave you with a clear path for what comes next.' }]; return <section className="section wrap approach-section" id="approach"><SectionHeading number="03" kicker="THE PROCESS" title={<>No mystery.<br/><span className="muted-heading">Just good work.</span></>} subtitle="A collaborative process with clarity at every step — so you know what's happening, why it matters and what comes next."/><div className="approach-layout"><div className="approach-intro"><div className="approach-orb"><div className="approach-orb-inner"><Orbit size={40}/><span>H®</span></div></div><div className="approach-side-note"><span className="note-line"></span><span>GOOD WORK IS A TEAM SPORT.</span></div></div><div className="steps-list">{steps.map((s,i)=><motion.div className="step-row" key={s.n} initial={{ opacity:0, x:18 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*.08 }}><span className="step-number">{s.n}</span><div><h3>{s.title}</h3><p>{s.text}</p></div><ArrowUpRight className="step-arrow" size={18}/></motion.div>)}</div></div></section>; }

function About() { return <section className="about-band" id="about"><div className="wrap about-inner"><div className="about-mark"><span className="brand-mark large"><span></span><span></span><span></span></span><span>INDEPENDENT BY NATURE.<br/>CONNECTED BY DESIGN.</span></div><div className="about-copy"><div className="kicker">A LITTLE ABOUT HARVAR</div><h2>We believe the web should do more than <span className="gradient-text">look good.</span></h2><p>HARVAR is an independent digital practice focused on creating useful, memorable experiences for ambitious people and businesses. We bring design thinking and hands-on development together — with curiosity, care and a bias toward making things real.</p><a href="#contact" className="text-link">A little more about your project <ArrowUpRight size={16}/></a></div><div className="about-stats"><div><b>01</b><span>Curious mind</span></div><div><b>∞</b><span>Room to explore</span></div><div><b>100%</b><span>Care in the details</span></div></div></div></section>; }

function Contact() { const [sent, setSent] = useState(false); const [form, setForm] = useState({ name:'', email:'', service:'Website design & development', message:'' }); const update = e => setForm({...form, [e.target.name]: e.target.value}); const submit = e => { e.preventDefault(); const subject = encodeURIComponent(`Project enquiry from ${form.name}`); const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.service}\n\nProject details:\n${form.message}`); window.location.href = `mailto:hello@harvar.in?subject=${subject}&body=${body}`; setSent(true); };
 return <section className="contact-section" id="contact"><div className="wrap contact-wrap"><div className="contact-heading"><div className="kicker"><span className="eyebrow-pulse"></span> YOUR NEXT CHAPTER STARTS HERE</div><h2>Have a good idea?<br/><span className="gradient-text">Let's make it real.</span></h2><p>Tell us what you're thinking. A few details are enough to get the conversation started.</p><div className="contact-email"><span className="email-icon"><Send size={18}/></span><div><small>PREFER EMAIL?</small><a href="mailto:hello@harvar.in">hello@harvar.in <ArrowUpRight size={14}/></a></div></div><div className="contact-decoration">H<span>®</span></div></div><form className="contact-form" onSubmit={submit}><div className="form-top"><span>PROJECT BRIEF</span><span>LET'S START WITH THE BASICS</span></div><label>Your name<input required name="name" value={form.name} onChange={update} placeholder="What should we call you?"/></label><label>Email address<input required type="email" name="email" value={form.email} onChange={update} placeholder="you@company.com"/></label><label>What do you need?<span className="select-wrap"><select name="service" value={form.service} onChange={update}><option>Website design & development</option><option>E-commerce website</option><option>Web application / dashboard</option><option>AI integration</option><option>IoT product interface</option><option>Something else</option></select><ChevronDown size={16}/></span></label><label>Tell us a little about it<textarea required name="message" value={form.message} onChange={update} placeholder="The idea, the challenge, the big goal…" rows="3"/></label><MagneticButton variant="primary"><span>{sent ? 'Open email again' : 'Send project enquiry'}</span><ArrowUpRight size={17}/></MagneticButton><small className="form-privacy"><Check size={12}/> No pressure. No spam. Just a real conversation.</small></form></div></section>;
}

function Footer() { return <footer className="footer wrap"><a className="brand footer-brand" href="#top"><span className="brand-mark"><span></span><span></span><span></span></span><span className="brand-word">HARVAR<span>®</span><small>Digital studio</small></span></a><span className="footer-note">INDEPENDENT DIGITAL STUDIO <i>·</i> BUILT WITH INTENT.</span><div className="footer-links"><a href="#top">Back to top <ArrowUpRight size={14}/></a><span>© {new Date().getFullYear()} HARVAR</span></div></footer>; }

function App() { const { scrollYProgress } = useScroll(); const scaleX = useTransform(scrollYProgress, 0, 1); return <><motion.div className="progress-bar" style={{ scaleX }} /><Starfield/><Header/><main><Hero/><Marquee/><Services/><Projects/><Approach/><About/><Contact/></main><Footer/></>; }

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
