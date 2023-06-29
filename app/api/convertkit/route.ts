import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const email = body.email;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const FORM_ID = process.env.CONVERTKIT_FORM_ID;
    const API_KEY = process.env.CONVERTKIT_API_KEY;
    const API_URL = process.env.CONVERTKIT_API_URL;

    const data = { email, api_key: API_KEY };

    const response = await fetch(`${API_URL}forms/${FORM_ID}/subscribe`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const out = await response.json();

    if (response.status >= 400) {
      return NextResponse.json(
        { error: "There was an error subscribing to the list." },
        { status: response.status }
      );
    }
    return NextResponse.json({ error: out }, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || error.toString() },
      { status: 500 }
    );
  }
}
