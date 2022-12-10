export const getButton = (link: string, buttonText: string) => {
  return `
        <mj-button background-color="#73C8A9" color="#373B44" font-size="14px" align="center" font-weight="bold" border="none" padding="15px 30px" border-radius="10px" href="${link}" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="12px">${buttonText}</mj-button>
    `;
};
