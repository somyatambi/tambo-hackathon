import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    
    // Call OpenRouter for AI response
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'MindFlow - Tambo Hackathon',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4',
        messages: [
          {
            role: 'system',
            content: `You are MindFlow, a warm and playful AI mental wellness companion powered by Tambo.
            
Your role:
- Analyze user's emotional state from their messages
- Provide empathetic, supportive responses
- Suggest appropriate therapeutic techniques
- Use a friendly, encouraging tone with emojis 🌟

When user shares feelings, you should:
1. Acknowledge their emotions
2. Provide supportive guidance
3. Suggest specific exercises (breathing, journaling, grounding, etc.)
4. Keep responses concise but warm (2-3 paragraphs max)

Be playful and fun while being genuinely helpful! 🎨✨`
          },
          ...history,
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }
    
    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    return Response.json({ 
      response: aiResponse,
      success: true 
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { 
        error: 'Failed to get AI response',
        success: false 
      },
      { status: 500 }
    );
  }
}
