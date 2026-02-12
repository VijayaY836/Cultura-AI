import { useState } from 'react';
import { Heart, Sparkles, BookOpen, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { analyzeSentiment, getEmotionDescription, getAaitaResponse } from '../services/sentimentAnalysis';
import { getStoryByEmotion } from '../data/aaitaStories';
import { useToast } from '../contexts/ToastContext';
import { LoadingSpinner } from './LoadingComponents';

export default function MoushumiAaita() {
  const [userInput, setUserInput] = useState('');
  const [currentStory, setCurrentStory] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const { showSuccess } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI processing time for effect
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Analyze sentiment
    const analysis = analyzeSentiment(userInput);
    setSentiment(analysis);

    // Get matching story
    const story = getStoryByEmotion(analysis.primaryEmotion, analysis.context);
    setCurrentStory(story);

    setIsAnalyzing(false);
    setShowStory(true);
  };

  const handleReset = () => {
    setUserInput('');
    setCurrentStory(null);
    setSentiment(null);
    setShowStory(false);
  };

  const handleShare = () => {
    if (currentStory) {
      showSuccess('Story link copied to clipboard!');
      // In a real app, this would copy a shareable link
    }
  };

  const handleSave = () => {
    if (currentStory) {
      showSuccess('Story saved to your favorites!');
      // In a real app, this would save to user's favorites
    }
  };

  if (showStory && currentStory) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4 mb-6">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Ask Aaita Another Question
          </button>
        </div>

        {/* Story Display */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
          {/* Story Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/Aaita.png" 
                  alt="Moushumi Aaita" 
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-6xl hidden">{currentStory.illustration}</div>
                <div>
                  <div className="text-sm opacity-90 mb-1">A Story from {currentStory.region}</div>
                  <h1 className="text-3xl font-bold">{currentStory.title}</h1>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <Sparkles size={16} />
                <span>Chosen for you because you're {getEmotionDescription(sentiment.primaryEmotion)}</span>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="p-8">
            {/* Aaita's Introduction */}
            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-6 mb-6 border-2 border-purple-200 shadow-lg">
              <div className="flex items-start gap-4">
                <img 
                  src="/Aaita.png" 
                  alt="Moushumi Aaita" 
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-5xl hidden">👵</div>
                <div className="flex-1">
                  <div className="font-semibold text-purple-800 mb-2">Moushumi Aaita says:</div>
                  <p className="text-gray-700 italic leading-relaxed">
                    "{getAaitaResponse(sentiment.primaryEmotion)}"
                  </p>
                </div>
              </div>
            </div>

            {/* The Story */}
            <div className="bg-white rounded-2xl p-8 mb-6 shadow-lg border border-purple-100">
              <div className="prose prose-lg max-w-none">
                {currentStory.story.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4 text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Wisdom Card */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-6 border-2 border-amber-200 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💝</div>
                <div className="flex-1">
                  <div className="font-bold text-amber-900 mb-3 text-lg">Aaita's Wisdom</div>
                  <p className="text-amber-800 leading-relaxed mb-4 italic text-lg">
                    "{currentStory.wisdom}"
                  </p>
                  <div className="bg-white/60 rounded-xl p-4 border border-amber-200">
                    <div className="text-sm font-semibold text-amber-900 mb-2">Remember, child:</div>
                    <p className="text-amber-800 text-sm">{currentStory.moral}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-lg"
              >
                <Bookmark size={20} />
                Save Story
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors shadow-lg"
              >
                <Share2 size={20} />
                Share Story
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-xl hover:bg-purple-50 transition-colors"
              >
                <BookOpen size={20} />
                Hear Another Story
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-12">
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <img 
                src="/Aaita.png" 
                alt="Moushumi Aaita thinking" 
                className="w-32 h-32 rounded-full object-cover mx-auto animate-pulse"
                style={{
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  boxShadow: '0 0 0 0 rgba(168, 85, 247, 0.7)'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-purple-400"></div>
              <div className="text-8xl hidden">👵</div>
            </div>
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              Aaita is thinking...
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              "Hmm... let me find the perfect story for you, child..."
            </p>
            
            <div className="flex justify-center mb-6">
              <LoadingSpinner size="lg" color="purple" />
            </div>

            <div className="space-y-3 max-w-md mx-auto">
              <div className="flex items-center gap-3 text-purple-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Analyzing your emotions and context...</span>
              </div>
              <div className="flex items-center gap-3 text-purple-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <span className="text-sm">Searching through ancient tales...</span>
              </div>
              <div className="flex items-center gap-3 text-purple-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                <span className="text-sm">Finding the perfect story for you...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 mb-8 text-center">
        <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-1 mb-6">
          <div className="bg-white rounded-full p-2">
            <img 
              src="/Aaita.png" 
              alt="Moushumi Aaita" 
              className="w-24 h-24 rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="text-7xl hidden">👵</div>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Moushumi Aaita's Corner
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Welcome, child. I am Moushumi Aaita, your grandmother from the Northeast. 
          Share what's in your heart, and I'll tell you a story that might help guide you.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 md:p-12">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl pointer-events-none opacity-10">
          <div className="absolute top-10 left-10 text-6xl">🌸</div>
          <div className="absolute top-20 right-20 text-5xl">✨</div>
          <div className="absolute bottom-10 left-20 text-5xl">🦋</div>
          <div className="absolute bottom-20 right-10 text-6xl">🌺</div>
        </div>

        <div className="relative z-10">
          {/* Aaita's Greeting */}
          <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-6 mb-8 border-2 border-purple-200 shadow-lg">
            <div className="flex items-start gap-4">
              <img 
                src="/Aaita.png" 
                alt="Moushumi Aaita" 
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="text-5xl hidden">👵</div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed text-lg italic">
                  "Come, sit with me, child. Tell me what's on your mind today. 
                  Are you happy? Worried? Confused? Whatever you're feeling, 
                  I have a story from our beautiful Northeast that might help..."
                </p>
              </div>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-purple-800 mb-3">
                Share your heart with Aaita:
              </label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Tell me how you're feeling today... Are you happy, sad, worried, excited? Share anything that's on your mind..."
                className="w-full px-6 py-4 border-2 border-purple-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all resize-none text-lg bg-white/80 backdrop-blur-sm"
                rows="6"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!userInput.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <Sparkles size={24} />
              Let Aaita Guide You
              <Heart size={24} />
            </button>
          </form>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
              <div className="text-3xl mb-2">🎭</div>
              <div className="text-sm font-semibold text-purple-800 mb-1">AI-Powered Analysis</div>
              <div className="text-xs text-gray-600">Sentiment detection for 5 emotions: bedtime, fear, joy, confusion, and anger</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-sm font-semibold text-purple-800 mb-1">Traditional Tales</div>
              <div className="text-xs text-gray-600">Authentic Northeast Indian folklore with deep wisdom and moral lessons</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
              <div className="text-3xl mb-2">💝</div>
              <div className="text-sm font-semibold text-purple-800 mb-1">Personalized Guidance</div>
              <div className="text-xs text-gray-600">Stories matched to your emotions and life context for meaningful support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
