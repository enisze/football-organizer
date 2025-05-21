'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { z } from 'zod'

const HUGGING_FACE_TOKEN = process.env.HUGGING_FACE_API_KEY

const schema = z.object({
	audioBase64: z.string(),
})

export const transcribeAudioAction = authedActionClient
	.schema(schema)
	.action(async ({ parsedInput: { audioBase64 } }) => {
		try {
			// Decode audio data
			let buffer: Buffer
			try {
				// Check if the data is a Data URL
				if (audioBase64.includes('base64,')) {
					const base64Data = audioBase64.split('base64,')[1]
					buffer = Buffer.from(base64Data ?? '', 'base64')
				} else {
					buffer = Buffer.from(audioBase64, 'base64')
				}

				if (buffer.length === 0) {
					throw new Error('Empty audio data')
				}
			} catch (error) {
				console.error('Error decoding base64:', error)
				throw new Error('Invalid audio data format')
			}

			// Send the raw buffer to the API
			const response = await fetch(
				'https://api-inference.huggingface.co/models/openai/whisper-large-v3',
				{
					headers: {
						Authorization: `Bearer ${HUGGING_FACE_TOKEN}`,
						'Content-Type': 'audio/webm',
					},
					method: 'POST',
					body: buffer,
				},
			)

			const responseText = await response.json()

			if (!response.ok) {
				throw new Error(
					`HTTP error! status: ${response.status}, response: ${responseText}`,
				)
			}

			try {
				return responseText.text
			} catch (error) {
				console.error('Error parsing API response:', error)
				throw new Error('Invalid API response format')
			}
		} catch (error) {
			console.error('Error in transcribeAudioAction:', error)
			throw error
		}
	})
