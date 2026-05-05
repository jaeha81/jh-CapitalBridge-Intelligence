import Anthropic from "@anthropic-ai/sdk";

let anthropic: Anthropic | null = null;

type OpenRouterResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

function readEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : null;
}

function getAnthropicClient() {
  const apiKey = readEnv("ANTHROPIC_API_KEY");

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY가 설정되지 않았습니다.");
  }

  if (!anthropic) {
    anthropic = new Anthropic({ apiKey });
  }

  return anthropic;
}

async function generateWithOpenRouter(
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number
) {
  const apiKey = readEnv("OPENROUTER_API_KEY");

  if (!apiKey) {
    return null;
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_APP_URL ??
        "https://jh-capitalbridge-intelligence.vercel.app",
      "X-Title": "CapitalBridge Intelligence",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "openrouter/free",
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  const data = (await response.json()) as OpenRouterResponse;

  if (!response.ok) {
    throw new Error(
      data.error?.message ?? "OpenRouter 무료 API 호출에 실패했습니다."
    );
  }

  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("OpenRouter 응답 형식이 예상과 다릅니다.");
  }

  return content;
}

export async function generateWithClaude(
  systemPrompt: string,
  userPrompt: string,
  maxTokens = 1000
): Promise<string> {
  const openRouterResult = await generateWithOpenRouter(
    systemPrompt,
    userPrompt,
    maxTokens
  );

  if (openRouterResult) {
    return openRouterResult;
  }

  const response = await getAnthropicClient().messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const content = response.content[0];

  if (!content || content.type !== "text") {
    throw new Error("Claude 응답 형식이 예상과 다릅니다.");
  }

  return content.text;
}
