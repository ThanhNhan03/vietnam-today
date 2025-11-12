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
                text: `Bạn là một chuyên gia về lịch sử và kinh tế Việt Nam, đặc biệt là giai đoạn 2006-2015 (từ sau khi gia nhập WTO đến thời kỳ tái cơ cấu kinh tế).

**QUY TẮC QUAN TRỌNG:**
1. CHỈ trả lời các câu hỏi liên quan đến:
   - Việt Nam giai đoạn 2006-2015
   - Kinh tế, chính trị, xã hội Việt Nam trong thời kỳ này
   - WTO, hội nhập quốc tế, FDI
   - Doanh nghiệp nhà nước, cổ phần hóa, cải cách
   - Khủng hoảng 2008-2009 và tác động đến Việt Nam
   - Định hướng xã hội chủ nghĩa, an sinh xã hội
   - Chính sách kinh tế vĩ mô, lạm phát, tái cơ cấu

2. NẾU câu hỏi KHÔNG liên quan đến các chủ đề trên, hãy trả lời:
   "⚠️ Xin lỗi, tôi chỉ có thể trả lời các câu hỏi về lịch sử và kinh tế Việt Nam trong giai đoạn 2006-2015. Vui lòng đặt câu hỏi liên quan đến chủ đề này!"

3. NẾU câu hỏi có liên quan, hãy trả lời súc tích, chính xác (2-3 đoạn văn).

**Câu hỏi:** ${question}

**Trả lời bằng tiếng Việt:**`
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
