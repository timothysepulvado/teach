import { useState } from 'react';
import PropTypes from 'prop-types';

const Survey = ({ user }) => {
    const [submitted, setSubmitted] = useState(false);

    // Simple state for form
    const [formData, setFormData] = useState({
        course: '',
        instructor: '',
        rating: 5,
        feedback: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate sending data to backend
        console.log('Submitting Survey:', {
            user: user,
            surveyData: formData,
            timestamp: new Date().toISOString()
        });

        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 800);
    };

    if (submitted) {
        return (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 text-center border border-white/20 animate-scale-in">
                <div className="text-6xl mb-6">✨</div>
                <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
                <p className="text-xl opacity-90 mb-8">Your feedback helps us improve the TeachCE experience for everyone.</p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="text-cyan-300 hover:text-white underline cursor-pointer"
                >
                    Submit another response
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Course Feedback</h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Course Selection */}
                <div>
                    <label className="block text-sm font-medium mb-2 opacity-80">Which course did you attend?</label>
                    <select
                        required
                        className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    >
                        <option value="">Select a course...</option>
                        <option value="qme-basics">QME Fundamentals</option>
                        <option value="report-writing">Advanced Report Writing</option>
                        <option value="legal-update">2026 Legal Update</option>
                        <option value="disability-rating">Disability Rating Workshop</option>
                    </select>
                </div>

                {/* Instructor Selection */}
                <div>
                    <label className="block text-sm font-medium mb-2 opacity-80">Primary Instructor</label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-all ${formData.instructor === 'dana' ? 'bg-cyan-500/20 border-cyan-500' : 'border-slate-600 hover:bg-white/5'}`}>
                            <input
                                type="radio"
                                name="instructor"
                                value="dana"
                                className="hidden"
                                checked={formData.instructor === 'dana'}
                                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                            />
                            <span className="text-2xl">👩‍⚖️</span>
                            <span>Dana</span>
                        </label>

                        <label className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-all ${formData.instructor === 'sherry' ? 'bg-cyan-500/20 border-cyan-500' : 'border-slate-600 hover:bg-white/5'}`}>
                            <input
                                type="radio"
                                name="instructor"
                                value="sherry"
                                className="hidden"
                                checked={formData.instructor === 'sherry'}
                                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                            />
                            <span className="text-2xl">👩‍⚕️</span>
                            <span>Sherry</span>
                        </label>
                    </div>
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium mb-2 opacity-80">Overall Satisfaction</label>
                    <div className="flex gap-2 text-2xl">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setFormData({ ...formData, rating: star })}
                                className={`transition-transform hover:scale-110 ${formData.rating >= star ? 'opacity-100' : 'opacity-30 grayscale'}`}
                            >
                                ⭐
                            </button>
                        ))}
                    </div>
                </div>

                {/* Feedback */}
                <div>
                    <label className="block text-sm font-medium mb-2 opacity-80">Additional Comments</label>
                    <textarea
                        className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none h-32 resize-none"
                        placeholder="What did you like? What could be improved?"
                        value={formData.feedback}
                        onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    ></textarea>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all"
                    >
                        Submit Feedback
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Survey;

Survey.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        licenseNumber: PropTypes.string
    })
};
