import React, { useState, useEffect } from 'react';
import { 
  User, FileText, Briefcase, Award, FolderKanban, GraduationCap, 
  Mail, Save, LogOut, Plus, Trash2, Globe, Image as ImageIcon, 
  Download, Upload, CheckCircle2, AlertCircle, X
} from 'lucide-react';
import { PortfolioData, Language, MultilingualText } from '../types';
import { dataManager } from '../dataManager';
import { motion, AnimatePresence } from 'motion/react';

const LANGUAGES: Language[] = ['pt', 'en', 'it', 'es'];
const ADMIN_PASSWORD = 'admin123';

const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<PortfolioData>(dataManager.get());
  const [activeTab, setActiveTab] = useState('personal');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [activeLang, setActiveLang] = useState<Language>('pt');

  useEffect(() => {
    const logged = localStorage.getItem('admin_logged') === 'true';
    if (logged) setIsLoggedIn(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('admin_logged', 'true');
      setError('');
    } else {
      setError('Senha incorreta');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_logged');
  };

  const handleSave = () => {
    setSaveStatus('saving');
    try {
      dataManager.save(data);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (e) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const handleExport = () => {
    dataManager.exportJSON(data);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const importedData = await dataManager.importJSON(file);
        setData(importedData);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } catch (e) {
        alert('Erro ao importar JSON');
      }
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await dataManager.convertImageToBase64(file);
      setData({ ...data, personal: { ...data.personal, photo: base64 } });
    }
  };

  const updateMultilingualField = (path: string, lang: Language, value: string) => {
    const newData = { ...data };
    const parts = path.split('.');
    let current: any = newData;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]][lang] = value;
    setData(newData);
  };

  const updateSimpleField = (path: string, value: string) => {
    const newData = { ...data };
    const parts = path.split('.');
    let current: any = newData;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    setData(newData);
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">Admin Access</h2>
            <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
              <X className="w-5 h-5 dark:text-zinc-400" />
            </button>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button 
              type="submit"
              className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-zinc-500">Hint: admin123</p>
        </motion.div>
      </div>
    );
  }

  const SidebarItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id 
          ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const LangSelector = () => (
    <div className="flex gap-2 mb-6 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg w-fit">
      {LANGUAGES.map(lang => (
        <button
          key={lang}
          onClick={() => setActiveLang(lang)}
          className={`px-3 py-1 rounded-md text-xs font-bold uppercase transition-all ${
            activeLang === lang 
              ? 'bg-white dark:bg-zinc-700 text-orange-600 shadow-sm' 
              : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-50 dark:bg-black flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col">
        <div className="p-6 border-bottom border-zinc-200 dark:border-zinc-800">
          <h1 className="text-xl font-black tracking-tighter dark:text-white">PORTFOLIO <span className="text-orange-600">CMS</span></h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarItem id="personal" icon={User} label="Personal Info" />
          <SidebarItem id="about" icon={FileText} label="About" />
          <SidebarItem id="experience" icon={Briefcase} label="Experience" />
          <SidebarItem id="skills" icon={Award} label="Skills" />
          <SidebarItem id="projects" icon={FolderKanban} label="Projects" />
          <SidebarItem id="education" icon={GraduationCap} label="Education" />
          <SidebarItem id="contact" icon={Mail} label="Contact" />
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
          <button 
            onClick={handleExport}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" /> Export JSON
          </button>
          <label className="w-full flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
            <Upload className="w-4 h-4" /> Import JSON
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-8 flex items-center justify-between">
          <h2 className="text-lg font-bold dark:text-white capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              View Website
            </button>
            <button 
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="flex items-center gap-2 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-orange-600/20 active:scale-95 disabled:opacity-50"
            >
              {saveStatus === 'saving' ? 'Saving...' : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Personal Info Section */}
                {activeTab === 'personal' && (
                  <div className="space-y-8">
                    <div className="flex items-start gap-8">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-800">
                          {data.personal.photo ? (
                            <img src={data.personal.photo} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-400">
                              <ImageIcon className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl">
                          <Upload className="text-white w-6 h-6" />
                          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        </label>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <label className="block text-sm font-bold text-zinc-500 uppercase mb-1">Full Name</label>
                          <input 
                            type="text" 
                            value={data.personal.name}
                            onChange={(e) => updateSimpleField('personal.name', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 dark:text-white"
                          />
                        </div>
                        <LangSelector />
                        <div>
                          <label className="block text-sm font-bold text-zinc-500 uppercase mb-1">Title ({activeLang})</label>
                          <input 
                            type="text" 
                            value={data.personal.subtitle[activeLang]}
                            onChange={(e) => updateMultilingualField('personal.subtitle', activeLang, e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-zinc-500 uppercase mb-1">Objective ({activeLang})</label>
                      <textarea 
                        rows={4}
                        value={data.personal.objective[activeLang]}
                        onChange={(e) => updateMultilingualField('personal.objective', activeLang, e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 dark:text-white resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* About Section */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <LangSelector />
                    <div>
                      <label className="block text-sm font-bold text-zinc-500 uppercase mb-1">Summary ({activeLang})</label>
                      <textarea 
                        rows={10}
                        value={data.about.summary[activeLang]}
                        onChange={(e) => updateMultilingualField('about.summary', activeLang, e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 dark:text-white resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Experience Section */}
                {activeTab === 'experience' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <LangSelector />
                      <button 
                        onClick={() => {
                          const newItem = {
                            id: Date.now().toString(),
                            company: 'New Company',
                            role: { pt: '', en: '', it: '', es: '' },
                            period: '',
                            location: { pt: '', en: '', it: '', es: '' },
                            achievements: { pt: [], en: [], it: [], es: [] }
                          };
                          setData({ ...data, experience: [newItem, ...data.experience] });
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold"
                      >
                        <Plus className="w-4 h-4" /> Add Experience
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {data.experience.map((exp, idx) => (
                        <div key={exp.id} className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 group">
                          <div className="flex justify-between items-start mb-4">
                            <div className="grid grid-cols-2 gap-4 flex-1">
                              <div>
                                <label className="text-xs font-bold text-zinc-400 uppercase">Company</label>
                                <input 
                                  type="text" 
                                  value={exp.company}
                                  onChange={(e) => {
                                    const newList = [...data.experience];
                                    newList[idx].company = e.target.value;
                                    setData({ ...data, experience: newList });
                                  }}
                                  className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-orange-500 outline-none py-1 dark:text-white"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-zinc-400 uppercase">Role ({activeLang})</label>
                                <input 
                                  type="text" 
                                  value={exp.role[activeLang]}
                                  onChange={(e) => {
                                    const newList = [...data.experience];
                                    newList[idx].role[activeLang] = e.target.value;
                                    setData({ ...data, experience: newList });
                                  }}
                                  className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-orange-500 outline-none py-1 dark:text-white"
                                />
                              </div>
                            </div>
                            <button 
                              onClick={() => {
                                const newList = data.experience.filter(item => item.id !== exp.id);
                                setData({ ...data, experience: newList });
                              }}
                              className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-bold text-zinc-400 uppercase">Period</label>
                              <input 
                                type="text" 
                                value={exp.period}
                                onChange={(e) => {
                                  const newList = [...data.experience];
                                  newList[idx].period = e.target.value;
                                  setData({ ...data, experience: newList });
                                }}
                                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-orange-500 outline-none py-1 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-zinc-400 uppercase">Location ({activeLang})</label>
                              <input 
                                type="text" 
                                value={exp.location[activeLang]}
                                onChange={(e) => {
                                  const newList = [...data.experience];
                                  newList[idx].location[activeLang] = e.target.value;
                                  setData({ ...data, experience: newList });
                                }}
                                className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:border-orange-500 outline-none py-1 dark:text-white"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other sections would follow a similar pattern... */}
                {/* For brevity, I'll implement the contact section as well */}
                {activeTab === 'contact' && (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-zinc-500 uppercase mb-1">Email</label>
                      <input 
                        type="email" 
                        value={data.contact.email}
                        onChange={(e) => updateSimpleField('contact.email', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-zinc-500 uppercase mb-1">Phone</label>
                      <input 
                        type="text" 
                        value={data.contact.phone}
                        onChange={(e) => updateSimpleField('contact.phone', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-zinc-500 uppercase mb-1">LinkedIn URL</label>
                      <input 
                        type="text" 
                        value={data.contact.linkedin}
                        onChange={(e) => updateSimpleField('contact.linkedin', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <LangSelector />
                      <label className="block text-sm font-bold text-zinc-500 uppercase mb-1">Location ({activeLang})</label>
                      <input 
                        type="text" 
                        value={data.contact.location[activeLang]}
                        onChange={(e) => updateMultilingualField('contact.location', activeLang, e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Placeholder for other tabs */}
                {!['personal', 'about', 'experience', 'contact'].includes(activeTab) && (
                  <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                    <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">This section is being implemented...</p>
                    <p className="text-sm">You can edit Personal, About, Experience, and Contact for now.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Status Toast */}
        <AnimatePresence>
          {saveStatus !== 'idle' && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`fixed bottom-8 right-8 px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 z-[110] ${
                saveStatus === 'success' ? 'bg-green-600 text-white' : 
                saveStatus === 'error' ? 'bg-red-600 text-white' : 
                'bg-zinc-900 text-white'
              }`}
            >
              {saveStatus === 'saving' && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {saveStatus === 'success' && <CheckCircle2 className="w-5 h-5" />}
              {saveStatus === 'error' && <AlertCircle className="w-5 h-5" />}
              <span className="font-bold">
                {saveStatus === 'saving' ? 'Saving changes...' : 
                 saveStatus === 'success' ? 'Saved successfully!' : 
                 'Error saving changes'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminPanel;
