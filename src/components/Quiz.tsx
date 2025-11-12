import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Award,
  Brain,
  ChevronRight,
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Việt Nam gia nhập WTO vào năm nào?",
    options: ["2005", "2006", "2007", "2008"],
    correctAnswer: 2,
    explanation:
      "Việt Nam chính thức gia nhập WTO vào ngày 11/1/2007, là thành viên thứ 150, đánh dấu bước ngoặt lớn trong hội nhập kinh tế quốc tế.",
  },
  {
    id: 2,
    question:
      "Vai trò của doanh nghiệp nhà nước trong giai đoạn 2006-2015 là gì?",
    options: [
      "Bị tư nhân hóa hoàn toàn",
      "Giữ vai trò chủ đạo trong các ngành then chốt",
      "Chỉ hoạt động trong nông nghiệp",
      "Không còn tồn tại",
    ],
    correctAnswer: 1,
    explanation:
      "DNNN được cải cách, cổ phần hóa nhưng vẫn giữ vai trò chủ đạo trong điện lực, dầu khí, viễn thông, ngân hàng - các ngành quan trọng của nền kinh tế.",
  },
  {
    id: 3,
    question:
      "Tỷ lệ hộ nghèo Việt Nam giảm từ bao nhiêu năm 2006 xuống còn bao nhiêu năm 2015?",
    options: [
      "Từ 20% xuống 10%",
      "Từ 15.5% xuống dưới 5%",
      "Từ 30% xuống 15%",
      "Từ 10% xuống 2%",
    ],
    correctAnswer: 1,
    explanation:
      "Tỷ lệ hộ nghèo giảm mạnh từ khoảng 15.5% (2006) xuống dưới 5% (2015), thể hiện hiệu quả của chính sách an sinh xã hội và phát triển bao trùm.",
  },
  {
    id: 4,
    question: "Nghị quyết 11/NQ-CP (2011) tập trung vào vấn đề gì?",
    options: [
      "Tăng lương tối thiểu",
      "Cải cách thể chế, nâng cao năng lực cạnh tranh",
      "Xây dựng đường cao tốc",
      "Mở rộng quân đội",
    ],
    correctAnswer: 1,
    explanation:
      "Nghị quyết 11/NQ-CP về kiềm chế lạm phát, ổn định kinh tế vĩ mô và cải cách thể chế là bước đệm quan trọng để nâng cao năng lực cạnh tranh quốc gia.",
  },
  {
    id: 5,
    question: "Lạm phát Việt Nam đạt đỉnh bao nhiêu phần trăm vào năm 2008?",
    options: ["10%", "15%", "23%", "30%"],
    correctAnswer: 2,
    explanation:
      "Lạm phát lên đến 23% năm 2008 do tăng trưởng nóng và khủng hoảng tài chính toàn cầu, buộc Chính phủ phải thực hiện chính sách tiền tệ thắt chặt.",
  },
  {
    id: 6,
    question: "Ba trụ cột tái cơ cấu kinh tế (2013-2015) là gì?",
    options: [
      "Nông nghiệp, công nghiệp, dịch vụ",
      "DNNN, ngân hàng, đầu tư công",
      "Xuất khẩu, nhập khẩu, FDI",
      "Giáo dục, y tế, quốc phòng",
    ],
    correctAnswer: 1,
    explanation:
      "Ba trụ cột tái cơ cấu: doanh nghiệp nhà nước (cổ phần hóa), hệ thống ngân hàng (xử lý nợ xấu) và đầu tư công (nâng cao hiệu quả).",
  },
  {
    id: 7,
    question:
      "Gói kích cầu của Việt Nam trong cuộc khủng hoảng kinh tế toàn cầu 2008–2009 có giá trị bao nhiêu?",
    options: ["500 triệu USD", "8 tỷ USD", "5 tỷ USD", "10 tỷ USD"],
    correctAnswer: 1,
    explanation:
      "Gói kích cầu trị giá khoảng 8 tỷ USD (tương đương 143.000 tỷ đồng) đã giúp Việt Nam duy trì mức tăng trưởng 5,3% vào năm 2009, trong bối cảnh nhiều quốc gia rơi vào suy thoái, đồng thời góp phần bảo vệ việc làm cho người lao động.",
  },
  {
    id: 8,
    question:
      "Việt Nam đã làm gì để vừa thu hút FDI vừa bảo vệ các ngành then chốt?",
    options: [
      "Cấm hoàn toàn FDI vào các ngành nhạy cảm",
      "Cho phép FDI tự do trong mọi lĩnh vực",
      "Hội nhập có chọn lọc, giữ vai trò nhà nước ở ngành quan trọng",
      "Chỉ cho phép FDI trong nông nghiệp",
    ],
    correctAnswer: 2,
    explanation:
      "Việt Nam thực hiện hội nhập có chọn lọc: mở cửa thị trường, thu hút FDI nhưng nhà nước vẫn giữ vai trò chủ đạo trong điện lực, dầu khí, viễn thông.",
  },
  {
    id: 9,
    question:
      "Chính sách an sinh xã hội Việt Nam giai đoạn này tập trung vào đâu?",
    options: [
      "Chỉ hỗ trợ doanh nghiệp lớn",
      "Y tế, giáo dục miễn phí và giảm nghèo bền vững",
      "Tăng lương công chức",
      "Xây dựng nhà cao cấp",
    ],
    correctAnswer: 1,
    explanation:
      "Nhà nước đầu tư mạnh vào y tế, giáo dục công miễn phí, trợ cấp người nghèo và bảo hiểm xã hội, thể hiện định hướng xã hội chủ nghĩa.",
  },
  {
    id: 10,
    question: "GDP bình quân đầu người Việt Nam năm 2015 đạt khoảng bao nhiêu?",
    options: ["1,000 USD", "2,100 USD", "3,500 USD", "5,000 USD"],
    correctAnswer: 1,
    explanation:
      "GDP bình quân đầu người đạt hơn 2,100 USD năm 2015, tăng gấp đôi so với 2006, cho thấy sự phát triển nhanh và bền vững.",
  },
  {
    id: 11,
    question: "Việt Nam tham gia hiệp định thương mại nào năm 2015?",
    options: ["NAFTA", "TPP (nay là CPTPP)", "EU-Vietnam FTA", "RCEP"],
    correctAnswer: 1,
    explanation:
      "Việt Nam ký TPP năm 2015 (sau đổi thành CPTPP), đánh dấu tham gia hiệp định thương mại thế hệ mới, cam kết cải cách sâu rộng.",
  },
  {
    id: 12,
    question: "Mô hình kinh tế Việt Nam được gọi là gì?",
    options: [
      "Kinh tế thị trường tư bản chủ nghĩa",
      "Kinh tế kế hoạch hóa tập trung",
      "Kinh tế thị trường định hướng xã hội chủ nghĩa",
      "Kinh tế hỗn hợp không định hướng",
    ],
    correctAnswer: 2,
    explanation:
      "Kinh tế thị trường định hướng XHCN: có cơ chế thị trường nhưng nhà nước điều tiết vĩ mô, bảo đảm công bằng xã hội và phát triển bao trùm.",
  },
  {
    id: 13,
    question:
      "Số lượng doanh nghiệp mới thành lập tăng mạnh nhờ chính sách nào?",
    options: [
      "Luật Doanh nghiệp 2005 và cải cách thủ tục hành chính",
      "Tăng thuế doanh nghiệp",
      "Hạn chế đăng ký kinh doanh",
      "Chỉ cho phép DNNN hoạt động",
    ],
    correctAnswer: 0,
    explanation:
      "Luật Doanh nghiệp 2005 và cải cách hành chính giúp hàng chục nghìn DN mới thành lập mỗi năm, thúc đẩy kinh tế tư nhân phát triển.",
  },
  {
    id: 14,
    question:
      "Việt Nam đã cân bằng tăng trưởng và công bằng xã hội bằng cách nào?",
    options: [
      "Tập trung 100% vào tăng trưởng, bỏ qua công bằng",
      "Tái phân phối thu nhập qua thuế và đầu tư xã hội",
      "Chỉ phát triển thành phố lớn",
      "Cấm doanh nghiệp tư nhân",
    ],
    correctAnswer: 1,
    explanation:
      "Nhà nước thu thuế công bằng, tái phân phối qua đầu tư y tế, giáo dục, giảm nghèo, đảm bảo người dân được hưởng thành quả tăng trưởng.",
  },
  {
    id: 15,
    question: "Bài học quan trọng nhất từ giai đoạn 2006-2015 là gì?",
    options: [
      "Hội nhập càng nhanh càng tốt, không cần kiểm soát",
      "Cân bằng giữa tăng trưởng, ổn định vĩ mô và công bằng xã hội",
      "Chỉ phát triển kinh tế, không quan tâm xã hội",
      "Đóng cửa biên giới để bảo vệ nền kinh tế",
    ],
    correctAnswer: 1,
    explanation:
      "Bài học quan trọng: phát triển bền vững cần cân bằng tăng trưởng kinh tế, ổn định vĩ mô và công bằng xã hội, giữ vững định hướng XHCN.",
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(quizData.length).fill(false)
  );
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answeredQuestions[currentQuestion]) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);

    if (answerIndex === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions(new Array(quizData.length).fill(false));
    setIsFinished(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 90)
      return {
        title: "Xuất sắc! 🏆",
        message: "Bạn hiểu rất sâu về giai đoạn phát triển của Việt Nam!",
      };
    if (percentage >= 70)
      return {
        title: "Tốt lắm! 🎉",
        message: "Bạn có kiến thức vững về lịch sử kinh tế Việt Nam.",
      };
    if (percentage >= 50)
      return {
        title: "Khá đấy! 👍",
        message: "Bạn đã nắm được những điểm cơ bản.",
      };
    return {
      title: "Cố gắng thêm! 💪",
      message: "Hãy đọc lại Timeline để hiểu rõ hơn nhé!",
    };
  };

  if (isFinished) {
    const result = getScoreMessage();
    return (
      <div className="quiz-container">
        <motion.div
          className="quiz-result"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Award className="result-icon" size={80} />
          <h1 className="result-title">{result.title}</h1>
          <div className="result-score">
            <span className="score-number">{score}</span>
            <span className="score-total">/ {quizData.length}</span>
          </div>
          <p className="result-percentage">
            {((score / quizData.length) * 100).toFixed(0)}% Chính xác
          </p>
          <p className="result-message">{result.message}</p>

          <motion.button
            className="quiz-restart-btn"
            onClick={handleRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={20} />
            Làm lại
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="quiz-container">
      {/* Hero */}
      <motion.div
        className="quiz-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="quiz-hero-icon">
          <Brain size={48} />
        </div>
        <h1 className="quiz-hero-title">Quiz: Việt Nam 2006-2015</h1>
        <p className="quiz-hero-description">
          Phát triển kinh tế nhanh mà vẫn bảo đảm định hướng xã hội chủ nghĩa
        </p>
      </motion.div>

      {/* Progress */}
      <div className="quiz-progress-wrapper">
        <div className="quiz-progress-info">
          <span>
            Câu {currentQuestion + 1} / {quizData.length}
          </span>
          <span>{score} điểm</span>
        </div>
        <div className="quiz-progress-bar">
          <motion.div
            className="quiz-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          className="quiz-card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="quiz-question">{question.question}</h2>

          <div className="quiz-options">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showResult = showExplanation;

              let className = "quiz-option";
              if (showResult) {
                if (isCorrect) className += " correct";
                else if (isSelected) className += " incorrect";
              } else if (isSelected) {
                className += " selected";
              }

              return (
                <motion.button
                  key={index}
                  className={className}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={answeredQuestions[currentQuestion]}
                  whileHover={{
                    scale: answeredQuestions[currentQuestion] ? 1 : 1.02,
                  }}
                  whileTap={{
                    scale: answeredQuestions[currentQuestion] ? 1 : 0.98,
                  }}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-text">{option}</span>
                  {showResult && isCorrect && (
                    <CheckCircle className="option-icon" size={24} />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="option-icon" size={24} />
                  )}
                </motion.button>
              );
            })}
          </div>

          {showExplanation && (
            <motion.div
              className="quiz-explanation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3>
                {selectedAnswer === question.correctAnswer
                  ? "✅ Chính xác!"
                  : "❌ Chưa đúng"}
              </h3>
              <p>{question.explanation}</p>
            </motion.div>
          )}

          {showExplanation && (
            <motion.button
              className="quiz-next-btn"
              onClick={handleNext}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentQuestion < quizData.length - 1 ? (
                <>
                  Câu tiếp theo
                  <ChevronRight size={20} />
                </>
              ) : (
                <>
                  Xem kết quả
                  <Award size={20} />
                </>
              )}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
