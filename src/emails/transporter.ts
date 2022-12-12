import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from "sib-api-v3-typescript";

const apiInstance = new TransactionalEmailsApi();

apiInstance.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY ?? ""
);

export default apiInstance;
