import { CodegenConfig } from '@graphql-codegen/cli'

const codegenConfig: CodegenConfig = {
  schema: 'http://127.0.0.1:1337/graphql', // TODO potentially replace by '../strapi/schema.graphql'
  documents: './backend/graphql/queries/**/*.{gql,graphql}',
  generates: {
    './backend/graphql/index.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      // config: {
      //   enumsAsTypes: true,
      // },
    },
  },
}

export default codegenConfig
