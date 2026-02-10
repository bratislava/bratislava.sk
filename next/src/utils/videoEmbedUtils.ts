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

// Based on AI suggestions
export const getVideoId = (platform: string, url: string) => {
  if (platform === 'youtube') {
    const youtubeRegex =
      // eslint-disable-next-line sonarjs/regex-complexity
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[&?]v=)|youtu\.be\/)([^\s"&/?]{11})/
    const youtubeMatch = url.match(youtubeRegex)

    return youtubeMatch ? youtubeMatch[1] : null
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
