export const loadingDelay = async (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false)
    }, delay)
  })
}
