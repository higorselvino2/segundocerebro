import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("N8N Webhook payload:", body);

    // In a real application, you would verify the payload and update the Supabase Database or trigger realtime updates
    // For now, it accepts the payload from N8N.

    return NextResponse.json({
      success: true,
      message: "Dados recebidos e processados",
    });
  } catch (error) {
    console.error("Erro no Webhook:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno ao processar webhook" },
      { status: 500 },
    );
  }
}
