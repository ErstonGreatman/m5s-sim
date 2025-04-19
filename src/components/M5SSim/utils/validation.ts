/**
 * Validates the input string for the cleave directions
 * @param input The input string to validate
 * @returns Error message or null if valid
 */
export const validateInput = (input: string): string | null => {
  if (input.length === 0) {
    return "Input cannot be empty";
  }

  if (input.length > 8) {
    return "Input cannot be more than 8 characters";
  }

  const charCount: Record<string, number> = { 'L': 0, 'U': 0, 'R': 0, 'D': 0 };

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (!['L', 'U', 'R', 'D'].includes(char)) {
      return `Invalid character '${char}' at position ${i+1}. Only L, U, R, D are allowed.`;
    }

    charCount[char]++;

    if (charCount[char] > 2) {
      return `Character '${char}' appears more than twice`;
    }
  }

  return null;
};

/**
 * Sanitizes input to only allow valid characters
 * @param input The input string to sanitize
 * @returns Sanitized input string
 */
export const sanitizeInput = (input: string): string => {
  return input.toUpperCase().replace(/[^LURD]/g, '');
};
