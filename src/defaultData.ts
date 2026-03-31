import { PortfolioData } from './types';

export const defaultPortfolioData: PortfolioData = {
  personal: {
    name: 'Thaís Santos Pollarini',
    title: {
      pt: 'Thaís Santos Pollarini',
      en: 'Thaís Santos Pollarini',
      it: 'Thaís Santos Pollarini',
      es: 'Thaís Santos Pollarini',
    },
    subtitle: {
      pt: 'Analista de Dados | Engenheira Mecatrônica',
      en: 'Data Analyst | Mechatronics Engineer',
      it: 'Analista Dati | Ingegnere Meccatronico',
      es: 'Analista de Datos | Ingeniera Mecatrónica',
    },
    photo: '/profile.png',
    objective: {
      pt: 'Busco oportunidades desafiadoras para aplicar meus conhecimentos em engenharia, análise de dados e gestão, desenvolvendo projetos inovadores utilizando minha capacidade de resolução de problemas e minha visão analítica.',
      en: 'I seek challenging opportunities to apply my knowledge in engineering, data analysis, and management, developing innovative projects using my problem-solving skills and analytical vision.',
      it: 'Cerco opportunità stimolanti per applicare le mie conoscenze in ingegneria, analisi dei dati e gestione, sviluppando progetti innovativi utilizzando le mie capacità di problem solving e la mia visione analitica.',
      es: 'Busco oportunidades desafiantes para aplicar mis conocimientos en ingeniería, análisis de datos y gestión, desarrollando proyectos innovadores utilizando mi capacidad de resolución de problemas y mi visión analítica.',
    },
  },
  about: {
    summary: {
      pt: 'Engenheira Mecatrônica com experiência nas áreas de segurança veicular, engenharia de produto, análise e gestão de dados e consultoria estratégica. Atuação em ambientes corporativos e industriais de alta exigência, com forte foco em testes de segurança passiva, análise técnica, planejamento, gestão de indicadores e elaboração de relatórios técnicos e executivos. Experiência em integração de sistemas, automação, programação, engenharia de sistemas e suporte à tomada de decisão estratégica. Perfil analítico, organizado, adaptável e com boa comunicação em ambientes multidisciplinares e internacionais.',
      en: 'Mechatronics Engineer with experience in vehicle safety, product engineering, data analysis and management, and strategic consulting. Working in high-demand corporate and industrial environments, with a strong focus on passive safety tests, technical analysis, planning, indicator management, and technical/executive report preparation. Experience in systems integration, automation, programming, systems engineering, and strategic decision support. Analytical, organized, adaptable profile with good communication in multidisciplinary and international environments.',
      it: 'Ingegnere Meccatronico con esperienza nei settori della sicurezza dei veicoli, ingegneria di prodotto, analisi e gestione dei dati e consulenza strategica. Opero in ambienti aziendali e industriali ad alta esigenza, con un forte focus su test di sicurezza passiva, analisi tecnica, pianificazione, gestione di indicatori e preparazione di report tecnici ed esecutivi. Esperienza in integrazione di sistemi, automazione, programmazione, ingegneria dei sistemi e supporto alle decisioni strategiche. Profilo analitico, organizzato, adattabile con buona comunicazione in ambienti multidisciplinari e internazionali.',
      es: 'Ingeniera Mecatrónica con experiencia en las áreas de seguridad vehicular, ingeniería de producto, análisis y gestión de datos y consultoría estratégica. Actuación en entornos corporativos e industriales de alta exigencia, com fuerte foco en pruebas de seguridad pasiva, análisis técnico, planificación, gestión de indicadores e elaboración de informes técnicos y ejecutivos. Experiencia en integración de sistemas, automazione, programación, ingeniería de sistemas y soporte a la toma de decisiones estratégicas. Perfil analítico, organizado, adaptable con buena comunicación en entornos multidisciplinarios e internacionales.',
    },
    strengths: {
      pt: ['Gestão de Projetos e Operacional', 'Gestão de Desempenho e Produtos', 'Gestão de Fornecedores', 'Consultoria Estratégica', 'Análise Financeira e Transações'],
      en: ['Project & Operational Management', 'Performance & Product Management', 'Supplier Management', 'Strategic Consulting', 'Financial Analysis & Transactions'],
      it: ['Gestione Progetti e Operativa', 'Gestione Performance e Prodotto', 'Gestione Fornitori', 'Consulenza Strategica', 'Analisi Finanziaria e Transazioni'],
      es: ['Gestión de Proyectos y Operativa', 'Gestión de Desempeño e Productos', 'Gestión de Proveedores', 'Consultoría Estratégica', 'Análisis Financiero y Transacciones'],
    },
  },
  experience: [
    {
      id: '1',
      company: 'ACT Digital (Stellantis)',
      role: {
        pt: 'Analista de Produto',
        en: 'Product Analyst',
        it: 'Analista di Prodotto',
        es: 'Analista de Producto',
      },
      period: 'Mar/2024 - Atual',
      location: {
        pt: 'Contagem, MG',
        en: 'Contagem, MG',
        it: 'Contagem, MG',
        es: 'Contagem, MG',
      },
      achievements: {
        pt: [
          'Atuação na área de segurança veicular, com foco na execução, planejamento e análise de testes de segurança passiva (baixa/alta velocidade, airbags, homologação).',
          'Gestão de pré-teste e pós-teste: preparação de veículos, integração de sensores e sistemas de aquisição de dados.',
          'Análises estruturais pós-impacto e análises biomecânicas de dummies para avaliação de desempenho.',
          'Gestão de dados: manutenção de bancos de dados, dashboards em Power BI e KPIs em Excel Avançado.',
          'Controle de estoque e compras de equipamentos, monitoramento e testes de sensores.',
        ],
        en: [
          'Working in vehicle safety, focusing on execution, planning, and analysis of passive safety tests (low/high speed, airbags, homologation).',
          'Pre-test and post-test management: vehicle preparation, sensor integration, and data acquisition systems.',
          'Post-impact structural analysis and biomechanical dummy analysis for performance evaluation.',
          'Data management: database maintenance, Power BI dashboards, and Advanced Excel KPIs.',
          'Inventory control and equipment purchasing, sensor monitoring and testing.',
        ],
        it: [
          'Opero nella sicurezza dei veicoli, focalizzandomi su esecuzione, pianificazione e analisi di test di sicurezza passiva (bassa/alta velocità, airbag, omologazione).',
          'Gestione pre-test e post-test: preparazione veicoli, integrazione sensori e sistemi di acquisizione dati.',
          'Analisi strutturale post-impatto e analisi biomeccanica dei manichini per la valutazione delle prestazioni.',
          'Gestione dati: manutenzione database, dashboard Power BI e KPI Excel Avanzato.',
          'Controllo inventario e acquisto attrezzature, monitoraggio e test sensori.',
        ],
        es: [
          'Actuación en seguridad vehicular, con foco en ejecución, planificación y análisis de pruebas de seguridad pasiva (baja/alta velocidad, airbags, homologación).',
          'Gestión de pre-prueba y post-prueba: preparación de vehículos, integración de sensores y sistemas de adquisición de datos.',
          'Análisis estructural post-impacto y análisis biomecánico de dummies para evaluación de desempeño.',
          'Gestión de datos: mantenimiento de bases de datos, dashboards en Power BI e KPIs en Excel Avanzado.',
          'Control de inventario y compras de equipos, monitoreo y pruebas de sensores.',
        ],
      },
    },
    // ... more experiences would go here, but for brevity I'll start with one
  ],
  skills: {
    categories: {
      data_bi: {
        id: 'data_bi',
        title: { pt: 'Dados & BI', en: 'Data & BI', it: 'Dati & BI', es: 'Datos & BI' },
        items: ['Power BI', 'Excel Avançado', 'Dashboards', 'KPIs', 'Power Automate', 'Análise de Dados'],
      },
      programming: {
        id: 'programming',
        title: { pt: 'Programação', en: 'Programming', it: 'Programmazione', es: 'Programación' },
        items: ['Python', 'SQL', 'C/C++', 'PHP', 'HTML/CSS', 'TypeScript'],
      },
      engineering: {
        id: 'engineering',
        title: { pt: 'Engenharia', en: 'Engineering', it: 'Ingegneria', es: 'Ingeniería' },
        items: ['MATLAB/Simulink', 'AutoCAD', 'SolidWorks', 'CLP', 'RoboDK', 'Roboguide'],
      },
      business: {
        id: 'business',
        title: { pt: 'Gestão', en: 'Management', it: 'Gestione', es: 'Gestión' },
        items: ['Gestão de Projetos', 'Gestão de Produtos', 'Análise Financeira', 'Valuation', 'Consultoria Estratégica'],
      },
      behavioral: {
        id: 'behavioral',
        title: { pt: 'Comportamental', en: 'Behavioral', it: 'Comportamentale', es: 'Comportamental' },
        items: ['Pensamento analítico', 'Resolução de problemas', 'Comunicação assertiva', 'Organização', 'Adaptabilidade', 'Liderança técnica'],
      },
    },
    soft_skills: {
      pt: ['Pensamento analítico e lógico', 'Resolução de problemas complexos', 'Comunicação técnica e assertiva', 'Organização e planejamento', 'Inteligência emocional e Adaptabilidade', 'Liderança técnica'],
      en: ['Analytical and logical thinking', 'Complex problem solving', 'Technical and assertive communication', 'Organization and planning', 'Emotional intelligence and Adaptability', 'Technical leadership'],
      it: ['Pensamento analitico e logico', 'Risoluzione di problemi complessi', 'Comunicazione tecnica e assertiva', 'Organizzazione e pianificazione', 'Inteligenza emotiva e adattabilità', 'Leadership tecnica'],
      es: ['Pensamiento analítico e lógico', 'Resolución de problemas complejos', 'Comunicación técnica y asertiva', 'Organización y planificación', 'Inteligencia emocional y adaptabilidad', 'Liderazgo técnico'],
    },
  },
  projects: [
    {
      id: '1',
      title: { pt: 'Segurança Passiva Veicular', en: 'Passive Vehicle Safety', it: 'Sicurezza Passiva Veicoli', es: 'Seguridad Passiva Vehicular' },
      description: {
        pt: 'Especialista em testes de impacto, análise estrutural e biomecânica para homologação.',
        en: 'Specialist in impact testing, structural analysis, and biomechanics for homologation.',
        it: 'Specialista in crash test, analisi strutturale e biomeccanica per l\'omologazione.',
        es: 'Especialista en pruebas de impacto, análisis estructural y biomecánica para homologación.',
      },
      tech: ['Engenharia', 'Sensores', 'Normas'],
      image: 'https://picsum.photos/seed/safety/600/400',
    },
  ],
  education: [
    {
      id: '1',
      degree: { pt: 'Bacharelado em Engenharia Mecatrônica', en: 'Bachelor\'s in Mechatronics Engineering', it: 'Laurea in Ingegneria Meccatronica', es: 'Licenciatura en Ingeniería Mecatrônica' },
      institution: 'CEFET-MG',
      status: { pt: 'Concluído em Mar/2023', en: 'Completed Mar/2023', it: 'Completato Mar/2023', es: 'Completado Mar/2023' },
    },
  ],
  courses: [
    {
      id: '1',
      category: 'engineering',
      name: { pt: 'Protection of Vulnerable Road Users', en: 'Protection of Vulnerable Road Users', it: 'Protezione degli utenti vulnerabili della strada', es: 'Protección de usuarios vulnerables de la vía' },
    },
  ],
  languages: [
    {
      id: '1',
      name: { pt: 'Português', en: 'Portuguese', it: 'Portoghese', es: 'Portugués' },
      level: { pt: 'Nativo', en: 'Native', it: 'Madrelingua', es: 'Nativo' },
    },
    {
      id: '2',
      name: { pt: 'Inglês', en: 'English', it: 'Inglese', es: 'Inglés' },
      level: { pt: 'Avançado', en: 'Advanced', it: 'Avanzato', es: 'Avanzado' },
    },
  ],
  contact: {
    email: 'pollarinithais@gmail.com',
    phone: '(37) 9 9963-0008',
    location: { pt: 'Contagem, MG - Brasil', en: 'Contagem, MG - Brazil', it: 'Contagem, MG - Brasile', es: 'Contagem, MG - Brasil' },
    linkedin: 'linkedin.com/in/thais-pollarini',
  },
};
