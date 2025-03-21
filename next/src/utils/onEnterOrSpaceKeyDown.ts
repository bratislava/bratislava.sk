// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onEnterOrSpaceKeyDown = (callback: () => any) => {
  return (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      callback()
    }
  }
}
