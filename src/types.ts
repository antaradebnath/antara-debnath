export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "AI/ML" | "Computer Vision" | "Creative Tech" | "Frontend Engineering";
  tags: string[];
  image: string; // Dynamic rendering
  github?: string;
  demo?: string;
  interactive?: boolean;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  percentageLabel: string;
  iconName: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  color: string;
  items: SkillItem[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface DrawAnalysisResponse {
  theme: string;
  composition: string;
  artisticStyle: string;
  neuralInterpretation: string;
  creativeSpark: string;
}
