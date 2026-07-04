export interface PasswordChecks {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialOrNumber: boolean;
  noForeign: boolean;
}

export type PasswordStrength = "weak" | "medium" | "strong";

export function checkPassword(password: string): PasswordChecks {
  const hasNumber = /[0-9]/.test(password);
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber,
    hasSpecialOrNumber: /[!@#$%^&*]/.test(password) || hasNumber,
    noForeign: !/[Ѐ-ӿ]/.test(password),
  };
}

export function isPasswordValid(checks: PasswordChecks): boolean {
  return Object.values(checks).every(Boolean);
}

export function getPasswordStrength(password: string, checks: PasswordChecks): PasswordStrength {
  if (!password || !checks.noForeign) return "weak";
  const score = [
    checks.minLength,
    checks.hasUppercase,
    checks.hasLowercase,
    checks.hasNumber,
    checks.hasSpecialOrNumber,
  ].filter(Boolean).length;
  if (score <= 2) return "weak";
  if (score <= 4) return "medium";
  return "strong";
}
