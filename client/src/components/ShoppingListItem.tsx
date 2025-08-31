import React from 'react';
import { X, Package, Plus, Minus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ShoppingItem } from '../types/shopping';
import { cn } from '../lib/utils';

interface ShoppingListItemProps {
  item: ShoppingItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  className?: string;
}

const categoryColors = {
  'Produce': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
  'Dairy': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
  'Meat': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
  'Bakery': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700',
  'Pantry': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
  'Beverages': 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-700',
  'Frozen': 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700',
  'Snacks': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
  'Other': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700'
};

export const ShoppingListItem: React.FC<ShoppingListItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
  className
}) => {
  const categoryStyle = categoryColors[item.category as keyof typeof categoryColors] || categoryColors.Other;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      onUpdateQuantity(item._id, newQuantity);
    }
  };

  return (
    <Card className={cn(
      "p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 group hover:bg-gray-50 dark:hover:bg-gray-750",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Package className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                {item.name}
              </h3>
            </div>
            <Badge className={cn("mt-1 text-xs", categoryStyle)}>
              {item.category}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-600"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item._id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};