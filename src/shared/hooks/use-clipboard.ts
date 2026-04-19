import { useState, useCallback, useEffect } from "react";

interface UseClipboardOptions {
  /** Timeout in milliseconds to reset the copied state */
  timeout?: number;
}

interface UseClipboardReturn {
  /** Function to copy text to clipboard */
  copy: (text: string) => Promise<boolean>;
  /** Boolean state indicating if the text was recently copied */
  isCopied: boolean;
  /** Boolean state indicating if the Clipboard API is supported */
  isSupported: boolean;
  /** Potential error object if copying failed */
  error: Error | null;
}

/**
 * A hook to handle copying text to the clipboard.
 * It uses the modern Clipboard API with a fallback to document.execCommand.
 */
export function useClipboard({ timeout = 1500 }: UseClipboardOptions = {}): UseClipboardReturn {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check for Clipboard API support on mount
    setIsSupported(Boolean(navigator.clipboard));
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      setError(null); // Reset error on new copy attempt

      // Try modern Clipboard API
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(text);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), timeout);
          return true;
        } catch (err) {
          console.error("Clipboard API failed:", err);
          // Fallback will be attempted below if this fails
        }
      }

      // Fallback using document.execCommand
      let success = false;
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = text;
      // Prevent scrolling to bottom
      tempTextArea.style.position = "fixed";
      tempTextArea.style.top = "-9999px";
      tempTextArea.style.left = "-9999px";
      document.body.appendChild(tempTextArea);

      try {
        tempTextArea.select();
        tempTextArea.setSelectionRange(0, 99999); // For mobile devices
        success = document.execCommand("copy");

        if (success) {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), timeout);
        } else {
          const cmdError = new Error("document.execCommand('copy') failed.");
          console.error(cmdError);
          setError(cmdError);
        }
      } catch (err) {
        const execError = err instanceof Error ? err : new Error("Error executing document.execCommand('copy').");
        console.error(execError);
        setError(execError);
        success = false; // Ensure success is false on error
      } finally {
        document.body.removeChild(tempTextArea);
      }

      return success;
    },
    [timeout],
  );

  return { copy, isCopied, isSupported, error };
}
