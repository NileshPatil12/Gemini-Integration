import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatInput from './components/ChatInput'
import ChatResponse from './components/ChatResponse'
import { fetchChatResponse } from './services/api';

function App() {
  // --- STATE MANAGEMENT ---
  // 'response': Stores the answer from the Gemini API. Starts as null.
  const [response, setResponse] = useState(null);
  // 'loading': A boolean to know when the API is fetching a response. Used to show a spinner.
  const [loading, setLoading] = useState(false);
  // 'theme': Manages the app's theme ('light' or 'dark').
  // It reads the saved theme from localStorage to remember the user's choice.
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // --- FUNCTIONS ---

  /**
   * This function is called when a user submits a question.
   * It handles the API call to Gemini.
   */
  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    try {
      const apiResponse = await fetchChatResponse(question);
      setResponse(apiResponse);
    } catch (error) {
      alert("Failed to get response")
    } finally {
      setLoading(false);
    }
  }

  /**
   * Toggles the theme between 'light' and 'dark'.
   */
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // --- SIDE EFFECTS ---

  /**
   * This 'useEffect' hook runs whenever the 'theme' state changes.
   * 1. It sets a 'data-bs-theme' attribute on the main HTML tag to apply Bootstrap's dark/light mode.
   * 2. It saves the current theme to localStorage so it's remembered on the next visit.
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // --- RENDER ---
  return (
    <div className='App d-flex flex-column min-vh-100'>
      <header className='app-header text-white text-center py-3 shadow-sm'>
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className='app-title mb-0'>Gemini ChatBot</h1>
          <div className="form-check form-switch fs-5 text-white"><input className="form-check-input" type="checkbox" role="switch" id="theme-switcher" onChange={toggleTheme} checked={theme === 'dark'} /><label className="form-check-label" htmlFor="theme-switcher">{theme === 'dark' ? '🌙' : '☀️'}</label></div>
        </div>
      </header>
      <main className='container my-4 flex-grow-1'>
        <div className='row justify-content-center'>
          <div className='col-md-10 col-lg-8'>
            <ChatInput onSubmit={handleQuestionSubmit} loading={loading} />
            {loading && <div className="text-center my-4"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>}
            {response && <ChatResponse response={response} />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App