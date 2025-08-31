import { VoiceCommand } from '../types/shopping';

export interface ParsedCommand {
  command: VoiceCommand;
  item?: string;
  quantity?: number;
  confidence: number;
}

export const parseVoiceCommand = (transcript: string, confidence: number): ParsedCommand | null => {
  const text = transcript.toLowerCase().trim();
  console.log('Parsing voice command:', text);

  // Add commands
  if (text.includes('add') || text.includes('i need')) {
    const result = extractItemAndQuantity(text, ['add', 'i need']);
    
    if (result.item) {
      return {
        command: 'add',
        item: result.item,
        quantity: result.quantity || 1,
        confidence
      };
    }
  }

  // Remove commands
  if (text.includes('remove') || text.includes('delete')) {
    const result = extractItemAndQuantity(text, ['remove', 'delete', 'from my list']);

    if (result.item) {
      return {
        command: 'remove',
        item: result.item,
        confidence
      };
    }
  }

  // Search commands
  if (text.includes('find') || text.includes('search')) {
    const result = extractItemAndQuantity(text, ['find', 'search', 'for']);

    if (result.item) {
      return {
        command: 'search',
        item: result.item,
        confidence
      };
    }
  }

  // Alternatives commands
  if (text.includes('alternatives') || text.includes('show me alternatives')) {
    const result = extractItemAndQuantity(text, ['alternatives for', 'show me alternatives for']);

    if (result.item) {
      return {
        command: 'alternatives',
        item: result.item,
        confidence
      };
    }
  }

  // List commands
  if (text.includes("what's on my list") || text.includes('show my list')) {
    return {
      command: 'find',
      confidence
    };
  }

  // Clear commands
  if (text.includes('clear my list') || text.includes('clear list')) {
    return {
      command: 'clear',
      confidence
    };
  }

  console.log('No command recognized from:', text);
  return null;
};

const extractItemAndQuantity = (text: string, triggers: string[]): { item: string | null; quantity: number | null } => {
  let cleanText = text;

  // Remove trigger words
  triggers.forEach(trigger => {
    cleanText = cleanText.replace(trigger, '').trim();
  });

  // Remove common filler words
  const fillerWords = ['please', 'can you', 'could you', 'to my list', 'from my list'];
  fillerWords.forEach(filler => {
    cleanText = cleanText.replace(filler, '').trim();
  });

  // Extract quantity - look for numbers at the beginning or written numbers
  const numberWords: { [key: string]: number } = {
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
    'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
    'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
    'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20
  };

  let quantity: number | null = null;
  let item: string | null = null;

  // Check for numeric quantity at the beginning
  const numericMatch = cleanText.match(/^(\d+)\s+(.+)/);
  if (numericMatch) {
    quantity = parseInt(numericMatch[1], 10);
    item = numericMatch[2].trim();
  } else {
    // Check for written numbers
    for (const [word, num] of Object.entries(numberWords)) {
      const wordPattern = new RegExp(`^${word}\\s+(.+)`, 'i');
      const match = cleanText.match(wordPattern);
      if (match) {
        quantity = num;
        item = match[1].trim();
        break;
      }
    }
    
    // If no quantity found, the whole text is the item
    if (!item) {
      item = cleanText.trim() || null;
    }
  }

  return { item, quantity };
};

export const getCategoryFromItem = (item: string): string => {
  const categories = {
    'Produce': ['apple', 'banana', 'orange', 'tomato', 'lettuce', 'carrot', 'onion', 'potato', 'avocado', 'spinach'],
    'Dairy': ['milk', 'cheese', 'butter', 'yogurt', 'cream', 'eggs'],
    'Meat': ['chicken', 'beef', 'pork', 'fish', 'turkey', 'salmon', 'tuna'],
    'Bakery': ['bread', 'bagel', 'croissant', 'muffin', 'cake', 'cookies'],
    'Pantry': ['rice', 'pasta', 'flour', 'sugar', 'salt', 'pepper', 'oil', 'vinegar'],
    'Beverages': ['water', 'juice', 'soda', 'coffee', 'tea', 'beer', 'wine'],
    'Frozen': ['ice cream', 'frozen vegetables', 'frozen fruit', 'frozen pizza'],
    'Snacks': ['chips', 'crackers', 'nuts', 'candy', 'chocolate']
  };

  const itemLower = item.toLowerCase();

  for (const [category, items] of Object.entries(categories)) {
    if (items.some(categoryItem => itemLower.includes(categoryItem))) {
      return category;
    }
  }

  return 'Other';
};