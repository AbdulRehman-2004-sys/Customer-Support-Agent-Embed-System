(function() {
  // Styles for the chat widget
  const styles = `
    #sliceai-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: system-ui, -apple-system, sans-serif;
    }
    #sliceai-chat-window {
      display: none;
      width: 350px;
      height: 500px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 5px 25px rgba(0,0,0,0.15);
      flex-direction: column;
      overflow: hidden;
      margin-bottom: 15px;
      border: 1px solid #eaeaea;
    }
    #sliceai-chat-header {
      background: #10b981;
      color: white;
      padding: 15px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
    }
    #sliceai-chat-header-close {
      cursor: pointer;
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      line-height: 1;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    #sliceai-chat-header-close:hover {
      opacity: 1;
    }
    #sliceai-chat-messages {
      flex: 1;
      padding: 15px;
      overflow-y: auto;
      background: #f9fafb;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .sliceai-message {
      max-width: 85%;
      padding: 12px 16px;
      border-radius: 18px;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
    }
    .sliceai-message-user {
      align-self: flex-end;
      background: #10b981;
      color: white;
      border-bottom-right-radius: 4px;
    }
    .sliceai-message-bot {
      align-self: flex-start;
      background: white;
      color: #374151;
      border: 1px solid #e5e7eb;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    #sliceai-chat-input-container {
      padding: 12px;
      background: white;
      border-top: 1px solid #eaeaea;
      display: flex;
      gap: 10px;
      align-items: center;
    }
    #sliceai-chat-input {
      flex: 1;
      padding: 10px 14px;
      border: 1px solid #d1d5db;
      border-radius: 20px;
      outline: none;
      font-size: 14px;
      transition: border-color 0.2s;
    }
    #sliceai-chat-input:focus {
      border-color: #10b981;
    }
    #sliceai-chat-send {
      background: #10b981;
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }
    #sliceai-chat-send:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
    #sliceai-chat-send:active:not(:disabled) {
      transform: scale(0.95);
    }
    #sliceai-widget-button {
      background: #10b981;
      color: white;
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(16,185,129,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #sliceai-widget-button:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(16,185,129,0.5);
    }
    #sliceai-widget-button svg {
      width: 30px;
      height: 30px;
    }
    .sliceai-loading-dots {
      display: flex;
      gap: 5px;
      padding: 6px 4px;
    }
    .sliceai-dot {
      width: 8px;
      height: 8px;
      background: #9ca3af;
      border-radius: 50%;
      animation: sliceai-bounce 1.4s infinite ease-in-out both;
    }
    .sliceai-dot:nth-child(1) { animation-delay: -0.32s; }
    .sliceai-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes sliceai-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
  `;

  // Inject styles
  const styleTag = document.createElement('style');
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);

  // Widget structure
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'sliceai-widget-container';

  widgetContainer.innerHTML = `
    <div id="sliceai-chat-window">
      <div id="sliceai-chat-header">
        <span>Support Chat</span>
        <button id="sliceai-chat-header-close">&times;</button>
      </div>
      <div id="sliceai-chat-messages">
        <div class="sliceai-message sliceai-message-bot">Hi! How can I assist you today?</div>
      </div>
      <form id="sliceai-chat-input-container">
        <input type="text" id="sliceai-chat-input" placeholder="Type a message..." autocomplete="off">
        <button type="submit" id="sliceai-chat-send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px; transform: translateX(-1px) translateY(1px)"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </form>
    </div>
    <button id="sliceai-widget-button">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    </button>
  `;

  document.body.appendChild(widgetContainer);

  // Elements
  const chatWindow = document.getElementById('sliceai-chat-window');
  const chatButton = document.getElementById('sliceai-widget-button');
  const closeButton = document.getElementById('sliceai-chat-header-close');
  const chatForm = document.getElementById('sliceai-chat-input-container');
  const chatInput = document.getElementById('sliceai-chat-input');
  const messagesContainer = document.getElementById('sliceai-chat-messages');
  const sendButton = document.getElementById('sliceai-chat-send');

  // Toggle chat window
  let isOpen = false;
  
  function toggleChat() {
    isOpen = !isOpen;
    chatWindow.style.display = isOpen ? 'flex' : 'none';
    if (isOpen) {
      chatInput.focus();
    }
  }

  chatButton.addEventListener('click', toggleChat);
  closeButton.addEventListener('click', toggleChat);

  // Add message to chat
  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `sliceai-message sliceai-message-${sender}`;
    
    // Simple sanitization and newline to br logic
    if (sender === 'bot') {
      const sanitized = document.createElement('div');
      sanitized.textContent = text;
      const formattedText = sanitized.innerHTML.replace(/\n/g, '<br>');
      msgDiv.innerHTML = formattedText;
    } else {
      msgDiv.textContent = text;
    }
    
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Show loading indicator
  function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'sliceai-message sliceai-message-bot sliceai-loading';
    loadingDiv.id = 'sliceai-loading-indicator';
    loadingDiv.innerHTML = `
      <div class="sliceai-loading-dots">
        <div class="sliceai-dot"></div>
        <div class="sliceai-dot"></div>
        <div class="sliceai-dot"></div>
      </div>
    `;
    messagesContainer.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Remove loading indicator
  function removeLoading() {
    const loadingDiv = document.getElementById('sliceai-loading-indicator');
    if (loadingDiv) {
      loadingDiv.remove();
    }
  }

  // Handle form submission
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    // Add user message
    addMessage(text, 'user');
    chatInput.value = '';
    chatInput.disabled = true;
    sendButton.disabled = true;

    // Show loading
    showLoading();

    try {
      // Call backend API layer on port 5000
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text })
      });

      const data = await response.json();
      removeLoading();
      
      if (response.ok && data.answer) {
        addMessage(data.answer, 'bot');
      } else {
        addMessage(data.error || 'Sorry, something went wrong computing response.', 'bot');
      }
    } catch (error) {
      removeLoading();
      addMessage('Failed to connect to the backend server. Make sure it is running.', 'bot');
    } finally {
      chatInput.disabled = false;
      sendButton.disabled = false;
      chatInput.focus();
    }
  });

})();
