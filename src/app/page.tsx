'use client'

import { useState } from 'react'
import ChatInterface from '@/components/ChatInterface'
import LanguageSelector from '@/components/LanguageSelector'
import { detectLanguage, summarizeText, translateText } from '@/utils/aiUtils'

export default function Home() {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; language?: string }>>([])
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const handleSendMessage = async (text: string) => {
    setMessages(prev => [...prev, { text, isUser: true }])
    
    try {
      const detectedLanguage = await detectLanguage(text)
      const newMessage = { text, isUser: false, language: detectedLanguage }
      setMessages(prev => [...prev, newMessage])
    } catch (error) {
      console.error('Error detecting language:', error)
      setMessages(prev => [...prev, { text: 'Error detecting language', isUser: false }])
    }
  }

  const handleSummarize = async (text: string) => {
    try {
      const summary = await summarizeText(text)
      setMessages(prev => [...prev, { text: `Summary: ${summary}`, isUser: false }])
    } catch (error) {
      console.error('Error summarizing text:', error)
      setMessages(prev => [...prev, { text: 'Error summarizing text', isUser: false }])
    }
  }

  const handleTranslate = async (text: string, targetLanguage: string) => {
    try {
      const translatedText = await translateText(text, targetLanguage)
      setMessages(prev => [...prev, { text: `Translated: ${translatedText}`, isUser: false }])
    } catch (error) {
      console.error('Error translating text:', error)
      setMessages(prev => [...prev, { text: 'Error translating text', isUser: false }])
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          onSummarize={handleSummarize}
          onTranslate={handleTranslate}
        />
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
        />
      </div>
    </div>
  )
}