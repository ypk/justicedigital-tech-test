
export enum PasswordValidationResult {
  Valid = "Valid",
  Invalid = "Invalid"
}

const hasUpperCaseChars = (password: string, messages: string[]): boolean => {
  const result = /[A-Z]/.test(password);
  if (!result) messages.push("Capital Letters are mandatory");
  return result;
};

const hasLowerCaseChars = (password: string, messages: string[]): boolean => {
  const result = /[a-z]/.test(password);
  if (!result) messages.push("Lowercase Letters are mandatory");
  return result;
};

const hasNumbers = (password: string, messages: string[]): boolean => {
  const result = /[0-9]/.test(password);
  if (!result) messages.push("Numbers are mandatory");
  return result;
};

const hasUnderscore = (password: string, messages: string[]): boolean => {
  const result = /_/.test(password);
  if (!result) messages.push("Underscore is mandatory");
  return result;
};

const hasMinimumCharacters = (password: string, minLength: number, messages: string[]): boolean => {
  const result = password.length >= minLength;
  if (!result) messages.push(`Password must be at least ${minLength} characters.`);
  return result;
};

export const PasswordManager = (password: string): { validity: PasswordValidationResult, message: string[] } => {
  if (!password) {
    throw new Error("Password cannot be empty!");
  }

  const messages: string[] = [];
  let failureCount = 0;
  const minLength = 8;
  const maxAllowedErrors = 2;

  if (!hasLowerCaseChars(password, messages)) failureCount++;
  if (!hasUpperCaseChars(password, messages)) failureCount++;
  if (!hasNumbers(password, messages)) failureCount++;
  if (!hasUnderscore(password, messages)) failureCount++;
  if (!hasMinimumCharacters(password, minLength, messages)) failureCount++;

  const validity: PasswordValidationResult = failureCount <= maxAllowedErrors ? PasswordValidationResult.Valid : PasswordValidationResult.Invalid;
  return { validity, message: messages };
}