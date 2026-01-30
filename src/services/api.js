import Anthropic from '@anthropic-ai/sdk';
import { culturalData, searchCulturalData, getRelatedEntities } from '../data/culturalData';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
});

export const getCulturalContext = (query) => {
  const results = searchCulturalData(query);
  return results.slice(0, 3);
};

export const generateResponse = async (userMessage, culturalContext) => {
  const contextString = culturalContext.map(entity => 
    `[${entity.name} - ${entity.region}]: ${entity.description}\nRituals: ${entity.rituals.join(', ')}\nAttribution: ${entity.attribution}`
  ).join('\n\n');

  const systemPrompt = `You are CULTURA, an AI assistant specialized in Northeast Indian cultural heritage. You have access to verified cultural data from government sources and tribal communities.

ETHICAL GUIDELINES:
- Always attribute information to source communities
- Show respect for indigenous knowledge
- Avoid cultural appropriation or misrepresentation
- If uncertain, say so - never hallucinate cultural facts
- Keep responses concise and informative (2-3 paragraphs max)

CULTURAL CONTEXT:
${contextString}

Provide accurate, respectful responses about Northeast Indian culture. Always cite the community source when referencing specific cultural practices.`;

  try {
    if (!import.meta.env.VITE_ANTHROPIC_API_KEY) {
      throw new Error('Anthropic API key is not configured. Please add VITE_ANTHROPIC_API_KEY to your .env file.');
    }

    console.log('Calling Claude API...');
    
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: userMessage
      }],
      system: systemPrompt
    });

    console.log('Response received');
    return message.content[0].text;
    
  } catch (error) {
    console.error('Claude API Error:', error);
    
    if (error.status === 401) {
      throw new Error('Invalid API key. Please check your Anthropic API key.');
    }
    if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a moment.');
    }
    
    throw new Error(error.message || 'Failed to generate response');
  }
};

export const getAllCulturalData = () => culturalData;
export const getEntityById = (id) => culturalData.find(e => e.id === id);
export const getRelated = (id) => getRelatedEntities(id);