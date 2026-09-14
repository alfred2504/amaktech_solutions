const fs = require('fs');
const { GoogleGenAI } = require('@google/genai');

const dotenv = fs.readFileSync('.env', 'utf8');
const keyLine = dotenv.split(/\r?\n/).find((line) => line.startsWith('GEMINI_API_KEY='));
const modelLine = dotenv.split(/\r?\n/).find((line) => line.startsWith('GEMINI_MODEL='));

const apiKey = keyLine ? keyLine.split('=')[1].replace(/"/g, '') : '';
const model = modelLine ? modelLine.split('=')[1].replace(/"/g, '') : 'gemini-2.5-flash-lite';

(async () => {
  try {
    const gemini = new GoogleGenAI({ apiKey });
    const response = await gemini.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: [{ text: 'Say hello in one sentence.' }],
        },
      ],
    });

    console.log('RESPONSE_TEXT:', response.text || JSON.stringify(response, null, 2));
  } catch (err) {
    console.error('GENAI_ERROR_STACK:', err && err.stack ? err.stack : err);
    process.exitCode = 1;
  }
})();
