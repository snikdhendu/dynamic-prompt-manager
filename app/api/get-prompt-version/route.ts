import { langfuse } from "@/lib/langfuse-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, version } = await req.json();

        if (!name || !version) {
            return NextResponse.json(
                { error: "Prompt name and version are required" },
                { status: 400 }
            );
        }

        const promptVersion = await langfuse.api.promptsGet({
            promptName: name,
            version: version,
        });

        return NextResponse.json(promptVersion);

    } catch (error) {
        console.error("Failed to get prompt version:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}