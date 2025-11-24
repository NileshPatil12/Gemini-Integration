import { useState } from 'react';

// This component is a "controlled component". Its value is controlled by React state.
function ChatInput({ onSubmit, loading }) {
  // 'question': Stores the text currently typed in the textarea.
  const [question, setQuestion] = useState('');

  /**
   * Handles the form submission when the 'Send' button is clicked.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page.
    // Don't submit if the input is empty or if the app is already loading a response.
    if (!question.trim() || loading) return;

    onSubmit(question); // Pass the question to the parent component (App.jsx).
    setQuestion(''); // Clear the textarea after submitting.
  };

  /**
   * Handles key presses in the textarea.
   * Submits the form on 'Enter' but allows new lines with 'Shift + Enter'.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents adding a new line
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <textarea
          className="form-control"
          placeholder="Ask Gemini anything..."
          value={question} // The value is tied to our state.
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          rows="1"
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>Send</button>
      </div>
    </form>
  );
}

export default ChatInput;