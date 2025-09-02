// Resume Types
export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  title: string
  linkedin?: string
  website?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string
  achievements?: string[]
  skills?: string[]
}

export interface Education {
  id: string
  degree: string
  school: string
  period: string
  description: string
  gpa?: string
  honors?: string[]
}

export interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  category: 'technical' | 'soft' | 'language' | 'other'
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  period: string
  url?: string
  github?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiryDate?: string
  url?: string
}

export interface ResumeSection {
  id: string
  type: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications'
  title: string
  content: any
  order: number
  visible: boolean
}

export interface ResumeData {
  id: string
  title: string
  language: string
  template: string
  personal: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
  sections: ResumeSection[]
  metadata: {
    createdAt: string
    updatedAt: string
    version: number
    lastModified: string
  }
}

export interface ResumeTemplate {
  id: string
  name: string
  category: string
  preview: string
  config: {
    sections: string[]
    layout: 'single' | 'two-column' | 'modern'
    colors: {
      primary: string
      secondary: string
      accent: string
    }
    fonts: {
      heading: string
      body: string
    }
  }
}
