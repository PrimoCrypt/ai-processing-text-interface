import { useState, useRef, useEffect } from 'react'
import { Send, Minimize2, Languages } from 'lucide-react'

interface Message {
  text: string
  isUser: boolean
  language?: string
}

interface ChatInterfaceProps {
  messages: Message[]
  onSendMessage: (text: string) => void
  onSummarize: (text: string) => void
  onTranslate: (text: string, targetLanguage: string) => void
}

export default function ChatInterface({ messages, onSendMessage, onSummarize, onTranslate }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <p>{message.text}</p>
              {message.language && <p className="text-xs mt-1">Language: {message.language}</p>}
              {!message.isUser && message.text.length > 150 && (
                <button
                  onClick={() => onSummarize(message.text)}
                  className="mt-2 text-sm bg-white text-blue-500 px-2 py-1 rounded"
                  aria-label="Summarize text"
                >
                  <Minimize2 size={16} className="inline mr-1" /> Summarize
                </button>
              )}
              {!message.isUser && (
                <button
                  onClick={() => onTranslate(message.text, 'en')} // Default to English for simplicity
                  className="mt-2 ml-2 text-sm bg-white text-blue-500 px-2 py-1 rounded"
                  aria-label="Translate text"
                >
                  <Languages size={16} className="inline mr-1" /> Translate
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Message input"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  )
}