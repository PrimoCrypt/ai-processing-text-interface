/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";



export async function detectLanguage(text: string): Promise<string | undefined> {
	const languageDetectorCapabilities = await self.ai.languageDetector.capabilities();
	const canDetect = languageDetectorCapabilities.capabilities;
	let detector;
	if (canDetect === "no") {
		// The language detector isn't usable.
		return;
	}
	if (canDetect === "readily") {
		// The language detector can immediately be used.
		detector = await self.ai.languageDetector.create();
	} else {
		// The language detector can be used after model download.
		detector = await self.ai.languageDetector.create({
			monitor(m: any) {
				m.addEventListener("downloadprogress", (e: any) => {
					console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
				});
			},
		});
		await detector.ready;
	}
	try {
		const response = await await detector.detect(text);
		console.log("Response:", response);
		return response[0].detectedLanguage;
	} catch (error) {
		console.error("Error detecting language:", error);
		throw error;
	}
}


export async function translateText(
	text: string,
	sourceLanguage: string,
	targetLanguage: string
): Promise<string | undefined> {
	const translatorCapabilities = await self.ai.translator.capabilities();
	if (sourceLanguage === targetLanguage) {
		return text;
	}
	const canDetect = translatorCapabilities.languagePairAvailable(sourceLanguage, targetLanguage);
	console.log("Can detect:", canDetect);
	let translator;
	if (canDetect === "no") {
		// The language detector isn't usable.
		return;
	}
	if (canDetect === "readily") {
		// The language detector can immediately be used.
		translator = await self.ai.translator.create({
			sourceLanguage,
			targetLanguage,
		});
		console.log({
			sourceLanguage,
			targetLanguage,
		});
	} else {
		// The language detector can be used after model download.
		translator = await self.ai.translator.create({
			sourceLanguage,
			targetLanguage,
			monitor(m: any) {
				m.addEventListener("downloadprogress", (e: any) => {
					console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
				});
			},		});
		await translator.ready;
	}
	try {
		const response = await translator.translate(text);
		console.log({ response, targetLanguage });
		return response;
	} catch (error) {
		console.error("Error translating text:", error);
		throw error;
	}
}


export async function summarizeText(text: string): Promise<string | undefined> {
  let length = "medium"
	const options = {
		type: "tl;dr",
		format: "markdown",
		length,
	};
	const available = (await self.ai.summarizer.capabilities()).available;
	let summarizer;
	if (available === "no") {
		// The Summarizer API isn't usable.
		return;
	}
	if (available === "readily") {
		// The Summarizer API can be used immediately .
		summarizer = await self.ai.summarizer.create(options);
	} else {
		// The Summarizer API can be used after the model is downloaded.
		summarizer = await self.ai.summarizer.create(options);
		summarizer.addEventListener("downloadprogress", (e: any) => {
			console.log(e.loaded, e.total);
		});
		await summarizer.ready;
	}

  let response;
	try {
		response = await summarizer.summarize(text);
    if(response.length > 150) {
      length = "short"
      response = await summarizer.summarize(text);
    }
    return response;
	} catch (error) {
		console.error("Error summarizing text:", error);
		throw error;
	}
}
