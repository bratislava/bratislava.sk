export const getMeilisearchPageOptions = ({ page, pageSize }: { page: number; pageSize: number }) => ({
  limit: pageSize,
  offset: (page - 1) * pageSize,
})
