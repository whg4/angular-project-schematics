import { Schema } from "../schema";
import { Rule, SchematicsException, Tree } from "@angular-devkit/schematics";

export function addNPMScripts(
	options: Schema,
): Rule {
	return (tree: Tree) => {
		const pkgPath = '/package.json';
		const buffer = tree.read(pkgPath);

		if (buffer === null) {
			throw new SchematicsException('Could not find package.json');
		}

		addScripts(tree, pkgPath, JSON.parse(buffer.toString()), options);
	};
}


function addScripts(tree: Tree, pkgPath: string, pkg: any, _options: Schema): void {
	pkg.scripts[`prepare`] = `husky install`;

	tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
}