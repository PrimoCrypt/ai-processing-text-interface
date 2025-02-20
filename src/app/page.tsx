"use client";

import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import LanguageSelector from "@/components/LanguageSelector";
import { detectLanguage, summarizeText, translateText } from "@/utils/aiUtils";

export default function Home() {
	const [messages, setMessages] = useState<
		Array<{ text: string; isUser: boolean; language?: string; isTranslated?: boolean; referenceText?: string }>
	>([]);
	const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [loading, setLoading]= useState<boolean>(false)

	const handleSendMessage = async (text: string) => {
		setMessages((prev) => [...prev, { text, isUser: true }]);

		try {
      setLoading(true)
			const detectedLanguage = await detectLanguage(text);
			const newMessage = { text, isUser: false, language: detectedLanguage };
			setMessages((prev) => [...prev, newMessage]);
		} catch (error) {
			console.error("Error detecting language:", error);
			setMessages((prev) => [...prev, { text: "Error detecting language", isUser: false }]);
		} finally{
      setLoading(false)
    }
	};

	const handleSummarize = async (text: string) => {
		try {
      setLoading(true)
			const summary = await summarizeText(text);
			setMessages((prev) => [...prev, { text: `Summary: ${summary}`, isUser: false, referenceText: text }]);
		} catch (error) {
			console.error("Error summarizing text:", error);
			setMessages((prev) => [...prev, { text: "Error summarizing text", isUser: false }]);
		} finally{
      setLoading(false)
    }
	};

	const handleTranslate = async (text: string, sourceLanguage: string) => {
		try {
      setLoading(true)
			const translatedText = await translateText(text, sourceLanguage, selectedLanguage);
			setMessages((prev) => [
				...prev,
				{
					text: translatedText ? translatedText : "Unable to Translate",
					referenceText: text,
					isUser: false,
					language: selectedLanguage,
					isTranslated: translatedText ? true : false,
				},
			]);
		} catch (error) {
			console.error("Error translating text:", error);
			setMessages((prev) => [...prev, { text: "Error translating text", isUser: false }]);
		} finally{
      setLoading(false)
    }
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
			<div className="max-w-3xl w-full bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
				<ChatInterface
					messages={messages}
          loading={loading}
					onSendMessage={handleSendMessage}
					onSummarize={handleSummarize}
					onTranslate={handleTranslate}
				/>
				<div className="p-4 border-t border-gray-700 bg-gray-850">
					<LanguageSelector selectedLanguage={selectedLanguage} onSelectLanguage={setSelectedLanguage} />
				</div>
			</div>
		</div>
	);
}
