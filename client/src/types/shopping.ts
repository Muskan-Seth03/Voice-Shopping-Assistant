export interface ShoppingItem {
  _id: string;
  name: string;
  quantity: number;
  category: string;
  addedAt: Date;
  completed: boolean;
}

export interface ProductSuggestion {
  _id: string;
  name: string;
  category: string;
  price?: number;
  image?: string;
  brand?: string;
}

export interface ShoppingList {
  _id: string;
  name: string;
  items: ShoppingItem[];
  createdAt: Date;
  updatedAt: Date;
}

export type VoiceCommand = 
  | 'add'
  | 'remove'
  | 'find'
  | 'search'
  | 'clear'
  | 'save'
  | 'load'
  | 'alternatives';

export interface VoiceRecognitionState {
  isListening: boolean;
  isProcessing: boolean;
  transcript: string;
  confidence: number;
}