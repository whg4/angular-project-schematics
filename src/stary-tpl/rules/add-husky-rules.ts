import { promisify } from "util";
import { exec } from "child_process";
import { Schema } from "../schema";
import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";

const execAsync = promisify(exec);

export function addHuskyRules(
	_options: Schema,
): Rule {
	return async (_tree: Tree, context: SchematicContext) => {
		context.logger.info(`npx husky install`);
		await execAsync(`npx husky install`);

		context.logger.info(`npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"`);
		await execAsync(`npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"`);

		context.logger.info(`npx husky add .husky/pre-commit "npx eslint ./"`);
		await execAsync(`npx husky add .husky/pre-commit "npx eslint ./"`);
	};
}