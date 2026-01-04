import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import knowledgeBase from '../teachce_knowledge_base.json';

const generateQuestions = () => {
    const generatedQuestions = [];
    const domains = knowledgeBase.knowledge_domains;

    Object.entries(domains).forEach(([key, domain]) => {
        generatedQuestions.push({
            question: `Which topic falls under the domain of "${key.replace(/_/g, ' ').toUpperCase()}"?`,
            options: [
                domain.topics[0],
                domain.topics[1] || "General Knowledge",
                "Parties and Events",
                "Video Games"
            ].sort(() => Math.random() - 0.5),
            correctAnswer: domain.topics[0]
        });

        if (domain.dana_responses && domain.dana_responses.length > 0) {
            generatedQuestions.push({
                question: `Who would say: "${domain.dana_responses[0]}"?`,
                options: ["Dana (Legal Expert)", "Sherry (Clinical Expert)", "Bob (IT)", "Alice (HR)"],
                correctAnswer: "Dana (Legal Expert)"
            });
        }
    });

    return generatedQuestions.sort(() => Math.random() - 0.5).slice(0, 5);
};

const Quiz = ({ user }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    // Initialize questions lazily to avoid side-effects in render
    const [questions] = useState(() => generateQuestions());

    useEffect(() => {
        // Log user for tracking
        console.log('Quiz Session Started for:', user);
    }, [user]);

    const handleAnswerClick = (option) => {
        setSelectedAnswer(option);
        const correct = option === questions[currentQuestionIndex].correctAnswer;
        setIsCorrect(correct);

        if (correct) {
            setScore(score + 1);
        }

        // Wait a moment then go next
        setTimeout(() => {
            if (currentQuestionIndex + 1 < questions.length) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
                setIsCorrect(null);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    if (questions.length === 0) return <div>Loading Quiz Data...</div>;

    if (showResult) {
        return (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20 animate-scale-in">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
                <p className="text-xl mb-6">You scored <span className="font-bold text-cyan-300">{score}</span> out of <span className="font-bold">{questions.length}</span></p>

                <div className="w-full bg-gray-700 rounded-full h-4 mb-8 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${(score / questions.length) * 100}%` }}
                    ></div>
                </div>

                <button
                    onClick={resetQuiz}
                    className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-cyan-100 transition-colors shadow-lg"
                >
                    Play Again
                </button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6 text-sm opacity-70">
                <span>Question {currentQuestionIndex + 1} / {questions.length}</span>
                <span>Score: {score}</span>
            </div>

            <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-2xl mb-8 relative overflow-hidden">
                <h3 className="text-xl font-bold mb-6 relative z-10">{currentQuestion.question}</h3>

                <div className="space-y-3 relative z-10">
                    {currentQuestion.options.map((option, idx) => {
                        let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium ";

                        if (selectedAnswer === option) {
                            btnClass += isCorrect
                                ? "bg-green-100 border-green-500 text-green-900"
                                : "bg-red-100 border-red-500 text-red-900";
                        } else if (selectedAnswer) {
                            // Disable other buttons
                            btnClass += "bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed";
                        } else {
                            btnClass += "bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => !selectedAnswer && handleAnswerClick(option)}
                                disabled={!!selectedAnswer}
                                className={btnClass}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-blue-300 rounded-full opacity-20 blur-2xl"></div>
            </div>
        </div>
    );
};

Quiz.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        licenseNumber: PropTypes.string
    })
};

export default Quiz;
