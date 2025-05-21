'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { InferenceClient } from '@huggingface/inference'
import { z } from 'zod'

const HUGGING_FACE_TOKEN = process.env.HUGGING_FACE_API_KEY
const hf = new InferenceClient(HUGGING_FACE_TOKEN)

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

			const response = await hf.automaticSpeechRecognition({
				inputs: new Blob([buffer], { type: 'audio/wav' }), // Changed to WAV format
				model: 'openai/whisper-large-v3-turbo',
				parameters: {
					content_type: 'audio/wav',
				},
			})

			return response.text
		} catch (error) {
			console.error('Error in transcribeAudioAction:', error)
			throw error
		}
	})
