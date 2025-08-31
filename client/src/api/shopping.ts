import api from './api';
import { ShoppingItem, ShoppingList, ProductSuggestion } from '../types/shopping';

// Description: Get current shopping list
// Endpoint: GET /api/shopping/list
// Request: {}
// Response: { items: ShoppingItem[] }
export const getShoppingList = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: [
          {
            _id: '1',
            name: 'Milk',
            quantity: 2,
            category: 'Dairy',
            addedAt: new Date(),
            completed: false
          },
          {
            _id: '2',
            name: 'Apples',
            quantity: 6,
            category: 'Produce',
            addedAt: new Date(),
            completed: false
          },
          {
            _id: '3',
            name: 'Bread',
            quantity: 1,
            category: 'Bakery',
            addedAt: new Date(),
            completed: false
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/shopping/list');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Add item to shopping list
// Endpoint: POST /api/shopping/add
// Request: { name: string, quantity: number, category?: string }
// Response: { success: boolean, item: ShoppingItem }
export const addShoppingItem = (data: { name: string; quantity: number; category?: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        item: {
          _id: Date.now().toString(),
          name: data.name,
          quantity: data.quantity,
          category: data.category || 'Other',
          addedAt: new Date(),
          completed: false
        }
      });
    }, 300);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/shopping/add', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Remove item from shopping list
// Endpoint: DELETE /api/shopping/remove/:id
// Request: { id: string }
// Response: { success: boolean }
export const removeShoppingItem = (id: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 300);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.delete(`/api/shopping/remove/${id}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Search for products
// Endpoint: GET /api/shopping/search
// Request: { query: string, filters?: object }
// Response: { products: ProductSuggestion[] }
export const searchProducts = (query: string, filters?: any) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        products: [
          {
            _id: '1',
            name: 'Organic Apples',
            category: 'Produce',
            price: 2.99,
            brand: 'Fresh Farm'
          },
          {
            _id: '2',
            name: 'Gala Apples',
            category: 'Produce',
            price: 1.99,
            brand: 'Local Harvest'
          },
          {
            _id: '3',
            name: 'Honeycrisp Apples',
            category: 'Produce',
            price: 3.49,
            brand: 'Premium Select'
          }
        ]
      });
    }, 800);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/shopping/search', { params: { query, ...filters } });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get product suggestions based on current list
// Endpoint: GET /api/shopping/suggestions
// Request: {}
// Response: { suggestions: ProductSuggestion[] }
export const getProductSuggestions = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        suggestions: [
          {
            _id: '1',
            name: 'Butter',
            category: 'Dairy',
            price: 3.99
          },
          {
            _id: '2',
            name: 'Cheese',
            category: 'Dairy',
            price: 4.49
          },
          {
            _id: '3',
            name: 'Bananas',
            category: 'Produce',
            price: 1.29
          }
        ]
      });
    }, 600);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/shopping/suggestions');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Save shopping list with name
// Endpoint: POST /api/shopping/save
// Request: { name: string, items: ShoppingItem[] }
// Response: { success: boolean, list: ShoppingList }
export const saveShoppingList = (data: { name: string; items: ShoppingItem[] }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        list: {
          _id: Date.now().toString(),
          name: data.name,
          items: data.items,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/shopping/save', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get saved shopping lists
// Endpoint: GET /api/shopping/saved
// Request: {}
// Response: { lists: ShoppingList[] }
export const getSavedLists = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        lists: [
          {
            _id: '1',
            name: 'Weekly Groceries',
            items: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            _id: '2',
            name: 'Party Supplies',
            items: [],
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
      });
    }, 400);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/shopping/saved');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Add new API function for seasonal suggestions
// Description: Get seasonal and sale items
// Endpoint: GET /api/shopping/seasonal
// Request: {}
// Response: { seasonalItems: ProductSuggestion[], saleItems: ProductSuggestion[] }
export const getSeasonalAndSaleItems = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        seasonalItems: [
          {
            _id: 'seasonal1',
            name: 'Pumpkins',
            category: 'Produce',
            price: 2.49,
            brand: 'Farm Fresh'
          },
          {
            _id: 'seasonal2',
            name: 'Butternut Squash',
            category: 'Produce',
            price: 1.99,
            brand: 'Organic Valley'
          },
          {
            _id: 'seasonal3',
            name: 'Apple Cider',
            category: 'Beverages',
            price: 3.99,
            brand: 'Local Orchard'
          }
        ],
        saleItems: [
          {
            _id: 'sale1',
            name: 'Pasta',
            category: 'Pantry',
            price: 0.99,
            brand: 'Barilla'
          },
          {
            _id: 'sale2',
            name: 'Chicken Breast',
            category: 'Meat',
            price: 4.99,
            brand: 'Fresh Farm'
          },
          {
            _id: 'sale3',
            name: 'Greek Yogurt',
            category: 'Dairy',
            price: 1.49,
            brand: 'Chobani'
          }
        ]
      });
    }, 600);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/shopping/seasonal');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get product alternatives
// Endpoint: GET /api/shopping/alternatives/:productName
// Request: { productName: string }
// Response: { alternatives: ProductSuggestion[] }
export const getProductAlternatives = (productName: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      const alternativesMap: { [key: string]: ProductSuggestion[] } = {
        'milk': [
          {
            _id: 'alt1',
            name: 'Almond Milk',
            category: 'Dairy',
            price: 3.49,
            brand: 'Blue Diamond'
          },
          {
            _id: 'alt2',
            name: 'Oat Milk',
            category: 'Dairy',
            price: 4.99,
            brand: 'Oatly'
          },
          {
            _id: 'alt3',
            name: 'Soy Milk',
            category: 'Dairy',
            price: 2.99,
            brand: 'Silk'
          }
        ],
        'bread': [
          {
            _id: 'alt4',
            name: 'Gluten-Free Bread',
            category: 'Bakery',
            price: 4.99,
            brand: 'Udi\'s'
          },
          {
            _id: 'alt5',
            name: 'Whole Wheat Bread',
            category: 'Bakery',
            price: 2.49,
            brand: 'Dave\'s Killer'
          }
        ]
      };

      const alternatives = alternativesMap[productName.toLowerCase()] || [];
      resolve({ alternatives });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get(`/api/shopping/alternatives/${productName}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Update item quantity
// Endpoint: PUT /api/shopping/update-quantity
// Request: { id: string, quantity: number }
// Response: { success: boolean, item: ShoppingItem }
export const updateItemQuantity = (id: string, quantity: number) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        item: {
          _id: id,
          name: 'Updated Item',
          quantity: quantity,
          category: 'Other',
          addedAt: new Date(),
          completed: false
        }
      });
    }, 300);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.put('/api/shopping/update-quantity', { id, quantity });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};