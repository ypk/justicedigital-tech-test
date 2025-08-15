import { PasswordManager, PasswordValidationResult } from "../password_manager.class";
import assert from "assert";
import { describe, test } from "node:test";

describe("PasswordManager class", () => {
	test("should validate a password with upper, lower, number, underscore, and min length as Valid", () => {
		const manager = new PasswordManager("Abc_12345");
		const result = manager.validatePassword();
		assert.strictEqual(result.validity, PasswordValidationResult.Valid);
		assert.deepStrictEqual(result.message, []);
	});

	test("should invalidate a password missing uppercase", () => {
		const manager = new PasswordManager("abc_12345");
		const result = manager.validatePassword();
		assert.strictEqual(result.validity, PasswordValidationResult.Invalid);
		assert.ok(result.message.includes("Capital Letters are mandatory"));
	});

	test("should invalidate a password missing lowercase", () => {
		const manager = new PasswordManager("ABC_12345");
		const result = manager.validatePassword();
		assert.strictEqual(result.validity, PasswordValidationResult.Invalid);
		assert.ok(result.message.includes("Lowercase Letters are mandatory"));
	});

	test("should invalidate a password missing numbers", () => {
		const manager = new PasswordManager("Abc_defgh");
		const result = manager.validatePassword();
		assert.strictEqual(result.validity, PasswordValidationResult.Invalid);
		assert.ok(result.message.includes("Numbers are mandatory"));
	});

	test("should invalidate a password missing underscore", () => {
		const manager = new PasswordManager("Abc12345");
		const result = manager.validatePassword();
		assert.strictEqual(result.validity, PasswordValidationResult.Invalid);
		assert.ok(result.message.includes("Underscore is mandatory"));
	});

	test("should invalidate a password missing minimum characters", () => {
		const manager = new PasswordManager("Abc_1");
		const result = manager.validatePassword();
		assert.strictEqual(result.validity, PasswordValidationResult.Invalid);
		assert.ok(result.message.includes("Password must be at least 6 characters."));
	});

	test("should invalidate a password missing multiple requirements", () => {
		const manager = new PasswordManager("abcde");
		const result = manager.validatePassword();
		assert.strictEqual(result.validity, PasswordValidationResult.Invalid);
		assert.ok(result.message.length >= 2);
	});

	test("should throw error for empty password", () => {
		assert.throws(() => new PasswordManager(""), /Password cannot be empty!/);
	});
});
