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


	test("should validate a password missing one requirement (uppercase)", () => {
		const manager = new PasswordManager("abc_12345");
		const result = manager.validatePassword();
		assert.strictEqual(result.validity, PasswordValidationResult.Valid);
		assert.ok(result.message.includes("Capital Letters are mandatory"));
	});

	test("should validate a password missing one requirement (lowercase)", () => {
		const manager = new PasswordManager("ABC_12345");
		const result = manager.validatePassword();
		assert.strictEqual(result.validity, PasswordValidationResult.Valid);
		assert.ok(result.message.includes("Lowercase Letters are mandatory"));
	});

	test("should validate a password missing one requirement (numbers)", () => {
		const manager = new PasswordManager("Abc_defgh");
		const result = manager.validatePassword();
		assert.strictEqual(result.validity, PasswordValidationResult.Valid);
		assert.ok(result.message.includes("Numbers are mandatory"));
	});

	test("should validate a password missing one requirement (underscore)", () => {
		const manager = new PasswordManager("Abc12345");
		const result = manager.validatePassword();
		assert.strictEqual(result.validity, PasswordValidationResult.Valid);
		assert.ok(result.message.includes("Underscore is mandatory"));
	});

	test("should validate a password missing one requirement (minimum characters)", () => {
		const manager = new PasswordManager("Abc_1abc");
		const result = manager.validatePassword();
		assert.strictEqual(result.validity, PasswordValidationResult.Valid);
		assert.ok(result.message.includes("Password must be at least 6 characters."));
	});

	test("should validate a password missing two requirements (uppercase and numbers)", () => {
		const manager = new PasswordManager("abc_defgh");
		const result = manager.validatePassword();
		assert.strictEqual(result.validity, PasswordValidationResult.Valid);
		assert.ok(result.message.includes("Capital Letters are mandatory"));
		assert.ok(result.message.includes("Numbers are mandatory"));
	});

	test("should invalidate a password missing three requirements (uppercase, numbers, and underscore)", () => {
		const manager = new PasswordManager("abcdefgh");
		const result = manager.validatePassword();
		assert.strictEqual(result.validity, PasswordValidationResult.Invalid);
		assert.ok(result.message.includes("Capital Letters are mandatory"));
		assert.ok(result.message.includes("Numbers are mandatory"));
		assert.ok(result.message.includes("Underscore is mandatory"));
	});

	test("should throw error for empty password", () => {
		assert.throws(() => new PasswordManager(""), /Password cannot be empty!/);
	});
});
