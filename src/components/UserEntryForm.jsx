import { useState } from 'react';
import PropTypes from 'prop-types';

const UserEntryForm = ({ onComplete }) => {
    const [formData, setFormData] = useState({
        name: '',
        licenseNumber: '',
        email: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.licenseNumber) {
            onComplete(formData);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl animate-fade-in">
            <div className="text-center mb-8">
                <div className="text-5xl mb-4">🪪</div>
                <h2 className="text-2xl font-bold">Welcome, Doctor</h2>
                <p className="opacity-80 mt-2">Please identify yourself to proceed with the assessment.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2 opacity-80">Full Name</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all"
                        placeholder="Dr. Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 opacity-80">QME License Number</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all"
                        placeholder="QME-12345"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 opacity-80">Email Address (Optional)</label>
                    <input
                        type="email"
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all"
                        placeholder="doctor@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                >
                    Continue
                </button>
            </form>
        </div>
    );
};

UserEntryForm.propTypes = {
    onComplete: PropTypes.func.isRequired
};

export default UserEntryForm;
