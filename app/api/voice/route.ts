import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (!n8nWebhookUrl) {
      return NextResponse.json(
        { success: false, error: "Webhook URL não configurada" },
        { status: 500 },
      );
    }

    // Enviando para o N8N para transcrição, classificação e logica de IA
    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`N8N retornou erro: ${response.status}`);
    }

    const data = await response.json();

    // O N8N deve retornar { success, transcript, intent, action_taken, xp_gained } etc.
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro no proxy de voz/texto:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao processar captura" },
      { status: 500 },
    );
  }
}
