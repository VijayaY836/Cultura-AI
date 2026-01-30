import { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Info, ExternalLink } from 'lucide-react';
import { getRandomFunFact, getFunFactCategories } from '../services/funFacts';

export default function FunFactsSection() {
  const [currentFact, setCurrentFact] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [categories] = useState(getFunFactCategories());

  // Load initial fact
  useEffect(() => {
    setCurrentFact(getRandomFunFact());
  }, []);

  const generateNewFact = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentFact(getRandomFunFact());
      setIsAnimating(false);
    }, 300);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Geography': 'from-blue-500 to-cyan-500',
      'Culture': 'from-purple-500 to-pink-500',
      'Wildlife': 'from-green-500 to-emerald-500',
      'Environment': 'from-teal-500 to-green-500',
      'Crafts': 'from-orange-500 to-red-500',
      'Sports': 'from-indigo-500 to-purple-500',
      'Economy': 'from-yellow-500 to-orange-500',
      'Religion': 'from-rose-500 to-pink-500'
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  if (!currentFact) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
      {/* Header - matching Platform Statistics style */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Fun Facts About Northeast India</h3>
        <p className="text-gray-600">Discover fascinating insights about the region</p>
      </div>

      {/* Fun Fact Card - More Compact */}
      <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
        <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl p-4 border border-indigo-100 mb-6">
          {/* Category Badge and Button */}
          <div className="flex items-center justify-between mb-3">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getCategoryColor(currentFact.category)} shadow-md`}>
              <span className="text-base">{currentFact.icon}</span>
              {currentFact.category}
            </span>
            
            <button
              onClick={generateNewFact}
              disabled={isAnimating}
              className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <RefreshCw 
                className={`${isAnimating ? 'animate-spin' : ''} transition-transform`} 
                size={14} 
              />
              <span className="font-medium">New</span>
            </button>
          </div>

          {/* Fact Text - More Compact */}
          <div className="mb-3">
            <p className="text-base text-gray-800 leading-relaxed font-medium">
              {currentFact.fact}
            </p>
          </div>

          {/* Source - Smaller */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Info size={10} />
            <span>Source: {currentFact.source}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid - matching Platform Statistics layout but more compact */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Amazing Facts", value: "25", suffix: "+", color: "from-blue-500 to-indigo-500" },
          { label: "States Covered", value: "8", suffix: "", color: "from-emerald-500 to-teal-500" },
          { label: "Categories", value: "6", suffix: "+", color: "from-purple-500 to-pink-500" },
          { label: "Fun Discoveries", value: "100", suffix: "+", color: "from-orange-500 to-red-500" }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
              {stat.value}{stat.suffix}
            </div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}