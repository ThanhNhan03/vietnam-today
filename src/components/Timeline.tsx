import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, TrendingUp, Users, Factory, GraduationCap, Heart, ExternalLink } from 'lucide-react';
import timelineDataJson from '../data/timeline.json';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  details: string;
  category: 'economy' | 'social' | 'policy' | 'integration';
  image: string;
  sources?: {
    title: string;
    url: string;
  }[];
}

const timelineData: TimelineEvent[] = timelineDataJson as TimelineEvent[];

const categoryIcons = {
  economy: TrendingUp,
  social: Heart,
  policy: Users,
  integration: Factory
};

const categoryColors = {
  economy: '#D32F2F',
  social: '#B8860B',
  policy: '#1976D2',
  integration: '#388E3C'
};

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  return (
    <div className="timeline-container">
      {/* Hero Section */}
      <motion.div 
        className="timeline-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-icon">
          <Calendar size={48} />
        </div>
        <h1 className="timeline-hero-title">Việt Nam Đổi Mới & Hội Nhập</h1>
        <h2 className="timeline-hero-subtitle">2006 - 2015: Thập kỷ Phát triển Bền vững</h2>
        <p className="timeline-hero-description">
          Hành trình 10 năm Việt Nam phát triển kinh tế nhanh chóng mà vẫn giữ vững định hướng xã hội chủ nghĩa,
          cân bằng giữa tăng trưởng và công bằng, hội nhập và giữ gìn bản sắc.
        </p>
      </motion.div>

      {/* Key Insights */}
      <motion.div 
        className="timeline-insights"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="insight-card">
          <TrendingUp className="insight-icon" />
          <div className="insight-content">
            <h3>Tăng trưởng Bền vững</h3>
            <p>GDP tăng trung bình 6.5%/năm, cân bằng giữa tốc độ và chất lượng</p>
          </div>
        </div>
        <div className="insight-card">
          <Users className="insight-icon" />
          <div className="insight-content">
            <h3>An sinh Xã hội</h3>
            <p>Giảm nghèo từ 14% xuống dưới 5%, đầu tư y tế & giáo dục miễn phí</p>
          </div>
        </div>
        <div className="insight-card">
          <GraduationCap className="insight-icon" />
          <div className="insight-content">
            <h3>Công bằng Xã hội</h3>
            <p>Thu nhập bình quân tăng 2.5 lần, hệ số Gini được kiểm soát</p>
          </div>
        </div>
        <div className="insight-card">
          <Factory className="insight-icon" />
          <div className="insight-content">
            <h3>Doanh nghiệp Nhà nước</h3>
            <p>Cải cách, cổ phần hóa nhưng giữ vai trò chủ đạo trong các ngành quan trọng</p>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="timeline-line-wrapper">
        <motion.div 
          className="timeline-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        
        {timelineData.map((event, index) => {
          const Icon = categoryIcons[event.category];
          const isLeft = index % 2 === 0;
          
          return (
            <motion.div
              key={event.year}
              className={`timeline-event ${isLeft ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.15 }}
              onHoverStart={() => setHoveredYear(event.year)}
              onHoverEnd={() => setHoveredYear(null)}
            >
              {/* Timeline Node */}
              <motion.div 
                className="timeline-node"
                style={{ 
                  borderColor: categoryColors[event.category],
                  backgroundColor: hoveredYear === event.year ? categoryColors[event.category] : 'transparent'
                }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setSelectedEvent(event)}
              >
                <Icon size={20} color={hoveredYear === event.year ? '#fff' : categoryColors[event.category]} />
              </motion.div>

              {/* Event Card */}
              <motion.div 
                className="timeline-card"
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="timeline-card-header">
                  <span className="timeline-year" style={{ color: categoryColors[event.category] }}>
                    {event.year}
                  </span>
                  <Icon size={20} style={{ color: categoryColors[event.category] }} />
                </div>
                
                <h3 className="timeline-card-title">{event.title}</h3>
                <p className="timeline-card-description">{event.description}</p>
                
                <motion.button 
                  className="timeline-card-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ borderColor: categoryColors[event.category] }}
                >
                  Xem chi tiết
                </motion.button>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedEvent && createPortal(
        <AnimatePresence>
          <motion.div
            className="timeline-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          />
          <motion.div
            className="timeline-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button 
              className="timeline-modal-close"
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </button>

            <div className="timeline-modal-content">
              <div className="timeline-modal-image">
                <img src={selectedEvent.image} alt={selectedEvent.title} />
                <div className="timeline-modal-badge" style={{ backgroundColor: categoryColors[selectedEvent.category] }}>
                  {selectedEvent.year}
                </div>
              </div>

              <div className="timeline-modal-body">
                <h2 className="timeline-modal-title">{selectedEvent.title}</h2>
                <p className="timeline-modal-description">{selectedEvent.description}</p>
                <p className="timeline-modal-details">{selectedEvent.details}</p>

                {selectedEvent.sources && selectedEvent.sources.length > 0 && (
                  <div className="timeline-modal-sources">
                    <h3 className="sources-title">Nguồn tham khảo</h3>
                    <div className="sources-list">
                      {selectedEvent.sources.map((source, idx) => (
                        <a 
                          key={idx} 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="source-item"
                          style={{ borderLeftColor: categoryColors[selectedEvent.category] }}
                        >
                          <span className="source-title">{source.title}</span>
                          <ExternalLink size={16} className="source-icon" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}

      {/* Conclusion */}
      <motion.div 
        className="timeline-conclusion"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Bí quyết Phát triển Bền vững (2006-2015)</h2>
        <div className="conclusion-grid">
          <div className="conclusion-item">
            <div className="conclusion-number">1</div>
            <h3>Hội nhập có chọn lọc</h3>
            <p>Mở cửa thị trường nhưng bảo vệ các ngành then chốt. Nhà nước giữ vai trò điều tiết vĩ mô.</p>
          </div>
          <div className="conclusion-item">
            <div className="conclusion-number">2</div>
            <h3>Tái phân phối công bằng</h3>
            <p>Thu thuế công bằng, trợ cấp người nghèo, đầu tư y tế & giáo dục công miễn phí.</p>
          </div>
          <div className="conclusion-item">
            <div className="conclusion-number">3</div>
            <h3>Kinh tế đa sở hữu</h3>
            <p>Khuyến khích tư nhân nhưng DNNN vẫn chủ đạo điện lực, dầu khí, viễn thông.</p>
          </div>
          <div className="conclusion-item">
            <div className="conclusion-number">4</div>
            <h3>Đầu tư con người</h3>
            <p>Chi ngân sách cho giáo dục, y tế, đào tạo nghề, nâng cao năng suất lao động.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
