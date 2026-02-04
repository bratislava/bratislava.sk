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

// Based on AI suggestions
export const getVideoId = (platform: string, url: string) => {
  if (platform === 'youtube') {
    const parsedUrl = parseVideoUrl(url)
    if (!parsedUrl) return null

    const hostname = parsedUrl.hostname.replace(/^www\./, '')
    if (hostname === 'youtu.be') {
      const [videoId] = parsedUrl.pathname.split('/').filter(Boolean)

      return videoId ?? null
    }

    if (hostname.endsWith('youtube.com')) {
      const videoIdFromQuery = parsedUrl.searchParams.get('v')
      if (videoIdFromQuery) return videoIdFromQuery

      const pathSegments = parsedUrl.pathname.split('/').filter(Boolean)
      const knownPrefixes = ['embed', 'v', 'e', 'shorts']
      const prefixIndex = pathSegments.findIndex((segment) => knownPrefixes.includes(segment))

      if (prefixIndex !== -1 && pathSegments[prefixIndex + 1]) {
        return pathSegments[prefixIndex + 1]
      }
    }

    return null
  }

  if (platform === 'vimeo') {
    const vimeoRegex = /vimeo\.com\/(?:.*\/)?(\d+)/
    const vimeoMatch = url.match(vimeoRegex)

    return vimeoMatch ? vimeoMatch[1] : null
  }

  if (platform === 'facebook') {
    // Facebook videos have different URL patterns, we'll use the full URL
    return url
  }

  return null
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
