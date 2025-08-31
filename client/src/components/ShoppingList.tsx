import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ShoppingListItem } from './ShoppingListItem';
import { ShoppingItem } from '../types/shopping';
import { cn } from '../lib/utils';

interface ShoppingListProps {
  items: ShoppingItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  className?: string;
}

export const ShoppingList: React.FC<ShoppingListProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  className
}) => {
  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  const categories = Object.keys(groupedItems).sort();

  if (items.length === 0) {
    return (
      <Card className={cn("bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-dashed border-gray-300 dark:border-gray-600", className)}>
        <CardContent className="p-8 text-center">
          <Package className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your shopping list is empty
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Use voice commands to add items to your list
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-gray-100">
          <ShoppingCart className="h-5 w-5" />
          <span>Shopping List ({items.length} items)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map(category => (
          <div key={category} className="space-y-3">
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-1">
              {category}
            </h4>
            <div className="space-y-2">
              {groupedItems[category].map(item => (
                <ShoppingListItem
                  key={item._id}
                  item={item}
                  onRemove={onRemoveItem}
                  onUpdateQuantity={onUpdateQuantity}
                />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};