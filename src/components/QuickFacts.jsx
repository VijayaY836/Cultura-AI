import { useState, useEffect } from 'react';
import { TrendingUp, Award, MapPin, Users, Calendar, Sparkles } from 'lucide-react';

export default function QuickFacts({ entities }) {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // Calculate interesting statistics
  const stats = {
    totalEntities: entities.length,
    touristSites: entities.filter(e => e.type === 'tourist-site').length,
    historicalFigures: entities.filter(e => e.type === 'historical-figure').length,
    festivals: entities.filter(e => e.type === 'festival').length,
    uniqueStates: [...new Set(entities.map(e => e.state))].length,
    uniqueCommunities: [...new Set(entities.flatMap(e => e.communities))].length,
    freedomFighters: entities.filter(e => 
      e.type === 'historical-figure' && 
      e.description.toLowerCase().includes('freedom fighter')
    ).length,
    unescoSites: entities.filter(e => 
      e.description.toLowerCase().includes('unesco') || 
      e.description.toLowerCase().includes('world heritage')
    ).length
  };

  // Interesting facts array
  const facts = [
    {
      icon: '🦏',
      title: 'Wildlife Wonder',
      fact: `Kaziranga National Park is home to 2/3rd of the world's one-horned rhinoceros population`,
      highlight: '2,413 rhinos',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '⚔️',
      title: 'Historic Victory',
      fact: `The Battle of Saraighat (1671) is studied in military academies worldwide for its naval strategy`,
      highlight: 'Military Genius',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: '🌧️',
      title: 'Rainfall Record',
      fact: `Cherrapunji holds the world record for highest annual rainfall - 26,461mm in 1861`,
      highlight: 'Wettest Place',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🌉',
      title: 'Living Engineering',
      fact: `Living Root Bridges in Meghalaya can take 15-20 years to grow and last for centuries`,
      highlight: 'Bio-engineering',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: '🏔️',
      title: 'Spiritual Heights',
      fact: `Tawang Monastery at 10,000 feet is the birthplace of the 6th Dalai Lama`,
      highlight: 'Highest Monastery',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: '🥊',
      title: 'Boxing Champion',
      fact: `Mary Kom is the only woman boxer to win a medal in each of the first 7 World Championships`,
      highlight: '6x World Champion',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: '🏛️',
      title: 'Ancient Art',
      fact: `Unakoti rock sculptures date back to 7th-9th century with 99,99,999 carvings`,
      highlight: 'One Less Than Crore',
      color: 'from-amber-500 to-yellow-500'
    },
    {
      icon: '🎭',
      title: 'Cultural Diversity',
      fact: `Northeast India has 200+ tribal communities speaking 100+ languages`,
      highlight: 'Cultural Mosaic',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  // Auto-rotate facts every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % facts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [facts.length]);

  const currentFact = facts[currentFactIndex];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Quick Facts & Highlights</h3>
            <p className="text-sm text-gray-600">Fascinating insights about Northeast India</p>
          </div>
        </div>
        
        <div className="flex gap-1">
          {facts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFactIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentFactIndex ? 'bg-purple-500 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Current Fact Display */}
      <div className={`bg-gradient-to-r ${currentFact.color} rounded-2xl p-6 text-white mb-6 transition-all duration-500`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{currentFact.icon}</div>
          <div>
            <h4 className="font-bold text-xl">{currentFact.title}</h4>
            <div className="text-lg font-semibold bg-white/20 px-3 py-1 rounded-full inline-block">
              {currentFact.highlight}
            </div>
          </div>
        </div>
        <p className="text-white/90 text-lg leading-relaxed">{currentFact.fact}</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">{stats.touristSites}</div>
          <div className="text-xs text-blue-600 flex items-center justify-center gap-1">
            <MapPin size={12} />
            Tourist Sites
          </div>
        </div>
        
        <div className="text-center bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
          <div className="text-2xl font-bold text-amber-700">{stats.historicalFigures}</div>
          <div className="text-xs text-amber-600 flex items-center justify-center gap-1">
            <Award size={12} />
            Historical Figures
          </div>
        </div>
        
        <div className="text-center bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
          <div className="text-2xl font-bold text-emerald-700">{stats.freedomFighters}</div>
          <div className="text-xs text-emerald-600 flex items-center justify-center gap-1">
            <TrendingUp size={12} />
            Freedom Fighters
          </div>
        </div>
        
        <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
          <div className="text-2xl font-bold text-purple-700">{stats.unescoSites}</div>
          <div className="text-xs text-purple-600 flex items-center justify-center gap-1">
            <Sparkles size={12} />
            UNESCO Sites
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-50 p-3 rounded-xl">
          <div className="text-lg font-bold text-gray-700">{stats.uniqueStates}</div>
          <div className="text-xs text-gray-600">States Covered</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-xl">
          <div className="text-lg font-bold text-gray-700">{stats.festivals}</div>
          <div className="text-xs text-gray-600">Festivals</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-xl">
          <div className="text-lg font-bold text-gray-700">{stats.uniqueCommunities}</div>
          <div className="text-xs text-gray-600">Communities</div>
        </div>
      </div>

      {/* Fun Fact Footer */}
      <div className="mt-4 text-center text-xs text-gray-500 bg-gray-50 p-3 rounded-xl">
        💡 Did you know? Northeast India is home to the world's largest river island (Majuli), 
        wettest place (Mawsynram), and most diverse cultural heritage in India!
      </div>
    </div>
  );
}