const gql = require('graphql-tag')

const typeDefs = /* GraphQL */`
  type User {
    name: String!
  }
`

console.log(`typeof typeDefs = `, typeof typeDefs)
