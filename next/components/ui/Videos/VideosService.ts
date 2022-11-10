export interface VideoAttribute {
  id: string
  title?: string
  speaker?: string
  url?: string
  size?: 'default' | 'small'
}

export function shouldShowButtonContent(videos: VideoAttribute[], buttonContent?: string | null): boolean {
  if (!buttonContent) {
    return false
  }

  return videos.length > 3
}
