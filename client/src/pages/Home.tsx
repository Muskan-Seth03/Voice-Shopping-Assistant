import React, { useState, useEffect, useCallback } from 'react';
import { toast } from '../hooks/useToast';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { VoiceMicrophone } from '../components/VoiceMicrophone';
import { VoiceTranscript } from '../components/VoiceTranscript';
import { ShoppingList } from '../components/ShoppingList';
import { ProductSuggestions } from '../components/ProductSuggestions';
import { SearchResults } from '../components/SearchResults';
import { VoiceCommandFeedback } from '../components/VoiceCommandFeedback';
import { SeasonalSuggestions } from '../components/SeasonalSuggestions';
import { ProductAlternatives } from '../components/ProductAlternatives';
import { ShoppingItem, ProductSuggestion } from '../types/shopping';
import { parseVoiceCommand, getCategoryFromItem } from '../utils/voiceCommandParser';
import {
  getShoppingList,
  addShoppingItem,
  removeShoppingItem,
  searchProducts,
  getProductSuggestions,
  getSeasonalAndSaleItems,
  getProductAlternatives,
  updateItemQuantity
} from '../api/shopping';

export function Home() {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [searchResults, setSearchResults] = useState<ProductSuggestion[]>([]);
  const [seasonalItems, setSeasonalItems] = useState<ProductSuggestion[]>([]);
  const [saleItems, setSaleItems] = useState<ProductSuggestion[]>([]);
  const [alternatives, setAlternatives] = useState<ProductSuggestion[]>([]);
  const [alternativesFor, setAlternativesFor] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingSeasonal, setIsLoadingSeasonal] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
  }>({ message: '', type: 'info', visible: false });

  const { speak } = useTextToSpeech();

  const showFeedback = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    console.log('Showing feedback:', message, type);
    setFeedback({ message, type, visible: true });
    speak(message);
  }, [speak]);

  const hideFeedback = useCallback(() => {
    setFeedback(prev => ({ ...prev, visible: false }));
  }, []);

  const handleVoiceResult = useCallback(async (transcript: string, confidence: number) => {
    console.log('Voice result received:', transcript, confidence);

    const command = parseVoiceCommand(transcript, confidence);

    if (!command) {
      showFeedback("I didn't understand that command. Try saying 'add milk' or 'remove bread'", 'error');
      return;
    }

    console.log('Parsed command:', command);

    try {
      switch (command.command) {
        case 'add':
          if (command.item) {
            const category = getCategoryFromItem(command.item);
            const response = await addShoppingItem({
              name: command.item,
              quantity: command.quantity || 1,
              category
            }) as any;

            setShoppingItems(prev => [...prev, response.item]);
            showFeedback(`Added ${command.quantity || 1} ${command.item} to your list`, 'success');
            
            // Load alternatives for common items
            if (['milk', 'bread', 'butter', 'cheese'].includes(command.item.toLowerCase())) {
              const altResponse = await getProductAlternatives(command.item) as any;
              if (altResponse.alternatives.length > 0) {
                setAlternatives(altResponse.alternatives);
                setAlternativesFor(command.item);
                showFeedback(`Would you like to see alternatives for ${command.item}?`, 'info');
              }
            }
            
            loadSuggestions();
          }
          break;

        case 'remove':
          if (command.item) {
            const itemToRemove = shoppingItems.find(item =>
              item.name.toLowerCase().includes(command.item!.toLowerCase())
            );

            if (itemToRemove) {
              await removeShoppingItem(itemToRemove._id);
              setShoppingItems(prev => prev.filter(item => item._id !== itemToRemove._id));
              showFeedback(`Removed ${itemToRemove.name} from your list`, 'success');
            } else {
              showFeedback(`${command.item} not found in your list`, 'error');
            }
          }
          break;

        case 'search':
          if (command.item) {
            setIsLoadingSearch(true);
            setSearchQuery(command.item);
            const response = await searchProducts(command.item) as any;
            setSearchResults(response.products);
            showFeedback(`Found ${response.products.length} results for ${command.item}`, 'info');
            setIsLoadingSearch(false);
          }
          break;

        case 'alternatives':
          if (command.item) {
            const response = await getProductAlternatives(command.item) as any;
            setAlternatives(response.alternatives);
            setAlternativesFor(command.item);
            showFeedback(`Found ${response.alternatives.length} alternatives for ${command.item}`, 'info');
          }
          break;

        case 'clear':
          setShoppingItems([]);
          showFeedback('Shopping list cleared', 'success');
          break;

        default:
          showFeedback("Command not recognized", 'error');
      }
    } catch (error) {
      console.error('Error processing voice command:', error);
      showFeedback('Sorry, there was an error processing your command', 'error');
      setIsLoadingSearch(false);
    }
  }, [shoppingItems, showFeedback]);

  const handleVoiceError = useCallback((error: string) => {
    console.error('Voice recognition error:', error);
    showFeedback('Voice recognition error. Please try again.', 'error');
  }, [showFeedback]);

  const {
    isListening,
    isProcessing,
    transcript,
    confidence,
    isSupported,
    toggleListening
  } = useVoiceRecognition({
    onResult: handleVoiceResult,
    onError: handleVoiceError,
    continuous: false
  });

  const loadShoppingList = useCallback(async () => {
    try {
      console.log('Loading shopping list');
      const response = await getShoppingList() as any;
      setShoppingItems(response.items);
    } catch (error) {
      console.error('Error loading shopping list:', error);
      toast({
        title: "Error",
        description: "Failed to load shopping list",
        variant: "destructive",
      });
    }
  }, []);

  const loadSuggestions = useCallback(async () => {
    try {
      setIsLoadingSuggestions(true);
      console.log('Loading product suggestions');
      const response = await getProductSuggestions() as any;
      setSuggestions(response.suggestions);
    } catch (error) {
      console.error('Error loading suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, []);

  const loadSeasonalAndSale = useCallback(async () => {
    try {
      setIsLoadingSeasonal(true);
      console.log('Loading seasonal and sale items');
      const response = await getSeasonalAndSaleItems() as any;
      setSeasonalItems(response.seasonalItems);
      setSaleItems(response.saleItems);
    } catch (error) {
      console.error('Error loading seasonal and sale items:', error);
    } finally {
      setIsLoadingSeasonal(false);
    }
  }, []);

  const handleRemoveItem = useCallback(async (id: string) => {
    try {
      console.log('Removing item:', id);
      await removeShoppingItem(id);
      setShoppingItems(prev => prev.filter(item => item._id !== id));
      toast({
        title: "Success",
        description: "Item removed from list",
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  }, []);

  const handleUpdateQuantity = useCallback(async (id: string, quantity: number) => {
    try {
      console.log('Updating quantity:', id, quantity);
      await updateItemQuantity(id, quantity);
      setShoppingItems(prev => prev.map(item => 
        item._id === id ? { ...item, quantity } : item
      ));
      toast({
        title: "Success",
        description: "Quantity updated",
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  }, []);

  const handleAddSuggestion = useCallback(async (suggestion: ProductSuggestion) => {
    try {
      console.log('Adding suggestion:', suggestion);
      const response = await addShoppingItem({
        name: suggestion.name,
        quantity: 1,
        category: suggestion.category
      }) as any;

      setShoppingItems(prev => [...prev, response.item]);
      toast({
        title: "Success",
        description: `Added ${suggestion.name} to your list`,
      });
    } catch (error) {
      console.error('Error adding suggestion:', error);
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
      });
    }
  }, []);

  const handleAddSearchResult = useCallback(async (product: ProductSuggestion) => {
    try {
      console.log('Adding search result:', product);
      const response = await addShoppingItem({
        name: product.name,
        quantity: 1,
        category: product.category
      }) as any;

      setShoppingItems(prev => [...prev, response.item]);
      toast({
        title: "Success",
        description: `Added ${product.name} to your list`,
      });
    } catch (error) {
      console.error('Error adding search result:', error);
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
      });
    }
  }, []);

  const handleAddAlternative = useCallback(async (alternative: ProductSuggestion) => {
    try {
      console.log('Adding alternative:', alternative);
      const response = await addShoppingItem({
        name: alternative.name,
        quantity: 1,
        category: alternative.category
      }) as any;

      setShoppingItems(prev => [...prev, response.item]);
      setAlternatives([]);
      setAlternativesFor('');
      toast({
        title: "Success",
        description: `Added ${alternative.name} to your list`,
      });
    } catch (error) {
      console.error('Error adding alternative:', error);
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
      });
    }
  }, []);

  const handleCloseAlternatives = useCallback(() => {
    setAlternatives([]);
    setAlternativesFor('');
  }, []);

  useEffect(() => {
    loadShoppingList();
    loadSuggestions();
    loadSeasonalAndSale();
  }, [loadShoppingList, loadSuggestions, loadSeasonalAndSale]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden py-8">
      {/* Gradient spotlight effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 dark:from-blue-800/20 dark:to-purple-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/20 to-pink-200/20 dark:from-purple-800/15 dark:to-pink-800/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-200/15 to-blue-200/15 dark:from-cyan-800/10 dark:to-blue-800/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Voice Shopping Assistant
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Build your shopping list with natural voice commands. Just speak and we'll understand!
          </p>
        </div>

        {/* Voice Command Feedback */}
        <div className="flex justify-center">
          <VoiceCommandFeedback
            message={feedback.message}
            type={feedback.type}
            isVisible={feedback.visible}
            onHide={hideFeedback}
            className="max-w-md"
          />
        </div>

        {/* Voice Interface */}
        <div className="flex flex-col items-center space-y-6">
          <VoiceMicrophone
            isListening={isListening}
            isProcessing={isProcessing}
            isSupported={isSupported}
            onToggle={toggleListening}
          />

          <VoiceTranscript
            transcript={transcript}
            confidence={confidence}
            isVisible={isListening || isProcessing}
            className="max-w-md"
          />
        </div>

        {/* Product Alternatives */}
        {alternatives.length > 0 && (
          <div className="flex justify-center">
            <ProductAlternatives
              alternatives={alternatives}
              originalProduct={alternativesFor}
              onAddAlternative={handleAddAlternative}
              onClose={handleCloseAlternatives}
              className="max-w-2xl w-full"
            />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shopping List */}
          <div className="lg:col-span-2">
            <ShoppingList
              items={shoppingItems}
              onRemoveItem={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </div>

          {/* Suggestions */}
          <div className="space-y-6">
            <ProductSuggestions
              suggestions={suggestions}
              onAddSuggestion={handleAddSuggestion}
              isLoading={isLoadingSuggestions}
            />
            
            <SeasonalSuggestions
              seasonalItems={seasonalItems}
              saleItems={saleItems}
              onAddItem={handleAddSuggestion}
              isLoading={isLoadingSeasonal}
            />
          </div>
        </div>

        {/* Search Results */}
        {(searchResults.length > 0 || isLoadingSearch) && (
          <SearchResults
            results={searchResults}
            query={searchQuery}
            onAddProduct={handleAddSearchResult}
            isLoading={isLoadingSearch}
          />
        )}

        {/* Voice Commands Help */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Voice Commands</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Adding Items</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>"Add milk"</li>
                <li>"I need 2 apples"</li>
                <li>"Add five bananas"</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Removing Items</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>"Remove milk"</li>
                <li>"Delete bread"</li>
                <li>"Remove apples from my list"</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Searching</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>"Find organic apples"</li>
                <li>"Search for pasta"</li>
                <li>"Clear my list"</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Alternatives</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>"Show alternatives for milk"</li>
                <li>"Find alternatives for bread"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}