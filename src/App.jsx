import { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, GraduationCap, ClipboardList, PenTool, User, LogOut } from 'lucide-react';
import knowledgeBase from './teachce_knowledge_base.json';

// --- Helper: Generate Questions ---
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

function App() {
  const [mode, setMode] = useState('home'); // 'home', 'quiz', 'survey', 'identify'
  const [targetMode, setTargetMode] = useState(null);
  const [user, setUser] = useState(null);

  // --- User Identification Component ---
  const UserIdentification = () => {
    const [formData, setFormData] = useState({ name: '', license: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.name && formData.license) {
        setUser({ name: formData.name, licenseNumber: formData.license });
        setMode(targetMode || 'home');
        setTargetMode(null);
      }
    };

    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black animate-fade-in text-center">
        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black">
          <User size={40} className="text-black" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Identify Yourself</h2>
        <p className="text-gray-600 mb-8">Please enter your QME details to proceed.</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block font-bold text-sm mb-1 ml-1">Full Name</label>
            <input
              required
              className="w-full bg-cream border-2 border-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-black transition-all"
              placeholder="Dr. Jane Doe"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-bold text-sm mb-1 ml-1">License Number</label>
            <input
              required
              className="w-full bg-cream border-2 border-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-black transition-all"
              placeholder="QME-123456"
              value={formData.license}
              onChange={e => setFormData({ ...formData, license: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-yellow-400 hover:text-black transition-all border-2 border-transparent hover:border-black mt-4">
            Continue &rarr;
          </button>
        </form>
      </div>
    );
  };

  // --- Quiz Component ---
  const Quiz = () => {
    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isCORRECT, setIsCORRECT] = useState(null);
    const [questions] = useState(() => generateQuestions());

    useEffect(() => {
      console.log("Quiz started for", user);
    }, []);

    const handleAnswer = (opt) => {
      setSelected(opt);
      const correct = opt === questions[qIndex].correctAnswer;
      setIsCORRECT(correct);
      if (correct) setScore(s => s + 1);

      setTimeout(() => {
        if (qIndex + 1 < questions.length) {
          setQIndex(i => i + 1);
          setSelected(null);
          setIsCORRECT(null);
        } else {
          setFinished(true);
        }
      }, 1200);
    };

    if (finished) return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
        <div className="inline-block p-4 bg-yellow-400 rounded-full border-2 border-black mb-6">
          <GraduationCap size={48} />
        </div>
        <h2 className="text-3xl font-black mb-4">Quiz Complete!</h2>
        <div className="text-6xl font-black mb-2 text-yellow-500">{score}/{questions.length}</div>
        <p className="text-gray-600 mb-8">Score recorded for {user.name}</p>
        <button onClick={() => setMode('home')} className="bg-black text-yellow-400 font-bold py-3 px-8 rounded-full border-2 border-black hover:bg-white hover:text-black transition-all">
          Return Home
        </button>
      </div>
    );

    const question = questions[qIndex];

    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex justify-between items-center text-sm font-bold text-gray-400">
          <span>QUESTION {qIndex + 1} OF {questions.length}</span>
          <span>SCORE: {score}</span>
        </div>
        <div className="bg-white rounded-3xl p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-bold mb-8">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((opt, i) => (
              <button
                key={i}
                disabled={!!selected}
                onClick={() => handleAnswer(opt)}
                className={`w-full text-left p-4 rounded-xl border-2 font-bold transition-all ${selected === opt
                    ? (isCORRECT ? 'bg-green-400 border-black text-black' : 'bg-red-400 border-black text-black')
                    : 'bg-gray-50 border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 text-gray-700'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span>{opt}</span>
                  {selected === opt && (isCORRECT ? <CheckCircle size={20} /> : <span>✕</span>)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // --- Survey Component ---
  const Survey = () => {
    const [done, setDone] = useState(false);
    const handleSubmit = (e) => {
      e.preventDefault();
      setDone(true);
    };

    if (done) return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
        <div className="inline-block p-4 bg-yellow-400 rounded-full border-2 border-black mb-6">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-black mb-4">Feedback Sent!</h2>
        <p className="text-gray-600 mb-8">Thank you for helping us improve, {user.name}.</p>
        <button onClick={() => setMode('home')} className="bg-black text-yellow-400 font-bold py-3 px-8 rounded-full border-2 border-black hover:bg-white hover:text-black transition-all">
          Return Home
        </button>
      </div>
    );

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
          <ClipboardList className="text-yellow-500" /> Course Survey
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-bold text-sm mb-2">Subject</label>
            <select className="w-full bg-gray-50 border-2 border-black rounded-xl p-3 focus:ring-yellow-400 focus:outline-none">
              <option>QME Fundamentals</option>
              <option>Report Writing</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-sm mb-2">Comments</label>
            <textarea className="w-full h-32 bg-gray-50 border-2 border-black rounded-xl p-3 focus:ring-yellow-400 focus:outline-none resize-none" placeholder="Your feedback..." />
          </div>
          <button className="w-full bg-yellow-400 text-black font-black py-4 rounded-xl border-2 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            SUBMIT FEEDBACK
          </button>
        </form>
      </div>
    );
  };

  // --- Main Layout logic ---
  const handleNav = (target) => {
    if (user) setMode(target);
    else {
      setTargetMode(target);
      setMode('identify');
    }
  };

  return (
    <div className="min-h-screen text-black font-sans selection:bg-yellow-200">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-lg border-2 border-black">
              <BookOpen size={24} />
            </div>
            <span className="text-2xl font-black tracking-tight">TeachCE</span>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <div className="font-bold text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">{user.licenseNumber}</div>
              </div>
              <button onClick={() => { setUser(null); setMode('home'); }} className="p-2 hover:bg-gray-100 rounded-full border-2 border-transparent hover:border-black transition-all" title="Log Out">
                <LogOut size={20} />
              </button>
            </div>
          )}
        </header>

        {/* Content Switcher */}
        {mode === 'home' && (
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Expert <span className="text-white bg-black px-4 transform -rotate-2 inline-block">Learning</span> Portal
            </h1>
            <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
              Welcome to the official continuing education hub. Verify your knowledge or provide course feedback.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <button onClick={() => handleNav('quiz')} className="group relative bg-white p-8 rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all text-left">
                <div className="mb-6 bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-black group-hover:bg-yellow-400 transition-colors">
                  <PenTool size={32} />
                </div>
                <h3 className="text-2xl font-black mb-2">Take a Quiz</h3>
                <p className="text-gray-600">Challenge Dana and Sherry on QME regulations.</p>
              </button>

              <button onClick={() => handleNav('survey')} className="group relative bg-white p-8 rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all text-left">
                <div className="mb-6 bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-black group-hover:bg-blue-400 transition-colors">
                  <ClipboardList size={32} />
                </div>
                <h3 className="text-2xl font-black mb-2">Course Survey</h3>
                <p className="text-gray-600">Give feedback on your recent sessions.</p>
              </button>
            </div>
          </div>
        )}

        {mode === 'identify' && (
          <div>
            <button onClick={() => setMode('home')} className="mb-8 font-bold flex items-center gap-2 hover:underline">← Back</button>
            <UserIdentification />
          </div>
        )}

        {(mode === 'quiz' || mode === 'survey') && (
          <div className="animate-fade-in">
            <button onClick={() => setMode('home')} className="mb-8 font-bold flex items-center gap-2 hover:underline">← Return to Dashboard</button>
            {mode === 'quiz' ? <Quiz /> : <Survey />}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
