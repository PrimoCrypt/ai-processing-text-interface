export async function detectLanguage(text: string): Promise<string> {
	try {
		const response = await chrome.runtime.sendMessage({
			type: "DETECT_LANGUAGE",
			text: text,
		});
		return response.language;
	} catch (error) {
		console.error("Error detecting language:", error);
		throw error;
	}
}

export async function summarizeText(text: string): Promise<string> {
	try {
		const response = await chrome.runtime.sendMessage({
			type: "SUMMARIZE_TEXT",
			text: text,
		});
		return response.summary;
	} catch (error) {
		console.error("Error summarizing text:", error);
		throw error;
	}
}

export async function translateText(text: string, targetLanguage: string): Promise<string> {
	try {
		const response = await chrome.runtime.sendMessage({
			type: "TRANSLATE_TEXT",
			text: text,
			targetLanguage: targetLanguage,
		});
		return response.translatedText;
	} catch (error) {
		console.error("Error translating text:", error);
		throw error;
	}
}
