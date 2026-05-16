import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { toolName, result } = await request.json()

    if (!toolName || !result) {
      return NextResponse.json(
        { error: 'toolName and result are required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const resultText = typeof result === 'object' ? JSON.stringify(result) : result

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: `You are a helpful assistant explaining tool results. Provide a clear, concise explanation of this tool result in 2-3 sentences. Be friendly and helpful.

Tool: ${toolName}
Result: ${resultText}

Explanation:`,
          },
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Anthropic API error:', error)
      return NextResponse.json(
        { error: 'Failed to generate explanation' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const explanation = data.content[0]?.text || ''

    return NextResponse.json({ explanation })
  } catch (error) {
    console.error('Error in explain route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
