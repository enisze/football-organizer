import {
	TransactionalEmailsApi,
	TransactionalEmailsApiApiKeys,
} from '@sendinblue/client'

const apiInstance = new TransactionalEmailsApi()

apiInstance.setApiKey(
	TransactionalEmailsApiApiKeys.apiKey,
	process.env.SENDINBLUE_API_KEY ?? '',
)

export default apiInstance
