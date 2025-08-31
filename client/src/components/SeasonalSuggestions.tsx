import React from 'react';
import { Leaf, Tag, Plus, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProductSuggestion } from '../types/shopping';
import { cn } from '../lib/utils';

interface SeasonalSuggestionsProps {
  seasonalItems: ProductSuggestion[];
  saleItems: ProductSuggestion[];
  onAddItem: (item: ProductSuggestion) => void;
  isLoading?: boolean;
  className?: string;
}

export const SeasonalSuggestions: React.FC<SeasonalSuggestionsProps> = ({
  seasonalItems,
  saleItems,
  onAddItem,
  isLoading = false,
  className
}) => {
  if (isLoading) {
    return (
      <Card className={cn("bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700", className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-gray-100">
            <Leaf className="h-5 w-5" />
            <span>Seasonal & Sale Items</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (seasonalItems.length === 0 && saleItems.length === 0) {
    return null;
  }

  const renderItemList = (items: ProductSuggestion[], type: 'seasonal' | 'sale') => (
    <div className="space-y-3">
      {items.map(item => (
        <div
          key={item._id}
          className={cn(
            "flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:shadow-md",
            type === 'seasonal' 
              ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700"
              : "bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-700"
          )}
        >
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-gray-800 dark:text-gray-100 capitalize">
                {item.name}
              </h4>
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-xs",
                  type === 'seasonal'
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                )}
              >
                {item.category}
              </Badge>
              {type === 'seasonal' && (
                <Badge className="text-xs bg-green-600 text-white">
                  In Season
                </Badge>
              )}
              {type === 'sale' && (
                <Badge className="text-xs bg-red-600 text-white">
                  On Sale
                </Badge>
              )}
            </div>
            {item.price && (
              <div className="flex items-center space-x-1 mt-1">
                <DollarSign className="h-3 w-3 text-green-500" />
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  ${item.price.toFixed(2)}
                </span>
                {item.brand && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    • {item.brand}
                  </span>
                )}
              </div>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => onAddItem(item)}
            className={cn(
              "shadow-sm text-white",
              type === 'seasonal'
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                : "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500"
            )}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <Card className={cn("bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-gray-100">
          <Leaf className="h-5 w-5 text-green-500" />
          <span>Seasonal & Sale Items</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="seasonal" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="seasonal" className="flex items-center space-x-2">
              <Leaf className="h-4 w-4" />
              <span>Seasonal ({seasonalItems.length})</span>
            </TabsTrigger>
            <TabsTrigger value="sale" className="flex items-center space-x-2">
              <Tag className="h-4 w-4" />
              <span>On Sale ({saleItems.length})</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="seasonal" className="mt-4">
            {seasonalItems.length > 0 ? (
              renderItemList(seasonalItems, 'seasonal')
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No seasonal items available
              </p>
            )}
          </TabsContent>
          <TabsContent value="sale" className="mt-4">
            {saleItems.length > 0 ? (
              renderItemList(saleItems, 'sale')
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No sale items available
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};