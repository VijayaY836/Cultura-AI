// Sentiment Analysis Service for Moushumi Aaita
// Analyzes user's emotional state and matches with appropriate stories

const emotionKeywords = {
  bedtime: {
    keywords: [
      'tired', 'exhausted', 'sleepy', 'drowsy', 'bedtime', 'going to sleep', 'going to bed',
      'need rest', 'need sleep', 'want to sleep', 'time to sleep', 'ready for bed',
      'goodnight', 'good night', 'lullaby', 'peaceful', 'calm', 'relaxed', 'wind down',
      'end of day', 'nighttime', 'night time', 'restful', 'soothing'
    ],
    intensity: ['very', 'extremely', 'really', 'so'],
    score: 0.5
  },
  fear: {
    keywords: [
      'afraid', 'scared', 'fear', 'fearful', 'terrified', 'frightened', 'anxious', 'worried',
      'nervous', 'panic', 'panicking', 'scared of', 'afraid of', 'frightening', 'scary',
      'nightmare', 'nightmares', 'dark', 'alone', 'worried about', 'what if', 'danger',
      'unsafe', 'threatened', 'intimidated', 'overwhelmed', 'stressed'
    ],
    intensity: ['very', 'extremely', 'really', 'so', 'too', 'incredibly'],
    score: -0.7
  },
  joy: {
    keywords: [
      'happy', 'joyful', 'excited', 'great', 'wonderful', 'amazing', 'fantastic', 
      'blessed', 'grateful', 'thankful', 'delighted', 'cheerful', 'thrilled', 'ecstatic',
      'elated', 'overjoyed', 'jubilant', 'pleased', 'glad', 'merry', 'celebrating',
      'celebration', 'awesome', 'brilliant', 'excellent', 'perfect', 'love it',
      'loving life', 'feel great', 'on top of the world', 'cloud nine', 'best day'
    ],
    intensity: ['very', 'extremely', 'really', 'so', 'incredibly', 'absolutely'],
    score: 0.8
  },
  confusion: {
    keywords: [
      'confused', 'lost', 'uncertain', 'unsure', 'don\'t know', 'unclear', 'puzzled',
      'bewildered', 'perplexed', 'baffled', 'mixed up', 'torn', 'conflicted',
      'can\'t decide', 'don\'t understand', 'makes no sense', 'what should i do',
      'which way', 'what to do', 'help me decide', 'so many choices', 'crossroads',
      'stuck', 'indecisive', 'not sure', 'questioning', 'doubt', 'doubtful'
    ],
    intensity: ['very', 'really', 'so', 'completely', 'totally'],
    score: -0.4
  },
  anger: {
    keywords: [
      'angry', 'mad', 'furious', 'annoyed', 'frustrated', 'irritated', 'upset', 'rage',
      'hate', 'bitter', 'resentful', 'enraged', 'livid', 'outraged', 'infuriated',
      'pissed', 'pissed off', 'ticked off', 'fed up', 'sick of', 'can\'t stand',
      'drives me crazy', 'makes me mad', 'so angry', 'want to scream', 'boiling',
      'furious', 'aggravated', 'hostile', 'resentment'
    ],
    intensity: ['very', 'extremely', 'really', 'so', 'absolutely', 'incredibly'],
    score: -0.6
  }
};

const contextKeywords = {
  work: ['work', 'job', 'office', 'career', 'boss', 'colleague', 'coworker', 'project', 'deadline', 'meeting', 'presentation', 'client', 'business', 'professional', 'workplace'],
  study: ['exam', 'test', 'study', 'studying', 'school', 'college', 'university', 'assignment', 'grades', 'homework', 'class', 'course', 'professor', 'teacher', 'student'],
  relationship: ['relationship', 'love', 'partner', 'boyfriend', 'girlfriend', 'husband', 'wife', 'family', 'friend', 'friends', 'dating', 'marriage', 'breakup', 'divorce', 'argument'],
  health: ['health', 'sick', 'ill', 'illness', 'pain', 'doctor', 'hospital', 'medicine', 'treatment', 'diagnosis', 'symptoms', 'medical', 'physical', 'mental health'],
  life: ['life', 'future', 'purpose', 'meaning', 'direction', 'path', 'journey', 'goals', 'dreams', 'aspirations', 'identity', 'who am i', 'what should i do']
};

export const analyzeSentiment = (text) => {
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);
  
  let detectedEmotions = [];
  let primaryEmotion = null;
  let sentimentScore = 0;
  let intensity = 1.0;
  let context = [];

  // Detect emotions
  Object.entries(emotionKeywords).forEach(([emotion, data]) => {
    const matchCount = data.keywords.filter(keyword => 
      lowerText.includes(keyword)
    ).length;

    if (matchCount > 0) {
      // Check for intensity modifiers
      const hasIntensity = data.intensity.some(modifier => 
        lowerText.includes(modifier)
      );
      
      const emotionIntensity = hasIntensity ? 1.5 : 1.0;
      
      detectedEmotions.push({
        emotion,
        score: data.score * emotionIntensity,
        matchCount
      });
    }
  });

  // Sort by match count and get primary emotion
  if (detectedEmotions.length > 0) {
    detectedEmotions.sort((a, b) => b.matchCount - a.matchCount);
    primaryEmotion = detectedEmotions[0].emotion;
    sentimentScore = detectedEmotions[0].score;
    intensity = Math.abs(detectedEmotions[0].score);
  }

  // Detect context
  Object.entries(contextKeywords).forEach(([ctx, keywords]) => {
    const hasContext = keywords.some(keyword => lowerText.includes(keyword));
    if (hasContext) {
      context.push(ctx);
    }
  });

  // Default to neutral if no emotion detected
  if (!primaryEmotion) {
    primaryEmotion = 'neutral';
    sentimentScore = 0;
  }

  return {
    primaryEmotion,
    allEmotions: detectedEmotions.map(e => e.emotion),
    sentimentScore,
    intensity,
    context,
    isPositive: sentimentScore > 0,
    isNegative: sentimentScore < 0,
    isNeutral: sentimentScore === 0,
    rawText: text
  };
};

export const getEmotionDescription = (emotion) => {
  const descriptions = {
    bedtime: 'ready for a peaceful bedtime story',
    fear: 'feeling afraid or worried',
    joy: 'feeling happy and joyful',
    confusion: 'feeling confused and uncertain',
    anger: 'feeling angry and frustrated',
    neutral: 'seeking guidance'
  };

  return descriptions[emotion] || 'sharing your feelings';
};

export const getAaitaResponse = (emotion) => {
  const responses = {
    bedtime: "Ah, it's time to rest, child. Come, let me tuck you in with a gentle story to carry you into sweet dreams...",
    fear: "I sense worry in your heart, little one. Don't be afraid. Let me share a story that will bring you courage and peace...",
    joy: "Ah! What a beautiful light you bring today! Your happiness warms this old heart. Let me share a story of celebration with you...",
    confusion: "Feeling lost, are we? Don't worry, child. Many have walked this path before. Let me share a story that might show you the way...",
    anger: "I see the fire in your words, little one. Sometimes we need to cool our hearts. Let me tell you a story about patience and wisdom...",
    neutral: "Welcome, child. Tell me what's on your mind, and I'll find the perfect story for you..."
  };

  return responses[emotion] || responses.neutral;
};
