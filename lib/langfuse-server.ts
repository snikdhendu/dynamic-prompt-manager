
import { Langfuse } from "langfuse";

export const langfuse = new Langfuse({
    secretKey: process.env.LANGFUSE_SECRET_KEY,
    publicKey: process.env.NEXT_PUBLIC_LANGFUSE_PUBLIC_KEY,
    baseUrl: process.env.LANGFUSE_HOST,
});
