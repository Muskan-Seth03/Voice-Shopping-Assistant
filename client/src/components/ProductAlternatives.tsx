import React from 'react';
import { RefreshCw, Plus, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ProductSuggestion } from '../types/shopping';
import { cn } from '../lib/utils';

interface ProductAlternativesProps {
  alternatives: ProductSuggestion[];
  originalProduct: string;
  onAddAlternative: (alternative: ProductSuggestion) => void;
  onClose: () => void;
  className?: string;
}

export const ProductAlternatives: React.FC<ProductAlternativesProps> = ({
  alternatives,
  originalProduct,
  onAddAlternative,
  onClose,
  className
}) => {
  if (alternatives.length === 0) {
    return null;
  }

  return (
    <Card className={cn("bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-700 shadow-lg", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-gray-100">
            <RefreshCw className="h-5 w-5 text-blue-500" />
            <span>Alternatives for "{originalProduct}"</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ×
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {alternatives.map(alternative => (
          <div
            key={alternative._id}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700 hover:shadow-md transition-all duration-200"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-gray-800 dark:text-gray-100 capitalize">
                  {alternative.name}
                </h4>
                <Badge variant="outline" className="text-xs border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-300">
                  {alternative.category}
                </Badge>
              </div>
              {alternative.price && (
                <div className="flex items-center space-x-1 mt-1">
                  <DollarSign className="h-3 w-3 text-green-500" />
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                    ${alternative.price.toFixed(2)}
                  </span>
                  {alternative.brand && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      • {alternative.brand}
                    </span>
                  )}
                </div>
              )}
            </div>
            <Button
              size="sm"
              onClick={() => onAddAlternative(alternative)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};