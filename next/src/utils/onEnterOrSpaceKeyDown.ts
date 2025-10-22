 
export const onEnterOrSpaceKeyDown = (callback: () => any) => {
  return (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      callback()
    }
  }
}
