export type Language = 'pt' | 'en' | 'it' | 'es';

export interface MultilingualText {
  pt: string;
  en: string;
  it: string;
  es: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: MultilingualText;
  period: string;
  location: MultilingualText;
  achievements: {
    pt: string[];
    en: string[];
    it: string[];
    es: string[];
  };
}

export interface ProjectItem {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  tech: string[];
  image: string;
  link?: string;
}

export interface EducationItem {
  id: string;
  degree: MultilingualText;
  institution: string;
  status: MultilingualText;
}

export interface CourseItem {
  id: string;
  category: 'engineering' | 'data' | 'soft_skills';
  name: MultilingualText;
}

export interface SkillCategoryData {
  id: string;
  title: MultilingualText;
  items: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    title: MultilingualText;
    subtitle: MultilingualText;
    photo: string;
    objective: MultilingualText;
  };
  about: {
    summary: MultilingualText;
    strengths: {
      pt: string[];
      en: string[];
      it: string[];
      es: string[];
    };
  };
  experience: ExperienceItem[];
  skills: {
    categories: {
      data_bi: SkillCategoryData;
      programming: SkillCategoryData;
      engineering: SkillCategoryData;
      business: SkillCategoryData;
      behavioral: SkillCategoryData;
    };
    soft_skills: {
      pt: string[];
      en: string[];
      it: string[];
      es: string[];
    };
  };
  projects: ProjectItem[];
  education: EducationItem[];
  courses: CourseItem[];
  languages: {
    id: string;
    name: MultilingualText;
    level: MultilingualText;
  }[];
  contact: {
    email: string;
    phone: string;
    location: MultilingualText;
    linkedin: string;
  };
}

export interface Translation {
  nav: {
    about: string;
    experience: string;
    skills: string;
    projects: string;
    education: string;
    contact: string;
  };
  hero: {
    greeting: string;
    title: string;
    subtitle: string;
    objective_title: string;
    objective: string;
    cta_projects: string;
    cta_cv: string;
    cta_linkedin: string;
  };
  about: {
    title: string;
    summary: string;
    strengths_title: string;
    strengths: string[];
  };
  experience: {
    title: string;
    items: {
      role: string;
      company: string;
      period: string;
      location: string;
      achievements: string[];
    }[];
  };
  skills: {
    title: string;
    categories: {
      data_bi: { title: string; items: string[] };
      programming: { title: string; items: string[] };
      engineering: { title: string; items: string[] };
      business: { title: string; items: string[] };
      behavioral: { title: string; items: string[] };
    };
    soft_skills: string[];
  };
  projects: {
    title: string;
    items: {
      title: string;
      description: string;
      tech: string[];
    }[];
  };
  education: {
    title: string;
    items: {
      degree: string;
      institution: string;
      status: string;
    }[];
  };
  courses: {
    title: string;
    categories: {
      engineering: string;
      data: string;
      soft_skills: string;
    };
    items: {
      category: 'engineering' | 'data' | 'soft_skills';
      name: string;
    }[];
  };
  languages: {
    title: string;
    levels: {
      native: string;
      advanced: string;
      intermediate: string;
      basic: string;
    };
    items: {
      name: string;
      level: string;
    }[];
  };
  contact: {
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  };
}
