// GINIS is accessible only from internal network
// if developing from internal network, change here
export const shouldMockGinis = () => {
  return false

  return (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test' ||
    process.env.CI === 'true'
  )
}
