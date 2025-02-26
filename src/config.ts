import { TypeScriptPluginConfig } from '@graphql-codegen/typescript';

export type ValidationSchema = 'yup' | 'zod';

export interface DirectiveConfig {
  [directive: string]: {
    [argument: string]: string | string[] | DirectiveObjectArguments;
  };
}

export interface DirectiveObjectArguments {
  [matched: string]: string | string[];
}

export interface ValidationSchemaPluginConfig extends TypeScriptPluginConfig {
  /**
   * @description specify generate schema
   * @default yup
   *
   * @exampleMarkdown
   * ```yml
   * generates:
   *   path/to/file.ts:
   *     plugins:
   *       - typescript
   *       - graphql-codegen-validation-schema
   *     config:
   *       schema: yup
   * ```
   */
  schema?: ValidationSchema;
  /**
   * @description import types from generated typescript type path
   * if not given, omit import statement.
   *
   * @exampeMarkdown
   * ```yml
   * generates:
   *   path/to/types.ts:
   *     plugins:
   *       - typescript
   *   path/to/schemas.ts:
   *     plugins:
   *       - graphql-codegen-validation-schema
   *     config:
   *       schema: yup
   *       importFrom: ./path/to/types
   * ```
   */
  importFrom?: string;
  /**
   * @description Generates validation schema for enum as TypeScript `type`
   * @default false
   *
   * @exampleMarkdown
   * ```yml
   * generates:
   *   path/to/file.ts:
   *     plugins:
   *       - graphql-codegen-validation-schema
   *     config:
   *       enumsAsTypes: true
   * ```
   *
   * ```yml
   * generates:
   *   path/to/file.ts:
   *     plugins:
   *       - typescript
   *       - graphql-codegen-validation-schema
   *     config:
   *       enumsAsTypes: true
   * ```
   */
  enumsAsTypes?: boolean;
  /**
   * @description Generates validation schema with more API based on directive schema.
   * @exampleMarkdown
   * ```yml
   * generates:
   *   path/to/file.ts:
   *     plugins:
   *       - graphql-codegen-validation-schema
   *     config:
   *       schema: yup
   *       directives:
   *         required:
   *           msg: required
   *         # This is example using constraint directive.
   *         # see: https://github.com/confuser/graphql-constraint-directive
   *         constraint:
   *           minLength: min # same as ['min', '$1']
   *           maxLength: max
   *           startsWith: ["matches", "/^$1/"]
   *           endsWith: ["matches", "/$1$/"]
   *           contains: ["matches", "/$1/"]
   *           notContains: ["matches", "/^((?!$1).)*$/"]
   *           pattern: ["matches", "/$1/"]
   *           format:
   *             # For example, `@constraint(format: "uri")`. this case $1 will be "uri".
   *             # Therefore the generator generates yup schema `.url()` followed by `uri: 'url'`
   *             # If $1 does not match anywhere, the generator will ignore.
   *             uri: url
   *             email: email
   *             uuid: uuid
   *             # yup does not have `ipv4` API. If you want to add this,
   *             # you need to add the logic using `yup.addMethod`.
   *             # see: https://github.com/jquense/yup#addmethodschematype-schema-name-string-method--schema-void
   *             ipv4: ipv4
   *           min: ["min", "$1 - 1"]
   *           max: ["max", "$1 + 1"]
   *           exclusiveMin: min
   *           exclusiveMax: max
   * ```
   */
  directives?: DirectiveConfig;
}
