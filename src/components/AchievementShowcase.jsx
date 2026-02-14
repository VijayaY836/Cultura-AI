import { Trophy, Target, Users, Globe, Database, Zap, ShoppingBag, BookOpen, Heart } from 'lucide-react';

export default function AchievementShowcase({ entities }) {
  const achievements = [
    {
      icon: <Database className="text-blue-600" size={24} />,
      title: "Cultural Database",
      value: `${entities.length}+`,
      description: "Cultural entities documented",
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <Globe className="text-emerald-600" size={24} />,
      title: "Complete Coverage",
      value: "8",
      description: "Northeast states included",
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200"
    },
    {
      icon: <BookOpen className="text-purple-600" size={24} />,
      title: "AI Stories",
      value: "8",
      description: "Traditional folktales with AI",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200"
    },
    {
      icon: <ShoppingBag className="text-orange-600" size={24} />,
      title: "Handloom Shop",
      value: "Live",
      description: "E-commerce for artisans",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      borderColor: "border-orange-200"
    },
    {
      icon: <Heart className="text-rose-600" size={24} />,
      title: "Emotion Detection",
      value: "5",
      description: "AI sentiment categories",
      color: "from-rose-500 to-pink-500",
      bgColor: "from-rose-50 to-pink-50",
      borderColor: "border-rose-200"
    },
    {
      icon: <Zap className="text-cyan-600" size={24} />,
      title: "AI-Powered",
      value: "Smart",
      description: "Offline chatbot & NLP",
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-50 to-blue-50",
      borderColor: "border-cyan-200"
    }
  ];

  const specialFeatures = [
    {
      emoji: "👵",
      title: "Moushumi Aaita",
      description: "AI storytelling grandmother with sentiment analysis and read-aloud"
    },
    {
      emoji: "🛍️",
      title: "Handloom Marketplace",
      description: "Full e-commerce platform supporting local artisans"
    },
    {
      emoji: "🌐",
      title: "Multi-Language Support",
      description: "6+ regional languages with BHASHINI API integration"
    },
    {
      emoji: "🔐",
      title: "Google OAuth",
      description: "Secure authentication with user profiles and roles"
    },
    {
      emoji: "🛒",
      title: "Shopping Features",
      description: "Cart, wishlist, checkout with multiple payment options"
    },
    {
      emoji: "📊",
      title: "Seller Dashboard",
      description: "Product management, inventory tracking, and analytics"
    },
    {
      emoji: "🎭",
      title: "Sentiment Analysis",
      description: "AI-powered emotion detection for personalized stories"
    },
    {
      emoji: "🔊",
      title: "Text-to-Speech",
      description: "Read aloud stories with Indian English voice"
    },
    {
      emoji: "⚡",
      title: "Real-Time Sync",
      description: "Instant product and inventory updates across platform"
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
            🏆
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Platform Statistics</h2>
            <p className="text-gray-600">CULTURA AI - Cultural Heritage Platform</p>
          </div>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${achievement.bgColor} p-4 rounded-xl border ${achievement.borderColor} text-center hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex justify-center mb-2">
              {achievement.icon}
            </div>
            <div className={`text-2xl font-bold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent mb-1`}>
              {achievement.value}
            </div>
            <div className="text-xs font-semibold text-gray-700 mb-1">
              {achievement.title}
            </div>
            <div className="text-xs text-gray-600">
              {achievement.description}
            </div>
          </div>
        ))}
      </div>

      {/* Special Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {specialFeatures.map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{feature.emoji}</span>
              <h4 className="font-semibold text-gray-800 text-sm">{feature.title}</h4>
            </div>
            <p className="text-xs text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}