const graphqlConfig = {
  generateArtifacts: true,
  artifacts: {
    // When changing schema path, also change watchIgnoreFiles in strapi/config/admin.js
    schema: true,
  },
  defaultLimit: 100,
  v4CompatibilityMode: true,
}

export default graphqlConfig
