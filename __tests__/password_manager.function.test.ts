import { PasswordManager, PasswordValidationResult } from "../password_manager.function";
import assert from "assert";
import { describe, test } from "node:test";

describe("PasswordManager function", () => {
	test("should validate a password with upper, lower, number, underscore, and min length as Valid", () => {
		const result = PasswordManager("Abc_12345");
		assert.strictEqual(result.validity, PasswordValidationResult.Valid);
		assert.deepStrictEqual(result.message, []);
	});


	test("should validate a password missing one requirement (uppercase)", () => {
		const result = PasswordManager("abc_12345");
		assert.strictEqual(result.validity, PasswordValidationResult.Valid);
		assert.ok(result.message.includes("Capital Letters are mandatory"));
	});

	test("should validate a password missing one requirement (lowercase)", () => {
		const result = PasswordManager("ABC_12345");
		assert.strictEqual(result.validity, PasswordValidationResult.Valid);
		assert.ok(result.message.includes("Lowercase Letters are mandatory"));
	});

	test("should validate a password missing one requirement (numbers)", () => {
		const result = PasswordManager("Abc_defgh");
		assert.strictEqual(result.validity, PasswordValidationResult.Valid);
		assert.ok(result.message.includes("Numbers are mandatory"));
	});

	test("should validate a password missing one requirement (underscore)", () => {
		const result = PasswordManager("Abc12345");
		assert.strictEqual(result.validity, PasswordValidationResult.Valid);
		assert.ok(result.message.includes("Underscore is mandatory"));
	});

	test("should validate a password missing one requirement (minimum characters)", () => {
		const result = PasswordManager("Abc_123");
		assert.strictEqual(result.validity, PasswordValidationResult.Valid);
		assert.ok(result.message.some(msg => msg.includes("Password must be at least")));
	});

	test("should validate a password missing two requirements (uppercase and numbers)", () => {
		const result = PasswordManager("abc_defgh");
		assert.strictEqual(result.validity, PasswordValidationResult.Valid);
		assert.ok(result.message.includes("Capital Letters are mandatory"));
		assert.ok(result.message.includes("Numbers are mandatory"));
	});

	test("should invalidate a password missing three requirements (uppercase, numbers, and underscore)", () => {
		const result = PasswordManager("abcdefgh");
		assert.strictEqual(result.validity, PasswordValidationResult.Invalid);
		assert.ok(result.message.includes("Capital Letters are mandatory"));
		assert.ok(result.message.includes("Numbers are mandatory"));
		assert.ok(result.message.includes("Underscore is mandatory"));
	});

	test("should throw error for empty password", () => {
		assert.throws(() => PasswordManager(""), /Password cannot be empty!/);
	});
});
