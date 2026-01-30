import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles, Map, Globe, Search } from 'lucide-react';

// Generic loading spinner
export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <Loader2 
      className={`animate-spin text-primary-600 ${sizeClasses[size]} ${className}`} 
    />
  );
}

// Skeleton loader for text content
export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div 
            className="h-4 bg-gray-200 rounded"
            style={{ width: `${Math.random() * 40 + 60}%` }}
          />
        </div>
      ))}
    </div>
  );
}

// Skeleton loader for cards
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`card-cultural animate-pulse ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-2xl" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>
    </div>
  );
}

// Loading state for the interactive map
export function MapLoadingState() {
  return (
    <div className="h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Map className="text-white" size={32} />
        </div>
        <div className="text-lg font-display font-semibold text-gray-700 mb-2">
          Loading Interactive Map
        </div>
        <div className="text-sm text-gray-500 mb-4">
          Preparing Northeast India geographical data...
        </div>
        <LoadingSpinner size="md" />
      </div>
    </div>
  );
}

// Loading state for the knowledge graph
export function GraphLoadingState() {
  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Search className="text-white" size={32} />
        </div>
        <div className="text-lg font-display font-semibold text-gray-700 mb-2">
          Building Knowledge Graph
        </div>
        <div className="text-sm text-gray-500 mb-4">
          Analyzing cultural connections...
        </div>
        <LoadingSpinner size="md" />
      </div>
    </div>
  );
}

// Loading state for language translation
export function TranslationLoadingState() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center animate-fade-in">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
          <Globe className="text-white" size={24} />
        </div>
        <div className="text-sm font-medium text-gray-700 mb-2">
          Translating Content
        </div>
        <div className="text-xs text-gray-500 mb-3">
          Using BHASHINI API...
        </div>
        <LoadingSpinner size="sm" />
      </div>
    </div>
  );
}

// Loading state for entity details
export function EntityDetailsLoadingState() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="w-20 h-20 bg-gradient-cultural rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Sparkles className="text-white" size={36} />
        </div>
        <div className="text-lg font-display font-semibold text-gray-700 mb-2">
          Loading Cultural Details
        </div>
        <div className="text-sm text-gray-500 mb-4">
          Gathering heritage information...
        </div>
        <LoadingSpinner size="md" />
      </div>
    </div>
  );
}

// Loading state for search results
export function SearchLoadingState() {
  return (
    <div className="p-6 text-center">
      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
        <Search className="text-white" size={24} />
      </div>
      <div className="text-sm font-medium text-gray-700 mb-2">
        Searching Cultural Heritage
      </div>
      <div className="text-xs text-gray-500 mb-3">
        Exploring festivals, rituals, and traditions...
      </div>
      <LoadingSpinner size="sm" />
    </div>
  );
}

// Progressive loading component
export function ProgressiveLoader({ 
  isLoading, 
  loadingComponent, 
  children, 
  delay = 200,
  fallback = null 
}) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => setShowLoading(true), delay);
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  if (isLoading && showLoading) {
    return loadingComponent || <LoadingSpinner />;
  }

  if (isLoading && !showLoading) {
    return fallback || null;
  }

  return children;
}

// Lazy loading wrapper with suspense fallback
export function LazyWrapper({ children, fallback = <LoadingSpinner size="lg" /> }) {
  return (
    <React.Suspense fallback={
      <div className="flex items-center justify-center p-8">
        {fallback}
      </div>
    }>
      {children}
    </React.Suspense>
  );
}

// Loading overlay for full-screen operations
export function LoadingOverlay({ isVisible, message = 'Loading...', children }) {
  if (!isVisible) return children;

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl">
        <div className="text-center animate-fade-in">
          <LoadingSpinner size="lg" className="mb-4" />
          <div className="text-lg font-display font-semibold text-gray-700">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton grid for multiple items
export function SkeletonGrid({ count = 6, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

// Pulse animation for loading states
export function PulseLoader({ className = '' }) {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

// Loading state with cultural context
export function CulturalLoadingState({ 
  title = 'Loading Cultural Heritage', 
  subtitle = 'Preparing Northeast India content...',
  icon = Sparkles,
  className = '' 
}) {
  const Icon = icon;
  
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 bg-gradient-cultural rounded-full flex items-center justify-center mx-auto mb-4 shadow-cultural animate-pulse">
          <Icon className="text-white" size={32} />
        </div>
        <div className="text-lg font-display font-semibold text-gray-700 mb-2">
          {title}
        </div>
        <div className="text-sm text-gray-500 mb-4">
          {subtitle}
        </div>
        <LoadingSpinner size="md" />
      </div>
    </div>
  );
}

export default {
  LoadingSpinner,
  SkeletonText,
  SkeletonCard,
  MapLoadingState,
  GraphLoadingState,
  TranslationLoadingState,
  EntityDetailsLoadingState,
  SearchLoadingState,
  ProgressiveLoader,
  LazyWrapper,
  LoadingOverlay,
  SkeletonGrid,
  PulseLoader,
  CulturalLoadingState
};