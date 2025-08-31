import React from 'react';
import { Search, Plus, DollarSign, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ProductSuggestion } from '../types/shopping';
import { cn } from '../lib/utils';

interface SearchResultsProps {
  results: ProductSuggestion[];
  query: string;
  onAddProduct: (product: ProductSuggestion) => void;
  isLoading?: boolean;
  className?: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  onAddProduct,
  isLoading = false,
  className
}) => {
  if (!query && !isLoading) {
    return null;
  }

  if (isLoading) {
    return (
      <Card className={cn("bg-gray-900/80 backdrop-blur-sm border border-gray-700", className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-100">
            <Search className="h-5 w-5" />
            <span>Searching for "{query}"...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0 && query) {
    return (
      <Card className={cn("bg-gray-900/80 backdrop-blur-sm border border-gray-700", className)}>
        <CardContent className="p-8 text-center">
          <Package className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">
            No results found for "{query}"
          </h3>
          <p className="text-gray-400">
            Try searching with different keywords
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("bg-gray-900/80 backdrop-blur-sm border border-gray-700 shadow-lg", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-100">
          <Search className="h-5 w-5 text-blue-400" />
          <span>Search Results for "{query}" ({results.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map(product => (
            <div
              key={product._id}
              className="p-4 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-lg border border-blue-700/50 hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-100 capitalize">
                    {product.name}
                  </h4>
                  <Badge variant="outline" className="mt-1 text-xs border-gray-600 text-gray-300">
                    {product.category}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  {product.price && (
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 font-medium">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  )}
                  
                  {product.brand && (
                    <p className="text-xs text-gray-400">
                      Brand: {product.brand}
                    </p>
                  )}
                </div>

                <Button
                  size="sm"
                  onClick={() => onAddProduct(product)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add to List
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};