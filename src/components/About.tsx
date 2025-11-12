import { motion } from 'framer-motion';
import { Bot, Code, Database, Globe, Heart, Shield, Sparkles, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <motion.div 
        className="about-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="about-hero-icon">
          <Heart size={48} />
        </div>
        <h1 className="about-hero-title">Về Dự Án</h1>
        <p className="about-hero-subtitle">Minh bạch, Chính xác, Có trách nhiệm</p>
        <p className="about-hero-description">
          Chúng tôi tin rằng việc sử dụng công nghệ AI cần được thực hiện một cách minh bạch, 
          có đạo đức và có trách nhiệm với người dùng.
        </p>
      </motion.div>

      {/* AI Transparency Section */}
      <motion.div 
        className="about-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="section-header">
          <Bot className="section-icon" size={40} />
          <h2>Sử Dụng AI Trong Dự Án</h2>
        </div>
        
        <div className="transparency-card">
          <h3>🤖 Chúng tôi sử dụng AI như thế nào?</h3>
          <div className="transparency-content">
            <p>
              Dự án này sử dụng công nghệ trí tuệ nhân tạo (AI) để nâng cao trải nghiệm người dùng 
              và cung cấp thông tin một cách nhanh chóng, chính xác. Chúng tôi cam kết minh bạch 
              về việc sử dụng AI trong từng phần của dự án.
            </p>
          </div>
        </div>

        <div className="ai-usage-grid">
          <div className="ai-usage-item">
            <div className="ai-badge ai-badge-primary">
              <Sparkles size={20} />
              AI Generated
            </div>
            <h4>Nội dung Timeline</h4>
            <p>
              Một phần nội dung lịch sử trong trang <strong>"Nội Dung"</strong> được tạo ra 
              với sự hỗ trợ của AI (Google Gemini, Claude, ChatGPT). Tất cả nội dung đã được 
              <strong> kiểm tra, chỉnh sửa và xác minh</strong> bởi con người để đảm bảo tính chính xác.
            </p>
          </div>

          <div className="ai-usage-item">
            <div className="ai-badge ai-badge-primary">
              <Sparkles size={20} />
              AI Generated
            </div>
            <h4>Thiết kế giao diện</h4>
            <p>
              Phần code CSS, layout và hiệu ứng animation được tạo ra với sự hỗ trợ của 
              <strong> GitHub Copilot</strong> và <strong>Claude AI</strong>. 
              Designer đã review và tinh chỉnh để đảm bảo trải nghiệm người dùng tối ưu.
            </p>
          </div>

          <div className="ai-usage-item">
            <div className="ai-badge ai-badge-live">
              <Bot size={20} />
              AI Powered
            </div>
            <h4>Trả lời câu hỏi (Q&A)</h4>
            <p>
              Tính năng trả lời câu hỏi sử dụng <strong>Google Gemini AI</strong> để 
              cung cấp câu trả lời tự động về lịch sử và kinh tế Việt Nam. 
              Câu trả lời được tạo ra <strong>real-time</strong> dựa trên câu hỏi của bạn.
            </p>
            <div className="ai-warning">
              ⚠️ <strong>Lưu ý:</strong> Câu trả lời AI có thể không hoàn toàn chính xác. 
              Vui lòng tham khảo thêm nguồn khác để xác minh thông tin.
            </div>
          </div>

          <div className="ai-usage-item">
            <div className="ai-badge ai-badge-human">
              <Users size={20} />
              Human Created
            </div>
            <h4>Nội dung Podcast</h4>
            <p>
              Tất cả metadata podcast (tiêu đề, mô tả, thời lượng) và cấu trúc dữ liệu 
              được <strong>tạo hoàn toàn bởi con người</strong>. File âm thanh demo lấy từ 
              SoundHelix và Cloudinary.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Technology Stack */}
      <motion.div 
        className="about-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-header">
          <Code className="section-icon" size={40} />
          <h2>Công Nghệ Sử Dụng</h2>
        </div>

        <div className="tech-grid">
          <div className="tech-card">
            <h4>Frontend</h4>
            <ul>
              <li>React 18 + TypeScript</li>
              <li>Vite (Build tool)</li>
              <li>Framer Motion (Animations)</li>
              <li>Howler.js (Audio player)</li>
              <li>Lucide React (Icons)</li>
            </ul>
          </div>

          <div className="tech-card">
            <h4>AI & APIs</h4>
            <ul>
              <li>Google Gemini AI (Q&A)</li>
              <li>Firebase Realtime Database</li>
              <li>Cloudinary (Media CDN)</li>
              <li>SoundHelix (Demo audio)</li>
            </ul>
          </div>

          <div className="tech-card">
            <h4>Hosting & Deploy</h4>
            <ul>
              <li>Vercel (Hosting)</li>
              <li>GitHub (Version control)</li>
              <li>Firebase (Backend)</li>
            </ul>
          </div>

          <div className="tech-card">
            <h4>Development</h4>
            <ul>
              <li>GitHub Copilot (Code assist)</li>
              <li>Claude AI (Architecture)</li>
              <li>ESLint + Prettier</li>
              <li>VS Code</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Data Privacy */}
      <motion.div 
        className="about-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-header">
          <Shield className="section-icon" size={40} />
          <h2>Quyền Riêng Tư & Dữ Liệu</h2>
        </div>

        <div className="privacy-grid">
          <div className="privacy-item">
            <Database className="privacy-icon" />
            <h4>Dữ liệu được lưu trữ</h4>
            <p>
              <strong>Câu hỏi Q&A:</strong> Tên và nội dung câu hỏi được lưu trên 
              Firebase Realtime Database để hiển thị công khai cho tất cả người dùng.
            </p>
            <p>
              <strong>Không thu thập:</strong> Email, địa chỉ IP, cookies, hoặc bất kỳ 
              thông tin cá nhân nào khác.
            </p>
          </div>

          <div className="privacy-item">
            <Globe className="privacy-icon" />
            <h4>Chia sẻ dữ liệu</h4>
            <p>
              Câu hỏi và tên bạn gửi trong phần Q&A sẽ được <strong>hiển thị công khai</strong> 
              trên trang web để mọi người cùng xem và học hỏi.
            </p>
            <p>
              Dữ liệu được gửi tới <strong>Google Gemini API</strong> để xử lý câu hỏi, 
              nhưng không được lưu trữ lâu dài bởi Google.
            </p>
          </div>

          <div className="privacy-item">
            <Shield className="privacy-icon" />
            <h4>Bảo mật</h4>
            <p>
              Dữ liệu được mã hóa khi truyền tải (HTTPS/TLS). Firebase cung cấp 
              bảo mật cấp doanh nghiệp cho database.
            </p>
            <p>
              <strong>Lưu ý:</strong> Không nhập thông tin nhạy cảm (mật khẩu, số thẻ, v.v.) 
              vào phần Q&A vì nội dung sẽ công khai.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Limitations */}
      <motion.div 
        className="about-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-header">
          <h2>Giới Hạn & Trách Nhiệm</h2>
        </div>

        <div className="limitations-card">
          <h3>⚠️ Những điều bạn cần biết:</h3>
          <ul className="limitations-list">
            <li>
              <strong>AI không hoàn hảo:</strong> Câu trả lời AI có thể chứa sai sót, 
              không đầy đủ hoặc lỗi thời. Luôn xác minh thông tin từ nhiều nguồn.
            </li>
            <li>
              <strong>Không thay thế chuyên gia:</strong> Nội dung chỉ mang tính tham khảo, 
              không nên dùng để ra quyết định quan trọng mà không tham khảo chuyên gia.
            </li>
            <li>
              <strong>Giới hạn API:</strong> Dịch vụ Q&A có thể tạm ngưng nếu vượt quá 
              giới hạn miễn phí (1,500 requests/ngày).
            </li>
            <li>
              <strong>Nội dung do người dùng tạo:</strong> Chúng tôi không chịu trách nhiệm 
              về nội dung câu hỏi do người dùng gửi lên.
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Contact & Credits */}
      <motion.div 
        className="about-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3>Liên Hệ & Đóng Góp</h3>
        <p>
          Dự án này được tạo ra với mục đích giáo dục và nghiên cứu. 
          Nếu bạn phát hiện lỗi hoặc có đề xuất, vui lòng liên hệ qua GitHub.
        </p>
        <div className="credits">
          <p>
            <strong>Công nghệ AI:</strong> Google Gemini, Claude AI, GitHub Copilot<br />
            <strong>Thiết kế:</strong> Inspired by vinyl record aesthetics<br />
            <strong>Âm thanh demo:</strong> SoundHelix, Cloudinary<br />
            <strong>Icons:</strong> Lucide React
          </p>
        </div>
        <p className="about-version">
          Version 1.0.0 • Cập nhật: Tháng 11, 2025
        </p>
      </motion.div>
    </div>
  );
}
