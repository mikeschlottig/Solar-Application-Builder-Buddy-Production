export interface TabConfig {
  id: string;
  label: string;
  icon: string;
  path: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
}

export interface ProjectStats {
  prds: number;
  conversations: number;
  documents: number;
  analyses: number;
}

export interface AIGenerationRequest {
  prompt: string;
  language: string;
  framework?: string;
  features?: string[];
}

export interface AIGenerationResponse {
  code: string;
  metadata: {
    language: string;
    framework?: string;
    confidence: number;
    tokens_used: number;
  };
}

export interface CodeAnalysisResult {
  file_path: string;
  analysis: {
    complexity: number;
    maintainability: number;
    security_issues: string[];
    suggestions: string[];
  };
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  framework: string;
  content: string;
  variables: string[];
}