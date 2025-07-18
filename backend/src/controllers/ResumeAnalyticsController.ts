import { PrismaClient } from '@prisma/client';
import { OpenAI } from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class ResumeAnalyticsController {
  async getResumeAnalytics(resumeId: string, userId: string) {
    const resume = await prisma.resume.findFirst({
      where: { id: resumeId, userId },
      include: {
        experiences: true,
        education: true,
        skills: true,
        projects: true,
      },
    });

    if (!resume) {
      throw new Error('Resume not found');
    }

    // Calculate completeness score
    const completeness = this.calculateCompleteness(resume);
    
    // Calculate overall score
    const score = this.calculateOverallScore(resume);
    
    // Analyze skills distribution
    const skills = this.analyzeSkills(resume.skills);
    
    // Analyze experience timeline
    const experience = this.analyzeExperienceTimeline(resume.experiences);
    
    // Analyze education distribution
    const education = this.analyzeEducation(resume.education);
    
    // Get AI suggestions
    const suggestions = await this.getAISuggestions(resume);

    return {
      completeness,
      score,
      skills,
      experience,
      education,
      suggestions,
    };
  }

  async getSkillsAnalysis(resumeId: string, userId: string) {
    const resume = await prisma.resume.findFirst({
      where: { id: resumeId, userId },
      include: { skills: true },
    });

    if (!resume) {
      throw new Error('Resume not found');
    }

    return this.analyzeSkills(resume.skills);
  }

  async getExperienceTimeline(resumeId: string, userId: string) {
    const resume = await prisma.resume.findFirst({
      where: { id: resumeId, userId },
      include: { experiences: true },
    });

    if (!resume) {
      throw new Error('Resume not found');
    }

    return this.analyzeExperienceTimeline(resume.experiences);
  }

  async getImprovementSuggestions(resumeId: string, userId: string) {
    const resume = await prisma.resume.findFirst({
      where: { id: resumeId, userId },
      include: {
        experiences: true,
        education: true,
        skills: true,
        projects: true,
      },
    });

    if (!resume) {
      throw new Error('Resume not found');
    }

    return await this.getAISuggestions(resume);
  }

  private calculateCompleteness(resume: any): number {
    let totalFields = 0;
    let completedFields = 0;

    // Check basic info
    totalFields += 4; // name, email, phone, summary
    if (resume.name) completedFields++;
    if (resume.email) completedFields++;
    if (resume.phone) completedFields++;
    if (resume.summary) completedFields++;

    // Check experiences
    totalFields += 1;
    if (resume.experiences && resume.experiences.length > 0) completedFields++;

    // Check education
    totalFields += 1;
    if (resume.education && resume.education.length > 0) completedFields++;

    // Check skills
    totalFields += 1;
    if (resume.skills && resume.skills.length > 0) completedFields++;

    // Check projects
    totalFields += 1;
    if (resume.projects && resume.projects.length > 0) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  }

  private calculateOverallScore(resume: any): number {
    let score = 0;

    // Basic info (20 points)
    if (resume.name) score += 5;
    if (resume.email) score += 5;
    if (resume.phone) score += 5;
    if (resume.summary && resume.summary.length > 50) score += 5;

    // Experiences (30 points)
    if (resume.experiences && resume.experiences.length > 0) {
      score += Math.min(30, resume.experiences.length * 10);
    }

    // Education (20 points)
    if (resume.education && resume.education.length > 0) {
      score += Math.min(20, resume.education.length * 10);
    }

    // Skills (20 points)
    if (resume.skills && resume.skills.length > 0) {
      score += Math.min(20, resume.skills.length * 2);
    }

    // Projects (10 points)
    if (resume.projects && resume.projects.length > 0) {
      score += Math.min(10, resume.projects.length * 5);
    }

    return Math.min(100, score);
  }

  private analyzeSkills(skills: any[]): { name: string; count: number }[] {
    const skillCounts: { [key: string]: number } = {};
    
    skills.forEach(skill => {
      const category = skill.category || 'Other';
      skillCounts[category] = (skillCounts[category] || 0) + 1;
    });

    return Object.entries(skillCounts).map(([name, count]) => ({
      name,
      count,
    }));
  }

  private analyzeExperienceTimeline(experiences: any[]): { year: string; months: number }[] {
    const timeline: { [key: string]: number } = {};
    
    experiences.forEach(exp => {
      if (exp.startDate && exp.endDate) {
        const startYear = new Date(exp.startDate).getFullYear();
        const endYear = new Date(exp.endDate).getFullYear();
        
        for (let year = startYear; year <= endYear; year++) {
          const yearStr = year.toString();
          timeline[yearStr] = (timeline[yearStr] || 0) + 12;
        }
      }
    });

    return Object.entries(timeline).map(([year, months]) => ({
      year,
      months,
    }));
  }

  private analyzeEducation(education: any[]): { level: string; count: number }[] {
    const levelCounts: { [key: string]: number } = {};
    
    education.forEach(edu => {
      const level = edu.degree || 'Other';
      levelCounts[level] = (levelCounts[level] || 0) + 1;
    });

    return Object.entries(levelCounts).map(([level, count]) => ({
      level,
      count,
    }));
  }

  private async getAISuggestions(resume: any): Promise<string[]> {
    try {
      const resumeText = this.formatResumeForAI(resume);
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional resume consultant. Analyze the resume and provide 3-5 specific, actionable suggestions for improvement. Focus on content, structure, and presentation. Keep suggestions concise and practical."
          },
          {
            role: "user",
            content: `Please analyze this resume and provide improvement suggestions:\n\n${resumeText}`
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const suggestions = completion.choices[0]?.message?.content || '';
      return suggestions.split('\n').filter(s => s.trim().length > 0);
    } catch (error) {
      console.error('AI suggestions error:', error);
      return [
        "Consider adding more specific achievements to your experience section",
        "Include quantifiable results where possible",
        "Ensure your summary is compelling and tailored to your target role",
        "Add relevant keywords for your industry",
        "Consider including a projects section to showcase your work"
      ];
    }
  }

  private formatResumeForAI(resume: any): string {
    let text = `Name: ${resume.name || 'Not provided'}\n`;
    text += `Email: ${resume.email || 'Not provided'}\n`;
    text += `Phone: ${resume.phone || 'Not provided'}\n\n`;
    
    text += `Summary: ${resume.summary || 'Not provided'}\n\n`;
    
    text += `Experience:\n`;
    resume.experiences?.forEach((exp: any) => {
      text += `- ${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate})\n`;
      text += `  ${exp.description || 'No description'}\n`;
    });
    
    text += `\nEducation:\n`;
    resume.education?.forEach((edu: any) => {
      text += `- ${edu.degree} from ${edu.institution} (${edu.startDate} - ${edu.endDate})\n`;
    });
    
    text += `\nSkills:\n`;
    resume.skills?.forEach((skill: any) => {
      text += `- ${skill.name} (${skill.category || 'Other'})\n`;
    });
    
    text += `\nProjects:\n`;
    resume.projects?.forEach((project: any) => {
      text += `- ${project.title}: ${project.description || 'No description'}\n`;
    });
    
    return text;
  }
} 