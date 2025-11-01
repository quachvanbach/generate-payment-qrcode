import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    console.log("body", body)
    const YOUR_CLIENT_ID = process.env.VIETQR_CLIENT_ID;
    const VIETQR_API_KEY = process.env.VIETQR_API_KEY;

    try {
        const res = await fetch("https://api.vietqr.io/v2/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-client-id": YOUR_CLIENT_ID as string,
                "x-api-key": VIETQR_API_KEY as string,
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const error = await res.text();
            console.error("VietQR API error:", error);
            return NextResponse.json({error: "VietQR API failed"}, {status: 500});
        }

        const data = await res.json();
        console.log(data);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Internal error:", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}
