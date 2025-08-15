import readline from "readline";
import { PasswordManager } from "./password_manager";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true,
});


function askPassword() {
	rl.question("\nEnter password to validate: ", (input) => {
		try {
			const manager = new PasswordManager(input);
			const result = manager.validatePassword();
			console.log(`\nValidation result: ${result.validity}`);
			if (result.message.length > 0) {
				console.log("Reasons:");
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

console.log(`PasswordManager`);
console.log(`\nPress Ctrl+C to exit.`);

askPassword();

