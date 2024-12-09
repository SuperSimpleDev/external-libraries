declare module 'supersimpledev' {
  interface Chatbot {
    addResponses(
      additionalResponses: Record<
        string, string | (() => string)
      >
    ): void;

    getResponse(message: string): string;
    getResponseAsync(message: string): Promise<string>;
  }

  export const Chatbot: Chatbot;
  export const chatbot: Chatbot;
}