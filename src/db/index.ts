// Mock database file for demonstration
// In production, this would connect to Cloud SQL PostgreSQL
export const db = {
  select: () => ({
    from: () => Promise.resolve([])
  }),
  insert: () => ({
    values: () => ({
      returning: () => Promise.resolve([])
    })
  })
};
