/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon, 
  Sun, 
  Languages, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Download, 
  ChevronRight,
  Menu,
  X,
  Database,
  Code,
  Settings,
  Briefcase,
  Target,
  Award,
  CheckCircle2
} from 'lucide-react';
import { translations } from './translations';
import { Language, PortfolioData } from './types';
import { dataManager } from './dataManager';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved as Language) || 'pt';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'dark';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(dataManager.get());

  const t = translations[lang];

  useEffect(() => {
    const handleDataChange = (e: any) => {
      setPortfolioData(e.detail);
    };
    window.addEventListener('portfolioDataChanged', handleDataChange);
    return () => window.removeEventListener('portfolioDataChanged', handleDataChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const navItems = [
    { id: 'about', label: t.nav.about },
    { id: 'experience', label: t.nav.experience },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'education', label: t.nav.education },
    { id: 'contact', label: t.nav.contact },
  ];

  const skillCategories = [
    { 
      title: portfolioData.skills.categories.data_bi.title[lang], 
      icon: <Database className="w-5 h-5" />, 
      skills: portfolioData.skills.categories.data_bi.items 
    },
    { 
      title: portfolioData.skills.categories.programming.title[lang], 
      icon: <Code className="w-5 h-5" />, 
      skills: portfolioData.skills.categories.programming.items 
    },
    { 
      title: portfolioData.skills.categories.engineering.title[lang], 
      icon: <Settings className="w-5 h-5" />, 
      skills: portfolioData.skills.categories.engineering.items 
    },
    { 
      title: portfolioData.skills.categories.business.title[lang], 
      icon: <Briefcase className="w-5 h-5" />, 
      skills: portfolioData.skills.categories.business.items 
    },
    { 
      title: portfolioData.skills.categories.behavioral.title[lang], 
      icon: <Target className="w-5 h-5" />, 
      skills: portfolioData.skills.categories.behavioral.items 
    },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans selection:bg-blue-500/30`}>
      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
      {/* Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            TSP.
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1">
                <Languages className="w-5 h-5" />
                <span className="text-xs font-bold uppercase">{lang}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                {(['pt', 'en', 'it', 'es'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${lang === l ? 'text-blue-600 font-bold' : ''}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-slate-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                {t.hero.greeting}
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
                {portfolioData.personal.title[lang]}
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 font-medium">
                {portfolioData.personal.subtitle[lang]}
              </p>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-10 p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-slate-800"
              >
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  {t.hero.objective_title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                  "{portfolioData.personal.objective[lang]}"
                </p>
              </motion.div>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#projects" 
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 group"
                >
                  {t.hero.cta_projects}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href={`https://${portfolioData.contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-600 dark:hover:border-blue-400 rounded-2xl font-bold transition-all flex items-center gap-2"
                >
                  <Linkedin className="w-5 h-5 text-blue-600" />
                  {t.hero.cta_linkedin}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900">
                <img 
                  src={portfolioData.personal.photo} 
                  alt={portfolioData.personal.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-200 dark:border-slate-800 rounded-full -z-0" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-slate-200/50 dark:border-slate-800/50 rounded-full -z-0" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 bg-white dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4">
                  <span className="w-12 h-1 bg-blue-600 rounded-full" />
                  {t.about.title}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  {portfolioData.about.summary[lang]}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800"
              >
                <h3 className="text-xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                  {t.about.strengths_title}
                </h3>
                <ul className="space-y-4">
                  {portfolioData.about.strengths[lang].map((strength, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span className="font-medium">{strength}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">{t.experience.title}</h2>
            
            <div className="space-y-12">
              {portfolioData.experience.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 md:pl-0 grid md:grid-cols-[200px_1fr] gap-8"
                >
                  {/* Timeline line for mobile */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 md:hidden" />
                  <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-blue-600 md:hidden" />

                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest pt-1">
                    {exp.period}
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-blue-600/30 transition-all shadow-sm">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{exp.role[lang]}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin className="w-4 h-4" />
                        {exp.location[lang]}
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {exp.achievements[lang].map((ach, j) => (
                        <li key={j} className="text-slate-600 dark:text-slate-400 flex items-start gap-3">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">{t.skills.title}</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {skillCategories.map((cat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-6">{cat.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, j) => (
                      <span key={j} className="px-3 py-1 bg-slate-700 rounded-lg text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">{t.projects.title}</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {portfolioData.projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 flex items-center justify-center relative overflow-hidden">
                    {project.image ? (
                      <img src={project.image} alt={project.title[lang]} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                    ) : (
                      <ExternalLink className="w-8 h-8 text-blue-600 opacity-20 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100" />
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{project.title[lang]}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-2">
                      {project.description[lang]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, j) => (
                        <span key={j} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education, Courses & Languages */}
        <section id="education" className="py-32 bg-white dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-16">
              {/* Education */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                  <Award className="w-8 h-8 text-blue-600" />
                  {t.education.title}
                </h2>
                <div className="space-y-8">
                  {portfolioData.education.map((edu, i) => (
                    <div key={edu.id} className="flex gap-6">
                      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center shrink-0">
                        <ChevronRight className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">{edu.degree[lang]}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">{edu.institution}</p>
                        <p className="text-sm text-slate-500">{edu.status[lang]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Courses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                  {t.courses.title}
                </h2>
                <div className="space-y-6">
                  {Object.entries(t.courses.categories).map(([key, label]) => (
                    <div key={key}>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{label}</h4>
                      <ul className="space-y-2">
                        {portfolioData.courses.filter(item => item.category === key).map((course, j) => (
                          <li key={course.id} className="text-sm flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <span className="w-1 h-1 bg-blue-600 rounded-full" />
                            {course.name[lang]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                  <Languages className="w-8 h-8 text-blue-600" />
                  {t.languages.title}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {portfolioData.languages.map((langItem, i) => (
                    <div key={langItem.id} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                      <h3 className="text-lg font-bold">{langItem.name[lang]}</h3>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{langItem.level[lang]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-900/20 rounded-full -ml-32 -mb-32 blur-3xl" />

              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                    {t.contact.title}
                  </h2>
                  <div className="space-y-6">
                    <a href={`mailto:${portfolioData.contact.email}`} className="flex items-center gap-4 text-lg hover:translate-x-2 transition-transform">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Mail className="w-6 h-6" />
                      </div>
                      {portfolioData.contact.email}
                    </a>
                    <a href={`tel:${portfolioData.contact.phone.replace(/\D/g, '')}`} className="flex items-center gap-4 text-lg hover:translate-x-2 transition-transform">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Phone className="w-6 h-6" />
                      </div>
                      {portfolioData.contact.phone}
                    </a>
                    <div className="flex items-center gap-4 text-lg">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <MapPin className="w-6 h-6" />
                      </div>
                      {portfolioData.contact.location[lang]}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <a 
                    href={`https://${portfolioData.contact.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-6 bg-white text-blue-600 rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl"
                  >
                    <Linkedin className="w-8 h-8" />
                    LinkedIn
                  </a>
                  <button 
                    onClick={() => setIsAdminOpen(true)}
                    className="w-full py-6 bg-blue-700 text-white border border-white/20 rounded-3xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-blue-800 transition-colors"
                  >
                    <Settings className="w-6 h-6" />
                    Admin Panel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-black tracking-tighter">TSP.</div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Thaís Santos Pollarini. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="p-2 hover:text-blue-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="p-2 hover:text-blue-600 transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="p-2 hover:text-blue-600 transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
