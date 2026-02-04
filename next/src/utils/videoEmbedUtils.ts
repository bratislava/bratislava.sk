export const detectVideoPlatform = (url: string) => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube'
  }
  if (url.includes('vimeo.com')) {
    return 'vimeo'
  }
  if (url.includes('facebook.com') || url.includes('fb.watch')) {
    return 'facebook'
  }

  return null
}

const parseVideoUrl = (value: string) => {
  try {
    return new URL(value)
  } catch {
    try {
      return new URL(`https://${value}`)
    } catch {
      return null
    }
  }
}

const getYoutubeId = (url: string) => {
  const parsedUrl = parseVideoUrl(url)
  if (!parsedUrl) return null

  const hostname = parsedUrl.hostname.replace(/^www\./, '')
  if (hostname === 'youtu.be') {
    return parsedUrl.pathname.split('/').filter(Boolean)[0] ?? null
  }

  if (!hostname.endsWith('youtube.com')) {
    return null
  }

  const videoIdFromQuery = parsedUrl.searchParams.get('v')
  if (videoIdFromQuery) return videoIdFromQuery

  const pathSegments = parsedUrl.pathname.split('/').filter(Boolean)
  const knownPrefixes = ['embed', 'v', 'e', 'shorts']
  const prefixIndex = pathSegments.findIndex((segment) => knownPrefixes.includes(segment))

  return prefixIndex !== -1 ? pathSegments[prefixIndex + 1] ?? null : null
}

const getVimeoId = (url: string) => {
  const vimeoRegex = /vimeo\.com\/(?:.*\/)?(\d+)/
  const vimeoMatch = url.match(vimeoRegex)

  return vimeoMatch ? vimeoMatch[1] : null
}

// Based on AI suggestions
export const getVideoId = (platform: string, url: string) => {
  switch (platform) {
    case 'youtube':
      return getYoutubeId(url)
    case 'vimeo':
      return getVimeoId(url)
    case 'facebook':
      // Facebook videos have different URL patterns, we'll use the full URL
      return url
    default:
      return null
  }
}

export const getVideoIframeSrc = (url: string) => {
  const platform = detectVideoPlatform(url)

  if (!platform) {
    return null
  }

  const videoId = getVideoId(platform, url)

  if (!videoId) {
    return null
  }

  if (platform === 'youtube') {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
  }

  if (platform === 'vimeo') {
    return `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`
  }

  if (platform === 'facebook') {
    const encodedUrl = encodeURIComponent(videoId)

    return `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false&width=560&height=315&t=0`
  }

  return null
}
