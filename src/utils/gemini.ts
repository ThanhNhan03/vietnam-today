// Gemini API configuration
const GEMINI_API_KEY = 'AIzaSyCWwV_m6xklmM39vc6PuIqNqOtPzbthSF0';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 5000; // 5 seconds between requests to avoid quota issues

export async function generateAnswer(question: string): Promise<string> {
  // Rate limiting check
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    // Show waiting message in console
    console.log(`⏳ Đang đợi ${Math.ceil(waitTime / 1000)} giây trước khi gửi request tiếp theo...`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  lastRequestTime = Date.now();

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Bạn là một chuyên gia về lịch sử và kinh tế Việt Nam, đặc biệt là giai đoạn đổi mới và hội nhập quốc tế từ 2006-2015. Hãy trả lời câu hỏi sau một cách súc tích, chính xác và dễ hiểu (khoảng 2-3 đoạn văn):\n\nCâu hỏi: ${question}\n\nTrả lời bằng tiếng Việt.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        }
      })
    });

    const data = await response.json();

    // Handle API errors
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('API key đã hết quota. Vui lòng tạo API key mới tại https://aistudio.google.com/app/apikey hoặc thử lại sau.');
      }
      
      throw new Error(data.error?.message || `Lỗi API: ${response.status}`);
    }
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error('Không thể lấy câu trả lời từ AI. Vui lòng thử lại!');
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    
    // Return user-friendly error message
    if (error.message.includes('quota') || error.message.includes('API key')) {
      throw error; // Keep the quota error message
    }
    
    throw new Error('Không thể kết nối với AI. Vui lòng kiểm tra kết nối mạng và thử lại!');
  }
}
