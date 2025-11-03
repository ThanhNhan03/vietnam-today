import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, User, Clock } from 'lucide-react';
import { database } from '../lib/firebase';
import { ref, push, onValue, query, orderByChild, limitToLast } from 'firebase/database';

interface Question {
  id: string;
  name: string;
  question: string;
  timestamp: number;
}

export default function QnA() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load questions from Firebase
  useEffect(() => {
    const questionsRef = ref(database, 'questions');
    const questionsQuery = query(questionsRef, orderByChild('timestamp'), limitToLast(50));

    const unsubscribe = onValue(questionsQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const questionsList: Question[] = Object.entries(data).map(([key, value]: [string, any]) => ({
          id: key,
          name: value.name,
          question: value.question,
          timestamp: value.timestamp,
        }));
        // Sort by timestamp descending (newest first)
        questionsList.sort((a, b) => b.timestamp - a.timestamp);
        setQuestions(questionsList);
      } else {
        setQuestions([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !question.trim()) {
      alert('Vui lòng nhập đầy đủ tên và câu hỏi!');
      return;
    }

    setIsSubmitting(true);

    try {
      const questionsRef = ref(database, 'questions');
      const newQuestion = {
        name: name.trim(),
        question: question.trim(),
        timestamp: Date.now(),
      };

      await push(questionsRef, newQuestion);
      
      // Clear form
      setName('');
      setQuestion('');
      alert('Câu hỏi của bạn đã được gửi thành công! 🎉');
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = Math.floor((now - timestamp) / 1000);

    if (diff < 60) return 'Vừa xong';
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return new Date(timestamp).toLocaleDateString('vi-VN');
  };

  return (
    <div className="qna-container">
      {/* Hero Section */}
      <motion.div 
        className="qna-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="qna-hero-icon">
          <MessageCircle size={48} />
        </div>
        <h1 className="qna-hero-title">Hỏi & Đáp</h1>
        <p className="qna-hero-description">
          Đặt câu hỏi của bạn về Việt Nam đổi mới và hội nhập. 
          Câu hỏi sẽ được hiển thị ngay lập tức và chúng tôi sẽ trả lời sớm nhất có thể.
        </p>
      </motion.div>

      {/* Question Form */}
      <motion.div 
        className="qna-form-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="qna-form">
          <div className="qna-form-header">
            <h2>Đặt câu hỏi của bạn</h2>
            <p>Chia sẻ thắc mắc của bạn với cộng đồng</p>
          </div>

          <div className="qna-form-group">
            <label htmlFor="name" className="qna-label">
              <User size={18} />
              Tên của bạn
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên của bạn..."
              className="qna-input"
              maxLength={50}
            />
          </div>

          <div className="qna-form-group">
            <label htmlFor="question" className="qna-label">
              <MessageCircle size={18} />
              Câu hỏi của bạn
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Nhập câu hỏi của bạn về Việt Nam đổi mới và hội nhập..."
              className="qna-textarea"
              rows={5}
              maxLength={500}
            />
            <div className="qna-char-count">
              {question.length}/500 ký tự
            </div>
          </div>

          <motion.button
            type="submit"
            className="qna-submit-btn"
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
          >
            <Send size={20} />
            {isSubmitting ? 'Đang gửi...' : 'Gửi câu hỏi'}
          </motion.button>
        </form>
      </motion.div>

      {/* Questions List */}
      <div className="qna-questions-section">
        <div className="qna-questions-header">
          <h2>Câu hỏi từ cộng đồng</h2>
          <div className="qna-count">
            {questions.length} {questions.length === 1 ? 'câu hỏi' : 'câu hỏi'}
          </div>
        </div>

        {questions.length === 0 ? (
          <motion.div 
            className="qna-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MessageCircle size={64} className="qna-empty-icon" />
            <h3>Chưa có câu hỏi nào</h3>
            <p>Hãy là người đầu tiên đặt câu hỏi!</p>
          </motion.div>
        ) : (
          <div className="qna-questions-list">
            <AnimatePresence>
              {questions.map((q, index) => (
                <motion.div
                  key={q.id}
                  className="qna-question-card"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100
                  }}
                  layout
                >
                  <div className="qna-question-header">
                    <div className="qna-question-avatar">
                      {q.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="qna-question-meta">
                      <h3 className="qna-question-author">{q.name}</h3>
                      <div className="qna-question-time">
                        <Clock size={14} />
                        {formatTime(q.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="qna-question-body">
                    <p>{q.question}</p>
                  </div>
                  <div className="qna-question-footer">
                    <span className="qna-status">Đang chờ trả lời</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
