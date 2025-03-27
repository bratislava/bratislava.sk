import { CodegenConfig } from '@graphql-codegen/cli'

const codegenConfig: CodegenConfig = {
  schema: '../strapi/schema.graphql',
  documents: './src/services/graphql/queries/**/*.{gql,graphql}',
  generates: {
    './src/services/graphql/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
    },
  },
}

export default codegenConfig
