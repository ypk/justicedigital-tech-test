import readline from "readline";
import { PasswordManager as PasswordManagerClass } from "./password_manager.class";
import { PasswordManager as PasswordManagerFunction } from "./password_manager.function";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true,
});

const mode = process.argv[2] === "function" ? "function" : "class";

function askPassword() {
	rl.question("\nEnter password to validate: ", (input) => {
		try {
			let result;
			if (mode === "function") {
				result = PasswordManagerFunction(input);
			} else {
				const manager = new PasswordManagerClass(input);
				result = manager.validatePassword();
			}
			console.log(`\nValidation result: ${result.validity}`);
			if (result.message.length > 0) {
				console.log("\nReasons:");
				for (const msg of result.message) {
					console.log(`- ${msg}`);
				}
			}
		} catch (err) {
			console.log(`\nError: ${(err as Error).message}`);
		}
		askPassword();
	});
}

console.log(`PasswordManager (${mode} mode)`);
console.log(`\nPress Ctrl+C to exit.`);

askPassword();

