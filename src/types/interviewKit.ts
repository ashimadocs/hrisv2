export interface Question {
  id: string;
  text: string;
  type: 'text' | 'range' | 'multiple-choice' | 'rating';
  rangeMin?: number;
  rangeMax?: number;
  options?: string[];
}

export interface InterviewKit {
  id: string;
  name: string;
  instructions: string;
  questions: Question[];
  skills: string[];
  traits: string[];
  status: 'draft' | 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
} 