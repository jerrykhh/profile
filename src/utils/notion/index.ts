export const getNotionAPIRequestAuthHeader = (token: string) => {
  return {
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};
