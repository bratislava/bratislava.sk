const graphqlConfig = {
  generateArtifacts: true,
  artifacts: {
    // When changing schema path, also change watchIgnoreFiles in strapi/config/admin.js
    schema: true,
  },
  defaultLimit: 100,
}

export default graphqlConfig
