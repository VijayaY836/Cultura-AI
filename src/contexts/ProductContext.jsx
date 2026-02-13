import { createContext, useContext, useState, useEffect } from 'react';
import { handloomProducts as initialProducts } from '../data/shopData';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // Load products from localStorage or use initial products
  const getInitialProducts = () => {
    const savedProducts = localStorage.getItem('cultura-all-products');
    if (savedProducts) {
      return JSON.parse(savedProducts);
    }
    
    // Start with initial products - no demo seller products with placeholder images
    return [...initialProducts];
  };

  const [products, setProducts] = useState(getInitialProducts);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('cultura-all-products', JSON.stringify(products));
  }, [products]);

  // Add a new product (from seller)
  const addProduct = (newProduct) => {
    setProducts(prev => {
      const updated = [...prev, newProduct];
      // Also update seller-products for backward compatibility
      localStorage.setItem('seller-products', JSON.stringify(updated.filter(p => p.id >= 1000))); // Seller products have ID >= 1000
      return updated;
    });
  };

  // Update a product
  const updateProduct = (productId, updates) => {
    setProducts(prev => {
      const updated = prev.map(product => 
        product.id === productId 
          ? { ...product, ...updates }
          : product
      );
      
      // Update seller-products if it's a seller product
      if (productId >= 1000) {
        const sellerProducts = updated.filter(p => p.id >= 1000);
        localStorage.setItem('seller-products', JSON.stringify(sellerProducts));
      }
      
      return updated;
    });
  };

  // Delete a product
  const deleteProduct = (productId) => {
    setProducts(prev => {
      const updated = prev.filter(product => product.id !== productId);
      
      // Update seller-products if it's a seller product
      if (productId >= 1000) {
        const sellerProducts = updated.filter(p => p.id >= 1000);
        localStorage.setItem('seller-products', JSON.stringify(sellerProducts));
      }
      
      return updated;
    });
  };

  // Process order and update sold counts
  const processOrder = (orderItems) => {
    orderItems.forEach(item => {
      updateProduct(item.id, {
        sold: (products.find(p => p.id === item.id)?.sold || 0) + item.quantity,
        stock: Math.max(0, (products.find(p => p.id === item.id)?.stock || 0) - item.quantity)
      });
    });
  };

  // Get products by seller (for seller dashboard)
  const getSellerProducts = () => {
    return products.filter(product => product.id >= 1000); // Seller products have ID >= 1000
  };

  // Get all products (for customer shop)
  const getAllProducts = () => {
    return products;
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    processOrder,
    getSellerProducts,
    getAllProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};