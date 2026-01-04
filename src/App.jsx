import React, { useState } from 'react';
import { LucideGraduationCap, LucideClipboardList, LucideUser, LucideLogOut, LucideArrowRight, LucideCheckCircle, LucideAlertCircle, LucideBookOpen, LucideAward, LucideHexagon } from 'lucide-react';

// --- DATA SOURCE (Embed of teachce_knowledge_base.json) ---
const knowledgeBase = {
  "response_patterns": {
    "dana_style": {
      "opening_phrases": ["So the key thing about this is:", "What you need to know is:", "The important point here is:"],
      "personality": "authoritative, direct, legally-focused",
      "expertise": ["legal compliance", "regulations", "workers compensation law", "QME requirements"]
    },
    "sherry_style": {
      "opening_phrases": ["Let me explain this clearly:", "Here's how I approach this:", "The way this works is:"],
      "personality": "supportive, detailed, practically-focused",
      "expertise": ["report writing", "clinical documentation", "examination techniques", "practical application"]
    }
  },
  "knowledge_domains": {
    "qme_fundamentals": {
      "topics": ["qme evaluation", "qualified medical evaluator", "medical examination"],
      "dana_responses": [
        "A QME evaluation requires following specific Labor Code requirements. The key is thorough documentation with objective medical findings.",
        "QME evaluations must address work-relatedness, medical causation, apportionment, and permanent disability rating using AMA Guidelines."
      ],
      "sherry_responses": [
        "Let me walk you through the QME process step by step. It starts with a complete medical history and systematic examination.",
        "The key components of a QME evaluation include documenting the mechanism of injury, current symptoms, functional limitations, and treatment history."
      ]
    },
    "report_writing": {
      "topics": ["medical report", "report writing", "documentation", "report format"],
      "dana_responses": [
        "Medical reports must follow a specific structure: history of injury, medical history, examination findings, diagnosis, and medical opinions.",
        "The key to good report writing is being objective, thorough, and addressing all the legal questions posed in the case."
      ],
      "sherry_responses": [
        "Report writing is really about telling the complete medical story. Start with a clear chronology of the injury and treatment.",
        "I always organize my reports with clear headings: History, Examination, Diagnostic Studies, Assessment, and Medical Opinions."
      ]
    },
    "disability_rating": {
      "topics": ["disability rating", "impairment rating", "ama guidelines", "permanent disability"],
      "dana_responses": [
        "Disability ratings in California use the AMA Guides to the Evaluation of Permanent Impairment with specific state modifications.",
        "The rating process considers whole person impairment, functional limitations, and occupational factors to determine the final percentage."
      ],
      "sherry_responses": [
        "Let me explain how disability rating works. We start with the AMA impairment percentage, then apply California-specific adjustments.",
        "The rating considers not just the medical impairment, but also how it affects the person's ability to compete in the job market."
      ]
    },
    "legal_compliance": {
      "topics": ["labor code", "regulation", "compliance", "legal requirements"],
      "dana_responses": [
        "California Labor Code sections 4060-4062 govern QME evaluations and establish the legal framework for medical evaluations.",
        "Compliance requires staying current with regulatory changes, particularly updates to the Medical Treatment Utilization Schedule."
      ],
      "sherry_responses": [
        "Legal compliance in workers compensation medicine means following both the letter and spirit of the regulations.",
        "The most important thing is thorough documentation - if it's not written down, legally it didn't happen."
      ]
    }
  }
};

// --- COMPONENTS ---

const Header = ({ user, onLogout }) => (
  <header className="w-full bg-white/90 backdrop-blur-md border-b-2 border-yellow-400 sticky top-0 z-50 shadow-sm">
    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="bg-yellow-400 p-2 rounded-xl shadow-md border-2 border-black transform -rotate-3">
          <span className="text-2xl filter drop-shadow-sm">🐝</span>
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Teach<span className="text-yellow-600">CE</span></h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Continuing Education</p>
        </div>
      </div>

      {user && (
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-bold text-slate-900">{user.name}</span>
            <span className="text-xs text-slate-500 font-mono tracking-wide bg-yellow-100 px-2 py-0.5 rounded-full">{user.licenseNumber}</span>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            title="Log Out"
          >
            <LucideLogOut size={20} />
          </button>
        </div>
      )}
    </div>
  </header>
);

const UserEntryForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({ name: '', licenseNumber: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.licenseNumber) {
      onComplete(formData);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white border-2 border-slate-100 rounded-3xl shadow-xl overflow-hidden animate-fade-in relative">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <LucideHexagon size={120} className="text-black fill-current" />
      </div>

      <div className="bg-yellow-400 p-8 text-center border-b-4 border-black relative overflow-hidden">
        <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-black shadow-lg z-10 relative">
          <LucideUser className="text-black w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-black tracking-tight">Welcome</h2>
        <p className="text-slate-900 font-medium mt-1">Please sign in to proceed</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
          <input
            type="text"
            required
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-yellow-400 outline-none transition-all font-medium"
            placeholder="e.g. Dr. Jane Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">QME License Number</label>
          <input
            type="text"
            required
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-yellow-400 outline-none transition-all font-medium"
            placeholder="e.g. QME-12345"
            value={formData.licenseNumber}
            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black hover:bg-slate-800 text-yellow-400 font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group hover:-translate-y-1"
        >
          Access Portal <LucideArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

const Quiz = ({ user, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [questions] = useState(() => {
    const generated = [];
    const domains = knowledgeBase.knowledge_domains;
    Object.entries(domains).forEach(([key, domain]) => {
      generated.push({
        question: `Which topic falls under the domain of "${key.replace(/_/g, ' ').toUpperCase()}"?`,
        options: [domain.topics[0], domain.topics[1] || "General Knowledge", "Event Planning", "Gaming Strategies"].sort(() => Math.random() - 0.5),
        correctAnswer: domain.topics[0]
      });
      if (domain.dana_responses?.length > 0) {
        generated.push({
          question: `Who would say: "${domain.dana_responses[0]}"?`,
          options: ["Dana (Legal Expert)", "Sherry (Clinical Expert)", "Bob (IT)", "Alice (HR)"],
          correctAnswer: "Dana (Legal Expert)"
        });
      }
    });
    return generated.sort(() => Math.random() - 0.5).slice(0, 5);
  });

  const handleAnswerClick = (option) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    const correct = option === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  if (questions.length === 0) return <div className="text-center p-12 text-slate-500 font-medium">Loading Assessment Data...</div>;

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto animate-scale-in">
        <button onClick={onBack} className="mb-6 text-slate-500 hover:text-black flex items-center gap-2 text-sm font-bold transition-colors">
          <LucideArrowRight className="rotate-180" size={16} /> Back to Dashboard
        </button>
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-10 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-yellow-400"></div>
          <div className="bg-yellow-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-yellow-400">
            <LucideAward className="text-black w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Quiz Complete</h2>
          <p className="text-slate-500 font-medium mb-8">Results for {user.name}</p>
          <div className="flex justify-center items-end gap-2 mb-8">
            <span className="text-6xl font-black text-black">{score}</span>
            <span className="text-2xl text-slate-400 pb-1 font-bold">/ {questions.length}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-4 mb-8 overflow-hidden border border-slate-200">
            <div className="bg-yellow-400 h-full transition-all duration-1000 ease-out" style={{ width: `${(score / questions.length) * 100}%` }}></div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-6 mb-8 border border-yellow-200">
            <p className="text-sm font-semibold text-slate-800">
              {score === questions.length ? "Outstanding! You are a master of the material." :
                score > questions.length / 2 ? "Good work. Review the modules to achieve perfection." :
                  "Review recommended. Please revisit the core learning modules."}
            </p>
          </div>
          <button
            onClick={() => {
              setScore(0);
              setCurrentQuestionIndex(0);
              setShowResult(false);
              setSelectedAnswer(null);
              setIsCorrect(null);
            }}
            className="bg-black text-yellow-400 hover:bg-slate-800 font-bold py-3 px-8 rounded-xl transition-colors shadow-lg"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="mb-6 text-slate-500 hover:text-black flex items-center gap-2 text-sm font-bold transition-colors">
        <LucideArrowRight className="rotate-180" size={16} /> Back to Dashboard
      </button>
      <div className="flex justify-between items-center mb-6 px-1">
        <span className="text-xs font-black text-yellow-600 uppercase tracking-wider bg-yellow-100 px-3 py-1 rounded-full">Question {currentQuestionIndex + 1} of {questions.length}</span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Score: {score}</span>
      </div>
      <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-xl relative">
        <LucideHexagon className="absolute -top-4 -right-4 text-yellow-100 w-24 h-24 -z-10 fill-current" />
        <h3 className="text-xl font-bold text-slate-900 mb-8 leading-relaxed">{currentQuestion.question}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            let stateStyles = "border-slate-200 bg-slate-50 hover:bg-white hover:border-yellow-400 hover:shadow-md text-slate-700";
            if (selectedAnswer === option) {
              stateStyles = isCorrect ? "border-green-500 bg-green-50 text-green-900" : "border-red-500 bg-red-50 text-red-900";
            } else if (selectedAnswer) {
              stateStyles = "border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed";
            }
            return (
              <button
                key={idx}
                onClick={() => handleAnswerClick(option)}
                disabled={!!selectedAnswer}
                className={`w-full text-left p-5 rounded-xl border-2 font-medium transition-all duration-200 flex items-center justify-between group ${stateStyles}`}
              >
                <span>{option}</span>
                {selectedAnswer === option && isCorrect && <LucideCheckCircle size={20} className="text-green-600" />}
                {selectedAnswer === option && !isCorrect && <LucideAlertCircle size={20} className="text-red-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Survey = ({ user, onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ course: '', instructor: '', rating: 5, feedback: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 800);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto animate-scale-in text-center">
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-12 shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-200">
            <LucideCheckCircle className="text-green-600 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Feedback Received</h2>
          <p className="text-slate-500 mb-8 text-lg font-medium">Thank you for helping us improve TeachCE, {user.name}.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setSubmitted(false)} className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors">Submit Another</button>
            <button onClick={onBack} className="text-slate-500 hover:text-black font-bold px-4 py-2">Return Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-6 text-slate-500 hover:text-black flex items-center gap-2 text-sm font-bold transition-colors">
        <LucideArrowRight className="rotate-180" size={16} /> Back to Dashboard
      </button>
      <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-xl">
        <div className="border-b-2 border-slate-100 pb-6 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Course Evaluation</h2>
            <p className="text-slate-500 font-medium mt-1">Share your experience with us.</p>
          </div>
          <span className="text-4xl">📝</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Which course did you attend?</label>
            <div className="relative">
              <select
                required
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-slate-900 appearance-none focus:ring-0 focus:border-yellow-400 outline-none transition-all cursor-pointer font-medium"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              >
                <option value="" className="text-slate-400">Select a course...</option>
                <option value="qme-basics">QME Fundamentals & Ethics</option>
                <option value="report-writing">Advanced Medical Report Writing</option>
                <option value="legal-update">2026 Workers' Comp Legal Update</option>
                <option value="disability-rating">AMA Guides: Disability Rating</option>
              </select>
              <div className="absolute right-4 top-4 pointer-events-none text-slate-400 font-bold">▼</div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Primary Instructor</label>
            <div className="grid grid-cols-2 gap-4">
              {['dana', 'sherry'].map((inst) => (
                <label key={inst} className={`cursor-pointer border-2 rounded-xl p-4 flex items-center gap-4 transition-all ${formData.instructor === inst ? 'bg-yellow-50 border-yellow-400 shadow-md' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                  <input type="radio" name="instructor" value={inst} className="hidden" checked={formData.instructor === inst} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} />
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 ${formData.instructor === inst ? 'bg-yellow-400 border-black text-black' : 'bg-slate-100 border-slate-300 text-slate-400'}`}>
                    {inst === 'dana' ? '⚖️' : '🩺'}
                  </div>
                  <div>
                    <div className={`font-bold capitalize text-lg ${formData.instructor === inst ? 'text-black' : 'text-slate-500'}`}>{inst}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase">{inst === 'dana' ? 'Legal' : 'Clinical'}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Overall Satisfaction</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className={`w-full py-4 rounded-xl border-2 transition-all font-bold text-xl ${formData.rating >= star ? 'bg-yellow-400 border-black text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] translate-y-[-2px]' : 'bg-slate-50 border-slate-200 text-slate-300 hover:bg-white'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Additional Comments</label>
            <textarea
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-0 focus:border-yellow-400 outline-none h-32 resize-none transition-all placeholder-slate-400 font-medium"
              placeholder="Please describe your experience or suggest improvements..."
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-black text-yellow-400 font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-all transform active:scale-[0.99] hover:-translate-y-1">
            Submit Evaluation
          </button>
        </form>
      </div>
    </div>
  );
};

function App() {
  const [mode, setMode] = useState('home');
  const [targetMode, setTargetMode] = useState(null);
  const [user, setUser] = useState(null);

  const handleModeSelect = (selectedMode) => {
    if (user) {
      setMode(selectedMode);
    } else {
      setTargetMode(selectedMode);
      setMode('identify');
    }
  };

  const handleUserIdentify = (userData) => {
    setUser(userData);
    if (targetMode) {
      setMode(targetMode);
      setTargetMode(null);
    } else {
      setMode('home');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0] text-slate-900 font-sans selection:bg-yellow-300 selection:text-black">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40"
        style={{ backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>
      <Header user={user} onLogout={() => { setUser(null); setMode('home'); }} />
      <main className="relative z-10 p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          {mode === 'home' && (
            <div className="mt-8 animate-fade-in">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider border border-yellow-200">
                  Professional Development Platform
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                  Grow Your <span className="relative inline-block">
                    <span className="relative z-10">Expertise</span>
                    <span className="absolute bottom-2 left-0 w-full h-3 bg-yellow-300 -z-0 transform -rotate-1"></span>
                  </span>
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  Access QME assessments, submit evaluations, and track your progress in a streamlined environment.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <button
                  onClick={() => handleModeSelect('quiz')}
                  className="group relative bg-white rounded-[2rem] p-10 transition-all duration-300 hover:-translate-y-2 border-2 border-slate-100 hover:border-black hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] text-left overflow-hidden"
                >
                  <div className="absolute -right-10 -top-10 bg-yellow-50 rounded-full w-64 h-64 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <div className="bg-black w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                      <LucideGraduationCap className="text-yellow-400 w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-3">Knowledge Quiz</h3>
                    <p className="text-slate-500 mb-8 max-w-sm font-medium leading-relaxed">
                      Test your mastery of QME regulations, report writing, and compliance protocols.
                    </p>
                    <div className="flex items-center text-black font-bold group-hover:underline decoration-yellow-400 decoration-4 underline-offset-4">
                      Start Assessment <LucideArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleModeSelect('survey')}
                  className="group relative bg-white rounded-[2rem] p-10 transition-all duration-300 hover:-translate-y-2 border-2 border-slate-100 hover:border-black hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] text-left overflow-hidden"
                >
                  <div className="absolute -right-10 -top-10 bg-yellow-50 rounded-full w-64 h-64 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <div className="bg-yellow-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg border-2 border-black group-hover:-rotate-6 transition-transform">
                      <LucideClipboardList className="text-black w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-3">Course Survey</h3>
                    <p className="text-slate-500 mb-8 max-w-sm font-medium leading-relaxed">
                      Provide critical feedback on instructors and course material to help shape curriculum.
                    </p>
                    <div className="flex items-center text-black font-bold group-hover:underline decoration-yellow-400 decoration-4 underline-offset-4">
                      Begin Survey <LucideArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}
          {mode === 'identify' && <UserEntryForm onComplete={handleUserIdentify} />}
          {mode === 'quiz' && <Quiz user={user} onBack={() => setMode('home')} />}
          {mode === 'survey' && <Survey user={user} onBack={() => setMode('home')} />}
        </div>
      </main>
      <footer className="relative z-10 text-center py-8 text-slate-400 text-sm border-t border-slate-200 mt-12 bg-white/50 backdrop-blur-sm">
        <p className="font-semibold">© 2026 TeachCE. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
