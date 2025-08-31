import React from 'react';
import { Lightbulb, Plus, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ProductSuggestion } from '../types/shopping';
import { cn } from '../lib/utils';

interface ProductSuggestionsProps {
  suggestions: ProductSuggestion[];
  onAddSuggestion: (suggestion: ProductSuggestion) => void;
  isLoading?: boolean;
  className?: string;
}

export const ProductSuggestions: React.FC<ProductSuggestionsProps> = ({
  suggestions,
  onAddSuggestion,
  isLoading = false,
  className
}) => {
  if (isLoading) {
    return (
      <Card className={cn("bg-gray-900/80 backdrop-blur-sm border border-gray-700", className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-100">
            <Lightbulb className="h-5 w-5" />
            <span>Smart Suggestions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Card className={cn("bg-gray-900/80 backdrop-blur-sm border border-gray-700 shadow-lg", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-100">
          <Lightbulb className="h-5 w-5 text-yellow-400" />
          <span>Smart Suggestions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map(suggestion => (
          <div
            key={suggestion._id}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-700/50 hover:shadow-md transition-all duration-200"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-gray-100 capitalize">
                  {suggestion.name}
                </h4>
                <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                  {suggestion.category}
                </Badge>
              </div>
              {suggestion.price && (
                <div className="flex items-center space-x-1 mt-1">
                  <DollarSign className="h-3 w-3 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">
                    ${suggestion.price.toFixed(2)}
                  </span>
                  {suggestion.brand && (
                    <span className="text-xs text-gray-400">
                      • {suggestion.brand}
                    </span>
                  )}
                </div>
              )}
            </div>
            <Button
              size="sm"
              onClick={() => onAddSuggestion(suggestion)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};