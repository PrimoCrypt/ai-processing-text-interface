"use client";

import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import LanguageSelector from "@/components/LanguageSelector";
import { detectLanguage, summarizeText, translateText } from "@/utils/aiUtils";

const languages = [
	{ code: "en", name: "English" },
	{ code: "pt", name: "Portuguese" },
	{ code: "es", name: "Spanish" },
	{ code: "ru", name: "Russian" },
	{ code: "tr", name: "Turkish" },
	{ code: "fr", name: "French" },
];

export default function Home() {
	const [messages, setMessages] = useState<
		Array<{ text: string; isUser: boolean; language?: string; isTranslated?: boolean; referenceText?: string }>
	>([]);
	const [selectedLanguage, setSelectedLanguage] = useState("en");
	const [loading, setLoading] = useState<boolean>(false);

	const handleSendMessage = async (text: string) => {
		setMessages((prev) => [...prev, { text, isUser: true }]);

		try {
			setLoading(true);
			const detectedLanguage = await detectLanguage(text);
			const newMessage = { text, isUser: false, language: detectedLanguage };
			setMessages((prev) => [...prev, newMessage]);
		} catch (error) {
			console.error("Error detecting language:", error);
			setMessages((prev) => [...prev, { text: "Error detecting language", isUser: false }]);
		} finally {
			setLoading(false);
		}
	};

	const handleSummarize = async (text: string, language: string) => {
		try {
			setLoading(true);
			let summary;
			summary = await summarizeText(text);
			if (language !== "en") {
				summary = await translateText(summary as string, "en", language);
			}
			setMessages((prev) => [...prev, { text: `Summary: ${summary}`, isUser: false, referenceText: text , language}]);
		} catch (error) {
			console.error("Error summarizing text:", error);
			setMessages((prev) => [...prev, { text: "Error summarizing text", isUser: false }]);
		} finally {
			setLoading(false);
		}
	};

	const handleTranslate = async (text: string, sourceLanguage: string) => {
		const fullNameLanguage = languages.find((lang) => lang.code === selectedLanguage)?.name;
		try {
			setLoading(true);
			const translatedText = await translateText(text, sourceLanguage, selectedLanguage);
			setMessages((prev) => [
				...prev,
				{
					text: translatedText ? translatedText : `Unable to Translate to ${fullNameLanguage}`,
					referenceText: text,
					isUser: false,
					language: selectedLanguage,
					isTranslated: translatedText ? true : false,
				},
			]);
		} catch (error) {
			console.error("Error translating text:", error);
			setMessages((prev) => [...prev, { text: "Error translating text", isUser: false }]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className=" min-h-screen bg-gray-900 text-white flex items-center justify-center">
			<div className="max-w-3xl pt-16 relative w-full bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700">
				<ChatInterface
					messages={messages}
					loading={loading}
					onSendMessage={handleSendMessage}
					onSummarize={handleSummarize}
					onTranslate={handleTranslate}
				/>
				<div className=" top-0 px-2 py-2 pl-4 w-full absolute flex  items-center justify-between bg-gray-850">
					<div className="text-2xl font-semibold">Leo&apos;s AI Text Processing Bot ✨</div>
					<LanguageSelector selectedLanguage={selectedLanguage} onSelectLanguage={setSelectedLanguage} />
				</div>
			</div>
		</div>
	);
}
