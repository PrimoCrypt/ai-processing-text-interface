/* eslint-disable @typescript-eslint/no-explicit-any */
declare interface Window {
    ai: any;  // Quick fix using 'any'
}

// For a more type-safe approach:
declare interface Window {
    ai: {
        languageDetector: {
            capabilities(): Promise<any>;
            detect(text: string): Promise<string>;
        }
    }
}
