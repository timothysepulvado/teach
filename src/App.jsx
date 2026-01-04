import { useState } from 'react';
import Quiz from './components/Quiz';
import Survey from './components/Survey';
import UserEntryForm from './components/UserEntryForm';

function App() {
  const [mode, setMode] = useState('home'); // 'home', 'quiz', 'survey', 'identify'
  const [targetMode, setTargetMode] = useState(null); // Mode user wants to access
  const [user, setUser] = useState(null); // User identification data

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
    <div className="min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">🎓 TeachCE Portal</h1>
          <p className="text-xl opacity-90">Continuing Education & Feedback</p>
          {user && (
            <div className="mt-4 inline-block bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/10 animate-fade-in">
              👤 {user.name} ({user.licenseNumber})
            </div>
          )}
          {user && mode !== 'home' && (
            <button
              onClick={() => { setUser(null); setMode('home'); }} // Corrected onClick to ensure both actions happen
              className="block mx-auto mt-2 text-xs opacity-50 hover:opacity-100 hover:underline"
            >
              Log Out
            </button>
          )}
        </header>

        {/* Main Content */}
        <main>
          {mode === 'home' && (
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <button
                onClick={() => handleModeSelect('quiz')}
                className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-2xl p-8 transition-all hover:-translate-y-2 hover:shadow-xl border border-white/20 text-left"
              >
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-2xl font-bold mb-2">Take a Quiz</h2>
                <p className="opacity-80">Test your knowledge on QME regulations and report writing. Challenge Dana and Sherry!</p>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  ➡️
                </div>
              </button>

              <button
                onClick={() => handleModeSelect('survey')}
                className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-2xl p-8 transition-all hover:-translate-y-2 hover:shadow-xl border border-white/20 text-left"
              >
                <div className="text-6xl mb-4">📊</div>
                <h2 className="text-2xl font-bold mb-2">Course Survey</h2>
                <p className="opacity-80">Provide feedback on your recent courses to help us improve the TeachCE experience.</p>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  ➡️
                </div>
              </button>
            </div>
          )}

          {mode === 'identify' && (
            <div>
              <button
                onClick={() => setMode('home')}
                className="mb-8 flex items-center gap-2 hover:text-cyan-300 transition-colors"
              >
                ⬅ Cancel
              </button>
              <UserEntryForm onComplete={handleUserIdentify} />
            </div>
          )}

          {mode === 'quiz' && (
            <div className="animate-fade-in">
              <button
                onClick={() => setMode('home')}
                className="mb-8 flex items-center gap-2 hover:text-cyan-300 transition-colors"
              >
                ⬅ Back to Home
              </button>
              <Quiz user={user} />
            </div>
          )}

          {mode === 'survey' && (
            <div className="animate-fade-in">
              <button
                onClick={() => setMode('home')}
                className="mb-8 flex items-center gap-2 hover:text-cyan-300 transition-colors"
              >
                ⬅ Back to Home
              </button>
              <Survey user={user} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-20 opacity-60 text-sm">
          <p>© 2026 TeachCE. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
