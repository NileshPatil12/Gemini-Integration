import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function ChatResponse({ response }) {
  const [copyText, setCopyText] = useState('Copy');
  
  // If there is no response, don't render anything.
  if (!response) {
    return null;
  }

  /**
   * Handles the click event for the 'Copy' button.
   * Uses the browser's Clipboard API to copy the response text.
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(response).then(() => {
      setCopyText('Copied!'); // Provide user feedback.
      // Reset the button text back to 'Copy' after 2 seconds.
      setTimeout(() => setCopyText('Copy'), 2000);
    });
  };

  return (
    <div className="card chat-response-card">
      {/* This header holds the 'Copy' button, positioned to the right. */}
      <div className="card-header bg-transparent border-0 d-flex justify-content-end py-2 pe-3">
        <button className="btn btn-sm btn-outline-secondary" onClick={handleCopy}>
          {copyText}
        </button>
      </div>
      <div className="card-body text-start pt-0">
        {/* The ReactMarkdown component safely renders text with Markdown formatting (like lists, bold, etc.) */}
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ChatResponse;