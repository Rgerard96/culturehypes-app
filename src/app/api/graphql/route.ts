import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { schema } from '@/apollo/schema';
import dbConnect from '../../../lib/dbConnect';

const apolloServer = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler(apolloServer);

export async function GET(request: Request) {
    await dbConnect();
    return handler(request);
}

export async function POST(request: Request) {
    await dbConnect();
    return handler(request);
}