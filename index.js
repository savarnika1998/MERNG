const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')
const {gql} = require('apollo-server')

const Post = require('./models/Post')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers') 
const { MONGODB } = require('./config.js')

{/*const typeDefs = gql`
type Post{
    id : ID!
    body : String!
    username : String!
    createdAt : String!
}
type Query {
    getPosts : [Post]
}
`
const resolvers = 
    { Query: {
        async getPosts (){
            try {
                const posts = await Post.find();
                return posts;
            }
            catch(err)
            {
                throw new Error(err);
            }
    
          }
      }
} */}

const server = new ApolloServer({
    typeDefs, resolvers, 
    context : ({req}) => ({req})
    })

mongoose.connect(MONGODB, {useNewUrlParser : true})
.then(() => {
    console.log('connected to mongodb')
    return server.listen({port : 5000})
    
}).then((res) => {
    console.log(`Server running at ${res.url}`)
})
