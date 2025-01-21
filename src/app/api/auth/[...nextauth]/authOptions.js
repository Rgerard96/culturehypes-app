import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import generateAuthtoken from "@/lib/generateAuthtoken";
import { Resend } from 'resend';
import NotionMagicLinkEmail from "@/react-email-templates/emails/notion-magic-link";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM,
            maxAge: 5 * 60,
            generateVerificationToken: async () => {
                const token = generateAuthtoken().toString();
                return token;
            },
            sendVerificationRequest: async ({
                identifier: email,
                url,
                token,
                provider
            }) => {
                const { from } = provider;

                try {
                    const data = await resend.emails.send({
                        from: 'Acme <onboarding@resend.dev>',
                        to: email,
                        subject: `Sign in code ${token}`,
                        react: NotionMagicLinkEmail({ url, email, token }),
                    });
                    console.log(data, 'data');
                    return;
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : String(error));
                }
            },
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Attach name to the JWT token
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                // Attach name to the session
                session.user.id = token.id;
            }
            return session;
        },
    },
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "jwt",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours

    }
};