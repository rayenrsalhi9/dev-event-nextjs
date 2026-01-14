export function safeJsonParser<T>(jsonString: string, fallback: T): T | null {
    if (typeof jsonString !== 'string') return fallback
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
    }
}