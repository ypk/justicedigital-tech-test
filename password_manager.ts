export enum PasswordValidationResult {
  Valid = "Valid",
  Invalid = "Invalid"
}

type ValidationResult = { 
  validity: PasswordValidationResult; 
  message: string[]; 
};

export class PasswordManager {
  private minimumPasswordLength: number;
  private password: string[];
  private errorMessage: string[];
  private maxAllowedErrors: number;

  constructor(password: string) {
    if (!password) {
      throw new Error("Password cannot be empty!");
    }
    this.minimumPasswordLength = 8;
    this.maxAllowedErrors = 2;
    this.password = password.split("");
    this.errorMessage = [];
  }

  #hasMinimumCharacters(): boolean {
    return this.password.length >= this.minimumPasswordLength;
  }

  #hasUpperCaseChars(): boolean {
    const result = this.password.some((char) => char >= "A" && char <= "Z");
    if (!result) {
      this.errorMessage.push("Capital Letters are mandatory");
    }
    return result;
  }

  #hasLowerCaseChars(): boolean {
    const result = this.password.some((char) => char >= "a" && char <= "z");
    if (!result) {
      this.errorMessage.push("Lowercase Letters are mandatory");
    }
    return result;
  }

  #hasNumbers(): boolean {
    const result = this.password.some((char) => char >= "0" && char <= "9");
    if (!result) {
      this.errorMessage.push("Numbers are mandatory");
    }
    return result;
  }

  #hasUnderscore(): boolean {
    const result = this.password.some((char) => char === "_");
    if (!result) {
      this.errorMessage.push("Underscore is mandatory");
    }
    return result;
  }

  validatePassword(): ValidationResult {
    this.errorMessage = [];
    let validity: PasswordValidationResult = PasswordValidationResult.Invalid;
    let failureCount = 0;

    if (!this.#hasLowerCaseChars()) {
      failureCount++;
    }

    if (!this.#hasUpperCaseChars()) {
      failureCount++;
    }

    if (!this.#hasNumbers()) {
      failureCount++;
    }

    if (!this.#hasUnderscore()) {
      failureCount++;
    }

    if (!this.#hasMinimumCharacters()) {
      failureCount++;
    }

    if (failureCount <= this.maxAllowedErrors) {
      validity = PasswordValidationResult.Valid;
    }

    return {
      validity,
      message: this.errorMessage,
    };
  }
}
