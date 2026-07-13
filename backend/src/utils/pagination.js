export const pagination = (query) => {
  const limit = parseInt(Math.max(query.limit)) || 10;
  const page = parseInt(Math.max(query.page)) || 1;
  const offset = (page - 1) * limit;

  return {
    limit,
    offset,
    page,
  };
};
