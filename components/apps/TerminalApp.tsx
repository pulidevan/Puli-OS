import React, { useState, useEffect, useRef } from 'react';
import { sendTerminalMessage } from '../../services/gemini';
import { ChatMessage } from '../../types';

export const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'system', text: 'Initializing PulidevanOS Kernel v2.5...' },
    { role: 'system', text: 'Connecting to Neural Network...' },
    { role: 'model', text: 'Connection Established. Welcome, Guest. Type "help" for commands or ask me anything about Pulidevan.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Simulate network delay for effect
    const responseText = await sendTerminalMessage(history, userMsg.text);
    
    setHistory(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-96 bg-black text-green-500 font-mono text-sm p-2">
      <div className="flex-grow overflow-y-auto space-y-1 mb-2">
        {history.map((msg, idx) => (
          <div key={idx} className={`${msg.role === 'user' ? 'text-white' : 'text-green-500'} break-words`}>
            <span className="opacity-50 mr-2 select-none">
                {msg.role === 'user' ? '>' : msg.role === 'system' ? '#' : '$'}
            </span>
            {msg.text}
          </div>
        ))}
        {loading && (
            <div className="text-green-500 animate-pulse">
                $ Processing request... [||||||    ]
            </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 pt-2 shrink-0">
        <span className="text-green-500 select-none">{'>'}</span>
        <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-gray-300 text-black border-none outline-none focus:ring-0 placeholder-gray-600 px-1 text-base md:text-sm"
            placeholder="Enter command..."
            autoFocus
            autoComplete="off"
        />
      </form>
    </div>
  );
};
