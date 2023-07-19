import { Rule, SchematicContext, Tree, chain, externalSchematic } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { addDependencies } from './rules/add-dependencies';
import { addNPMScripts } from './rules/add-npm-scripts';
import { addHuskyRules } from './rules/add-husky-rules';
import { applyTemplate } from './rules/apply-template';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function staryAppTemplate(options: Schema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {

    return chain([
      externalSchematic('@angular-eslint/schematics', 'ng-add', {}),
      addDependencies(),
      addNPMScripts(options),
      addHuskyRules(options),
      applyTemplate(),
    ]);
  };
}
