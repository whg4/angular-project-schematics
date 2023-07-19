import {
  apply,
  move,
  url,
  mergeWith,
  applyTemplates,
  Rule,
  Tree,
  MergeStrategy,
  SchematicContext,
} from '@angular-devkit/schematics';

export function applyTemplate(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const path = host.root.path;

    const templateSource = apply(url('./files'), [
      applyTemplates({}),
      move(path),
    ]);
    const rule = mergeWith(templateSource, MergeStrategy.Overwrite);
    context.logger.info(`Generated .arconfig`);
    context.logger.info(`Generated commintlint.config.js`);
    context.logger.info(`Generated Dockerfile.ts`);
    context.logger.info(`Generated Jenkinsfile.js`);
    return rule(host, context);
  };
}
