import { langfuse } from "@/lib/langfuse-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { promptName, variables } = await req.json();

        const prompt = await langfuse.getPrompt(promptName);

        if (!prompt.prompt) {
            return NextResponse.json(
                { error: `Active prompt named '${promptName}' not found.` },
                { status: 404 }
            );
        }

        let compiledPrompt = prompt.prompt;
        for (const key in variables) {
            const regex = new RegExp(`{{${key}}}`, "g");
            compiledPrompt = compiledPrompt.replace(regex, variables[key]);
        }

        const generatedBanner = `--- MOCK AI BANNER ---\n${compiledPrompt}\n--- END ---`;

        return NextResponse.json({ result: generatedBanner });
    } catch (error) {
        console.error("Failed to generate banner:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}