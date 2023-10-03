//@ts-expect-error - Astro doesn't know about the request object
import Brevo from '@getbrevo/brevo'

const defaultClient = Brevo.ApiClient.instance

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = process.env.SENDINBLUE_API_KEY ?? ''

const apiInstance = new Brevo.TransactionalEmailsApi()

export default apiInstance
