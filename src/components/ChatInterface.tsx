import { useState, useRef, useEffect } from "react";
import { Send, Minimize2, Languages } from "lucide-react";

interface Message {
  referenceText?: string
	text: string;
	isUser: boolean;
	language?: string;
	isTranslated?: boolean;
}

interface ChatInterfaceProps {
	messages: Message[];
  loading: boolean;
	onSendMessage: (text: string) => void;
	onSummarize: (text: string) => void;
	onTranslate: (text: string, targetLanguage: string) => void;
}

export default function ChatInterface({ messages, onSendMessage, onSummarize, onTranslate, loading }: ChatInterfaceProps) {
	const [input, setInput] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (input.trim()) {
			onSendMessage(input.trim());
			setInput("");
		}
	};

	return (
		<div className="flex flex-col h-[80vh] bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
			<div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
				{messages.map((message, index) => (
					<div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
						<div
							className={`max-w-[70%] p-3 rounded-xl shadow-md ${
								message.isUser ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"
							}`}>
                <p>{(message.isTranslated && message.referenceText) && `Text: ${message.referenceText}`}</p>
							<p>{message.isTranslated ? `Translated: ${message.text}` : message.text}</p>
							{message.language && <p className="text-xs mt-1 text-gray-400">Language: {message.language}</p>}
							{!message.isUser && message.text.length > 150 && (
								<button
									onClick={() => onSummarize(message.text)}
									className="mt-2 text-sm bg-gray-700 text-blue-400 px-3 py-1 rounded-lg hover:bg-gray-600 transition"
									aria-label="Summarize text">
									<Minimize2 size={16} className="inline mr-1" /> Summarize
								</button>
							)}
							{!message.isUser && (
								<button
									onClick={() => onTranslate(message.text, message.language ?? "en")}
									className="mt-2 ml-2 text-sm bg-gray-700 text-green-400 px-3 py-1 rounded-lg hover:bg-gray-600 transition"
									aria-label="Translate text">
									<Languages size={16} className="inline mr-1" /> Translate
								</button>
							)}
						</div>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>
			<form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-800 rounded-b-lg">
				<div className="flex items-center">
					<input
						type="text"
						value={input}
            disabled={loading}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type your message..."
						className="flex-1 p-3 bg-gray-700 text-white border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						aria-label="Message input"
					/>
					<button
						type="submit"
						className={`bg-blue-600 ${loading ?"bg-opacity-60": " hover:bg-blue-500"} text-white p-3 rounded-r-lg  transition ${loading ? "cursor-not-allowed" : ""}`}
						aria-label="Send message">
						<Send size={20} />
					</button>
				</div>
			</form>
		</div>
	);
}
