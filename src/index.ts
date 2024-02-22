import { ApolloServer } from 'apollo-server-express';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './graphql/resolvers';
import context from './graphql/context';
import { User, Team, Task } from './models';
import path from 'path';

const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

const schemaFilePath = path.join(__dirname, 'graphql', 'schema.graphql');
const schema = loadSchemaSync(schemaFilePath, {
    loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
});

const apolloServer = new ApolloServer({ schema: schemaWithResolvers, context });

async function startApolloServer() {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen({ port }, () => {
        console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
    });
}

startApolloServer().catch(err => {
    console.error('Error starting server:', err);
});
