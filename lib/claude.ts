import Anthropic from "@anthropic-ai/sdk";

let anthropic: Anthropic | null = null;

function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey.trim().length === 0) {
    throw new Error("ANTHROPIC_API_KEY가 설정되지 않았습니다.");
  }

  if (!anthropic) {
    anthropic = new Anthropic({ apiKey });
  }

  return anthropic;
}

export async function generateWithClaude(
  systemPrompt: string,
  userPrompt: string,
  maxTokens = 1000
): Promise<string> {
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
