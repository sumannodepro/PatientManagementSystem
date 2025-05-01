// src/bedrockClient.js
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { Auth } from 'aws-amplify';

export async function getBedrockClient() {
  const credentials = await Auth.currentCredentials();

  return new BedrockRuntimeClient({
    region: 'ap-south-1',
    credentials: Auth.essentialCredentials(credentials),
  });
}

export async function invokeClaude(promptText) {
  const client = await getBedrockClient();

  const command = new InvokeModelCommand({
    modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
    endpointName: 'claude-3-sonnet-20240229-v1',
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      messages: [
        {
          role: 'user',
          content: promptText,
        },
      ],
      max_tokens: 1000,
    }),
  });

  try {
    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    return responseBody.content?.[0]?.text || '';
  } catch (error) {
    console.error('Error calling Claude:', error);
    return 'Error occurred.';
  }
}
