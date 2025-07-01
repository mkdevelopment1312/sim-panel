
// Copyright © 2025 Kamil Maslanka
import React, { useState } from 'react';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [currentSection, setCurrentSection] = useState<'home' | 'auth' | 'dashboard'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const renderHome = (): JSX.Element => (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 border-b border-green-500">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-400 font-mono">SIM Panel</h1>
          <button 
            onClick={() => setCurrentSection('auth')}
            className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400 transition-colors font-mono"
          >
            Login
          </button>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-green-400 font-mono">
            Professional SIM Registration
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Secure and efficient SIM card registration service with modern technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-800 p-8 rounded border border-blue-500">
            <h3 className="text-2xl font-bold mb-4 text-blue-400 font-mono">Fast Processing</h3>
            <p className="text-gray-300">Quick and efficient SIM card registration process</p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded border border-blue-500">
            <h3 className="text-2xl font-bold mb-4 text-blue-400 font-mono">Secure</h3>
            <p className="text-gray-300">Advanced security measures to protect your data</p>
          </div>
          
          <div className="bg-gray-800 p-8 rounded border border-blue-500">
            <h3 className="text-2xl font-bold mb-4 text-blue-400 font-mono">Professional</h3>
            <p className="text-gray-300">Professional service with expert support</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAuth = (): JSX.Element => (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded border border-green-500 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-400 font-mono">Login</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
            <input 
              type="email" 
              className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
            <input 
              type="password" 
              className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-white focus:border-green-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            onClick={() => {
              setIsAuthenticated(true);
              setCurrentSection('dashboard');
            }}
            className="w-full bg-green-500 text-black py-3 rounded font-bold hover:bg-green-400 transition-colors font-mono"
          >
            Login
          </button>
          
          <button 
            onClick={() => setCurrentSection('home')}
            className="w-full bg-gray-600 text-white py-3 rounded font-bold hover:bg-gray-500 transition-colors font-mono"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  const renderDashboard = (): JSX.Element => (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 border-b border-green-500">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-400 font-mono">SIM Panel Dashboard</h1>
          <button 
            onClick={() => {
              setIsAuthenticated(false);
              setCurrentSection('home');
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors font-mono"
          >
            Logout
          </button>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-green-400 font-mono">Welcome to Dashboard</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded border border-blue-500">
            <h3 className="text-xl font-bold mb-4 text-blue-400 font-mono">Register SIM</h3>
            <p className="text-gray-300 mb-4">Register a new SIM card</p>
            <button className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400 transition-colors font-mono">
              Start Registration
            </button>
          </div>
          
          <div className="bg-gray-800 p-6 rounded border border-blue-500">
            <h3 className="text-xl font-bold mb-4 text-blue-400 font-mono">View Records</h3>
            <p className="text-gray-300 mb-4">View existing SIM records</p>
            <button className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400 transition-colors font-mono">
              View Records
            </button>
          </div>
          
          <div className="bg-gray-800 p-6 rounded border border-blue-500">
            <h3 className="text-xl font-bold mb-4 text-blue-400 font-mono">Support</h3>
            <p className="text-gray-300 mb-4">Get help and support</p>
            <button className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400 transition-colors font-mono">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {currentSection === 'home' && renderHome()}
      {currentSection === 'auth' && renderAuth()}
      {currentSection === 'dashboard' && isAuthenticated && renderDashboard()}
    </div>
  );
};

export default App;
