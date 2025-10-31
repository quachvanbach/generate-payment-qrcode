import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
    try {
        const { base64Image } = await req.json();

        if (!base64Image) {
            return NextResponse.json({ error: "No image data provided." }, { status: 400 });
        }

        // Theo tài liệu mới
        const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    inlineData: {
                        mimeType: "image/jpeg",
                        data: base64Image,
                    },
                },
                { text: `Tôi có đường link mẫu là: "" đơn hàng và giá tiền của đơn hàng` },
            ],
        });
        return NextResponse.json({ caption: response.text });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
}
