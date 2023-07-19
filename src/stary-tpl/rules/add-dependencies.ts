import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
	addPackageJsonDependency,
	NodeDependency,
	NodeDependencyType,
} from '@schematics/angular/utility/dependencies';


export function addDependencies(): Rule {
	const dependencies: Array<NodeDependency> = [
		{
			name: 'husky',
			version: '^7.0.4',
			overwrite: true,
			type: NodeDependencyType.Dev,
		},
		{
			name: '@commitlint/cli',
			version: '17.4.0',
			overwrite: true,
			type: NodeDependencyType.Dev,
		},
		{
			name: '@commitlint/config-conventional',
			version: '17.4.0',
			overwrite: true,
			type: NodeDependencyType.Dev,
		}
	];

	return async (tree: Tree, context: SchematicContext) => {
		for (const dependency of dependencies) {
			addPackageJsonDependency(tree, dependency);
			context.logger.info(`Added '${dependency.name}' as a dependency`);
		}
		context.addTask(new NodePackageInstallTask());
	};
}
