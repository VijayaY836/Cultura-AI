import { useState, useRef, useEffect } from 'react';
import { Send, Loader, MapPin, Info, Sparkles, MessageCircle } from 'lucide-react';
import { getCulturalContext, generateResponse } from '../services/api';
import { getOfflineResponse, getSampleQuestions, canAnswerOffline } from '../services/offlineChatbot';

export default function ChatInterface({ onEntitySelect }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Namaste! I\'m CULTURA, your AI companion for Northeast Indian cultural heritage. I can answer questions about festivals, rituals, traditions, and cultural practices from all 8 Northeast states.\n\n🎭 Try asking me about: Bihu Festival, Lai Haraoba, Hornbill Festival, Wangala, or Chapchar Kut!',
      sources: []
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSamples, setShowSamples] = useState(true);
  const messagesEndRef = useRef(null);

  const sampleQuestions = getSampleQuestions().slice(0, 6); // Get first 6 sample questions

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Remove automatic scrolling - let users control scroll position
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setShowSamples(false); // Hide sample questions after first interaction
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      // First try offline response
      if (canAnswerOffline(userMessage)) {
        const offlineResult = getOfflineResponse(userMessage);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: offlineResult.response,
          sources: offlineResult.sources.map(source => ({ name: source, attribution: 'CULTURA Knowledge Base' })),
          isOffline: true
        }]);
      } else {
        // Try API-based response as fallback
        try {
          const context = getCulturalContext(userMessage);
          const response = await generateResponse(userMessage, context);
          
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: response,
            sources: context
          }]);
        } catch (apiError) {
          // If API fails, still try to provide a helpful offline response
          const offlineResult = getOfflineResponse(userMessage);
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: offlineResult.response,
            sources: offlineResult.sources.map(source => ({ name: source, attribution: 'CULTURA Knowledge Base' })),
            isOffline: true
          }]);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. However, I can still help you with questions about Northeast Indian culture! Try asking about specific festivals or traditions.',
        sources: [],
        isOffline: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (question) => {
    setInput(question);
    // Auto-send the sample question
    setTimeout(() => {
      const event = { target: { value: question } };
      setInput(question);
      handleSend();
    }, 100);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-t-lg flex-shrink-0">
        <h2 className="text-xl font-bold">CULTURA Chat</h2>
        <p className="text-sm opacity-90">Cultural Heritage Companion</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {/* Sample Questions */}
        {showSamples && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="text-blue-600" size={18} />
              <h3 className="font-semibold text-blue-800">Try These Sample Questions:</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {sampleQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSampleClick(question)}
                  className="text-left p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-sm"
                >
                  <MessageCircle className="inline mr-2" size={14} />
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-emerald-500 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
              {msg.role === 'assistant' && msg.isOffline && (
                <div className="flex items-center gap-2 mb-2 text-xs text-emerald-600">
                  <Sparkles size={12} />
                  <span className="font-medium">CULTURA Knowledge Base</span>
                </div>
              )}
              <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-300 space-y-2">
                  <p className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                    <Info size={12} /> Sources:
                  </p>
                  {msg.sources.map((source, i) => (
                    <div key={i} className="text-xs bg-white p-2 rounded border border-gray-200">
                      {source.name && (
                        <button
                          onClick={() => source.id && onEntitySelect(source)}
                          className={`font-semibold ${source.id ? 'text-emerald-600 hover:underline' : 'text-gray-700'} flex items-center gap-1`}
                        >
                          {source.id && <MapPin size={10} />} {source.name}
                        </button>
                      )}
                      <p className="text-gray-500">Attribution: {source.attribution || 'CULTURA Knowledge Base'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <Loader className="animate-spin" size={20} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Northeast Indian culture..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2 flex-shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
          <Sparkles size={12} className="text-emerald-500" />
          Powered by CULTURA Knowledge Base
        </p>
      </div>
    </div>
  );
}