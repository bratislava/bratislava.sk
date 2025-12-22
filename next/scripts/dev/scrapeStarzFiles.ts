/**
 * Scrapes files from old.starz.sk website and exports to CSV
 *
 * Usage:
 * 1. Install dependencies: npm install cheerio @types/cheerio --save-dev
 * 2. Run: npx ts-node scripts/dev/scrapeStarzFiles.ts
 * 3. Skip validation: npx ts-node scripts/dev/scrapeStarzFiles.ts --skip-validation
 *    Or set env var: SKIP_VALIDATION=true npx ts-node scripts/dev/scrapeStarzFiles.ts
 *
 * Output: starz_files_export.csv in scripts/dev/
 */
/* eslint-disable no-console, no-await-in-loop, no-plusplus */
import * as fs from 'node:fs'
import path from 'node:path'

import axios from 'axios'
// eslint-disable-next-line import/no-extraneous-dependencies -- cheerio needs to be installed: npm install cheerio @types/cheerio --save-dev
import * as cheerio from 'cheerio'

interface StrapiCategory {
  id: number
  name: string
  documentId: string
  slug: string
}

interface FileEntry {
  fileName: string
  format: string
  mimeType: string
  fileUrl: string
  dateOfCreation: string
  oldCategory: string
  clarifiedOldCategory: string
  newCategory: string
  strapiCategoryId: number
  strapiDocumentId: string
  description: string
}

// Strapi categories mapping
const STRAPI_CATEGORIES: Record<string, StrapiCategory> = {
  'Analýzy a štúdie': {
    id: 20,
    name: 'Analýzy a štúdie',
    documentId: 'ydoapc2fqj0h6v6mxwl5i1h6',
    slug: 'analyzy-a-studie',
  },
  Cenníky: {
    id: 15,
    name: 'Cenníky',
    documentId: 'oytvn04773zurr0gxogkcdcp',
    slug: 'cenniky',
  },
  'Dotácie a granty': {
    id: 5,
    name: 'Dotácie a granty',
    documentId: 'rfwrojftu3i55ip4io6mgnf1',
    slug: 'dotacie-a-granty',
  },
  Faktúry: {
    id: 13,
    name: 'Faktúry',
    documentId: 'ai39q8rj74gy7lqdjlr8gymo',
    slug: 'faktury',
  },
  Iné: {
    id: 23,
    name: 'Iné',
    documentId: 'cb81mbgvmtznnanyayn930hq',
    slug: 'ine',
  },
  Kontroly: {
    id: 11,
    name: 'Kontroly',
    documentId: 'ivek8yg384ldppai5mn8jqvl',
    slug: 'kontroly',
  },
  'Logo a vizuálna identita': {
    id: 24,
    name: 'Logo a vizuálna identita',
    documentId: 'q33htfln9jp0zk16p11vz2ir',
    slug: 'logo-a-vizualna-identita',
  },
  'Majetok mesta': {
    id: 18,
    name: 'Majetok mesta',
    documentId: 'vfbqi9b2sajz0mdawj30w3eg',
    slug: 'majetok-mesta',
  },
  'Metodiky a pravidlá': {
    id: 22,
    name: 'Metodiky a pravidlá',
    documentId: 'wpmh3ruqgrfkqbo0nk3ik9jc',
    slug: 'metodiky-a-pravidla',
  },
  'Návštevné poriadky': {
    id: 21,
    name: 'Návštevné poriadky',
    documentId: 'zsj7mw3t0mpivcmqrr5wsno5',
    slug: 'navstevne-poriadky',
  },
  'Obchodné verejné súťaže': {
    id: 8,
    name: 'Obchodné verejné súťaže',
    documentId: 'sojxkxo3vn2g9ei9s8kugv3s',
    slug: 'obchodne-verejne-sutaze',
  },
  Objednávky: {
    id: 14,
    name: 'Objednávky',
    documentId: 'do3kl5ylc00hrgyazov3q57h',
    slug: 'objednavky',
  },
  'Ochrana osobných údajov': {
    id: 9,
    name: 'Ochrana osobných údajov',
    documentId: 'jtmb9vgx3a9thu06efhi53aj',
    slug: 'ochrana-osobnych-udajov',
  },
  'Organizačné dokumenty': {
    id: 17,
    name: 'Organizačné dokumenty',
    documentId: 'yfhtick12vdi8dyfcixljwh1',
    slug: 'organizacne-dokumenty',
  },
  Petície: {
    id: 7,
    name: 'Petície',
    documentId: 'c5cn142sm09lu4no7g52pyya',
    slug: 'peticie',
  },
  'Plány a koncepcie': {
    id: 16,
    name: 'Plány a koncepcie',
    documentId: 'a4vga4xpvr42371m0z7p86i3',
    slug: 'plany-a-koncepcie',
  },
  Rozpočet: {
    id: 10,
    name: 'Rozpočet',
    documentId: 'vbeyoeu2dnb3w65tud4wpfw6',
    slug: 'rozpocet',
  },
  'Tlačivá / Žiadosti / Vzory': {
    id: 2,
    name: 'Tlačivá / Žiadosti / Vzory',
    documentId: 'frqcxp1vbajhmqx7dnx2dt6o',
    slug: 'tlaciva-ziadosti-vzory',
  },
  'Verejné obstarávanie': {
    id: 19,
    name: 'Verejné obstarávanie',
    documentId: 'ptqorybweyao37nt9wlmnpe7',
    slug: 'verejne-obstaravanie',
  },
  'Výberové konania a zamestnanie': {
    id: 6,
    name: 'Výberové konania a zamestnanie',
    documentId: 'xrisafy6njd14mb8byl7i9ys',
    slug: 'vyberove-konania-a-zamestnanie',
  },
  'Výročné správy': {
    id: 3,
    name: 'Výročné správy',
    documentId: 'd9yg86prrk14zykrgpey790w',
    slug: 'vyrocne-spravy',
  },
  Zmluvy: {
    id: 12,
    name: 'Zmluvy',
    documentId: 'rimn5swyut0ckvpzj50epi8o',
    slug: 'zmluvy',
  },
  Zápisnice: {
    id: 4,
    name: 'Zápisnice',
    documentId: 'j5sbnm8qge3rum8v9r6rm23n',
    slug: 'zapisnice',
  },
}

// Map old categories to new Strapi categories
const mapToStrapiCategory = (oldCategory: string, parentCategory: string): StrapiCategory => {
  const catLower = oldCategory.toLowerCase()
  const parentLower = parentCategory.toLowerCase()

  // Direct matches
  if (catLower.includes('objednávk')) return STRAPI_CATEGORIES.Objednávky
  if (catLower.includes('faktúr')) return STRAPI_CATEGORIES.Faktúry
  if (catLower.includes('zmluv')) return STRAPI_CATEGORIES.Zmluvy
  if (catLower.includes('rozpočet')) return STRAPI_CATEGORIES.Rozpočet
  if (catLower.includes('cenník')) return STRAPI_CATEGORIES.Cenníky
  if (catLower.includes('dotáci') || catLower.includes('grant'))
    return STRAPI_CATEGORIES['Dotácie a granty']
  if (catLower.includes('verejné obstarávanie') || parentLower.includes('verejné obstarávanie'))
    return STRAPI_CATEGORIES['Verejné obstarávanie']
  if (catLower.includes('organizačn') || catLower.includes('organizačné dokumenty'))
    return STRAPI_CATEGORIES['Organizačné dokumenty']
  if (
    catLower.includes('ochrana osobných údajov') ||
    parentLower.includes('ochrana osobných údajov')
  )
    return STRAPI_CATEGORIES['Ochrana osobných údajov']
  if (catLower.includes('zápisnic')) return STRAPI_CATEGORIES.Zápisnice
  if (catLower.includes('výročn')) return STRAPI_CATEGORIES['Výročné správy']
  if (catLower.includes('plán') || catLower.includes('koncepci'))
    return STRAPI_CATEGORIES['Plány a koncepcie']
  if (catLower.includes('metodik') || catLower.includes('pravidl'))
    return STRAPI_CATEGORIES['Metodiky a pravidlá']
  if (catLower.includes('analýz') || catLower.includes('štúdi'))
    return STRAPI_CATEGORIES['Analýzy a štúdie']
  if (catLower.includes('kontrol')) return STRAPI_CATEGORIES.Kontroly
  if (catLower.includes('petíci')) return STRAPI_CATEGORIES.Petície
  if (catLower.includes('výberov') || catLower.includes('zamestnan'))
    return STRAPI_CATEGORIES['Výberové konania a zamestnanie']
  if (catLower.includes('obchodn') || catLower.includes('verejné súťaže'))
    return STRAPI_CATEGORIES['Obchodné verejné súťaže']
  if (catLower.includes('tlačiv') || catLower.includes('žiadosť') || catLower.includes('vzor'))
    return STRAPI_CATEGORIES['Tlačivá / Žiadosti / Vzory']
  if (catLower.includes('logo') || catLower.includes('vizuál'))
    return STRAPI_CATEGORIES['Logo a vizuálna identita']
  if (catLower.includes('majetok')) return STRAPI_CATEGORIES['Majetok mesta']
  if (catLower.includes('návštevn') || catLower.includes('poriadok'))
    return STRAPI_CATEGORIES['Návštevné poriadky']

  return STRAPI_CATEGORIES.Iné
}

// Escape quotes in CSV
const escapeCsv = (str: string) => `"${str.replaceAll('"', '""')}"`

// Clarify old category based on mapping rules
const clarifyOldCategory = (oldCategory: string, dateOfCreation: string): string => {
  // Extract year from dateOfCreation (format: DD.MM.YYYY)
  let year = ''
  if (dateOfCreation) {
    const dateYearMatch = dateOfCreation.match(/(\d{4})/)
    if (dateYearMatch) {
      year = dateYearMatch[1] || ''
    }
  }

  // If no year found, use current year as fallback
  if (!year) {
    year = new Date().getFullYear().toString()
  }

  const catLower = oldCategory.toLowerCase().trim()

  // "Prijaté objednávky" -> "Prijaté objednávky YYYY"
  if (catLower === 'prijaté objednávky' || catLower === 'prijate objednavky') {
    return `Prijaté objednávky ${year}`
  }

  // "Objednávky 2017,2018" -> "Objednávky YYYY" (use year from dateOfCreation)
  if (/objednávky\s+\d{4}[\s,]+\d{4}/i.test(oldCategory)) {
    return `Objednávky ${year}`
  }

  // "Prijaté objednávky od 1.10.2016" -> "Prijaté objednávky 2016"
  const prijateOdMatch = oldCategory.match(/prijaté\s+objednávky\s+od\s+(?:\d{1,2}\.){2}(\d{4})/i)
  if (prijateOdMatch) {
    return `Prijaté objednávky ${prijateOdMatch[1]}`
  }

  // "STARZ od 1.10.2016" -> "Objednávky 2016"
  const starzOdMatch = oldCategory.match(/starz\s+od\s+(?:\d{1,2}\.){2}(\d{4})/i)
  if (starzOdMatch) {
    return `Objednávky ${starzOdMatch[1]}`
  }

  // "Ekonomický útvar" -> "Objednávky YYYY"
  if (catLower === 'ekonomický útvar' || catLower === 'ekonomicky utvar') {
    return `Objednávky ${year}`
  }

  // "Technický útvar" -> "Objednávky YYYY"
  if (catLower === 'technický útvar' || catLower === 'technicky utvar') {
    return `Objednávky ${year}`
  }

  // "Útvar marketingu a športu" -> "Objednávky YYYY"
  if (catLower === 'útvar marketingu a športu' || catLower === 'utvar marketingu a sportu') {
    return `Objednávky ${year}`
  }

  // Default: return original category
  return oldCategory
}

// Normalize file name: trim whitespace, replace multiple spaces, fix specific patterns
const normalizeFileName = (fileName: string): string => {
  let normalized = fileName.trim().replaceAll(/\s+/g, ' ')

  // Replace spaced-out patterns (handles both "Z M L U V A   O   D I E L O" and "Z M L U V A o D I E L O")
  normalized = normalized.replaceAll(
    /z\s+m\s+l\s+u\s+v\s+a\s+o\s+d\s+i\s+e\s+l\s+o/gi,
    'Zmluva o dielo',
  )

  // Replace all-caps terms with proper case
  const replacements: Array<[string, string]> = [
    ['ZMLUVA O DIELO', 'Zmluva o dielo'],
    [
      'ZMLUVA O POSKYTOVANÍ PRÍSTUPU DO SIETE INTERNET',
      'Zmluva o poskytovaní prístupu do siete internet',
    ],
    ['NÁJOMNÁ ZMLUVA', 'Nájomná zmluva'],
    ['ZMLUVA O ZDRUŽENEJ DODÁVKE ZEMNÉHO PLYNU', 'Zmluva o združenej dodávke zemného plynu'],
    [
      'VYHLÁSENIE VÝSLEDKOV OBCHODNÝCH VEREJNÝCH SÚŤAŽÍ',
      'Vyhlásenie výsledkov obchodných verejných súťaží',
    ],
    [
      'VYHODNOTENIE OPAKOVANÉHO PONUKOVÉHO KONANIA LK MIČURÍN',
      'Vyhodnotenie opakovaného ponukového konania LK Mičurín',
    ],
    [
      'OZNÁMENIE O ZRUŠENÍ OBCHODNEJ VEREJNEJ SÚŤAŽE',
      'Oznámenie o zrušení obchodnej verejnej súťaže',
    ],
    ['VYHLÁSENIE OBCHODNEJ VEREJNEJ SÚŤAŽE', 'Vyhlásenie obchodnej verejnej súťaže'],
    ['VYHLÁSENIE ZÁMERU', 'Vyhlásenie zámeru'],
    ['DODATOK', 'Dodatok'],
  ]

  replacements.forEach(([allCaps, properCase]) => {
    // Use word boundary to avoid partial matches
    // eslint-disable-next-line security/detect-non-literal-regexp -- replacements are predefined
    const regex = new RegExp(`\\b${allCaps.replaceAll(/\s+/g, '\\s+')}\\b`, 'g')
    normalized = normalized.replaceAll(regex, properCase)
  })

  return normalized
}

const getMimeType = (format: string): string => {
  const mimeMap: Record<string, string> = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    zip: 'application/zip',
    rar: 'application/x-rar-compressed',
    txt: 'text/plain',
    html: 'text/html',
    htm: 'text/html',
  }

  return mimeMap[format.toLowerCase()] || 'application/octet-stream'
}

const isValidFileUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await axios.head(url, { timeout: 10_000, maxRedirects: 5 })
    const contentType = response.headers['content-type'] || ''
    // Skip HTML pages
    if (contentType.includes('text/html')) return false

    return response.status === 200
  } catch {
    try {
      // Try GET if HEAD fails
      const response = await axios.get(url, {
        timeout: 10_000,
        maxRedirects: 5,
        validateStatus: () => true,
      })
      const contentType = response.headers['content-type'] || ''
      if (contentType.includes('text/html')) return false

      return response.status === 200
    } catch {
      return false
    }
  }
}

const scrapePage = async (
  url: string,
): Promise<{ files: FileEntry[]; nextPageUrl: string | null }> => {
  console.log(`Scraping: ${url}`)
  const response = await axios.get(url, { timeout: 30_000 })
  const $ = cheerio.load(response.data)

  const files: FileEntry[] = []
  const bodyText = $('body').text()

  // Check if this is a search results page (has "Prehľad dokumentov" or "zobraz_dok.asp")
  const isSearchResultsPage =
    bodyText.includes('Prehľad dokumentov') || url.includes('zobraz_dok.asp')

  let parentCategory = ''
  let currentCategory = ''

  if (isSearchResultsPage) {
    // For search results page, category is extracted per item from "Zložka dokumentov: [name]"
    // We'll extract it per file item
  } else {
    // Find location (Umiestnenie) - parse breadcrumb path for category pages
    const locationMatch = bodyText.match(/umiestnenie:\s*([^\n]+)/i)
    if (locationMatch) {
      const locationPath = locationMatch[1]?.trim() || ''
      // Parse breadcrumb: "Zložky dokumentov > Transparentný STaRZ > Objednávky > Objednávky 2025 > Prijaté objednávky"
      const parts = locationPath
        .split('>')
        .map((p) => p.trim())
        .filter(Boolean)
      if (parts.length > 1) {
        parentCategory = parts.slice(0, -1).join(' > ')
        currentCategory = parts.at(-1) || ''
      } else if (parts.length === 1) {
        ;[currentCategory] = parts
      }
    }
  }

  if (isSearchResultsPage) {
    // Parse search results page structure
    // Files are in list items with format: "**Title [PDF, size]** (date) Zložka dokumentov: [category]"
    $('li').each((_, element) => {
      const $li = $(element)
      const liText = $li.text()
      const $link = $li.find('a[href]').first()
      const href = $link.attr('href')

      if (!href) return

      // Check if this list item contains a file link
      const hasFilePattern = /\[(pdf|doc|docx|xls|xlsx|zip|rar|txt)/i.test(liText)
      if (!hasFilePattern) return

      // Extract category from "Zložka dokumentov: [name]"
      const categoryMatch = liText.match(/zložka dokumentov:\s*([^\n]+)/i)
      const itemCategory = categoryMatch ? categoryMatch[1]?.trim() || '' : 'Unknown'

      // Extract file name - get text from bold link
      let fileName = $link.find('strong').text().trim() || $link.text().trim()
      // Remove [PDF, size] pattern
      fileName = fileName.replaceAll(/\s*\[.*?]\s*/g, '').trim()
      // Remove date pattern
      fileName = fileName.replaceAll(/\s*\((?:\d{1,2}\.){2}\d{4}\)\s*/g, '').trim()

      // Extract format from [PDF, ...] pattern
      const formatMatch = liText.match(/\[(pdf|doc|docx|xls|xlsx|zip|rar|txt)/i)
      const format = formatMatch ? formatMatch[1]?.toLowerCase() || 'pdf' : 'pdf'

      // Skip HTML files
      if (format === 'html' || format === 'htm') return

      // If no good name, try from URL
      if (!fileName || fileName.length < 3) {
        const urlFileName = href.split('/').pop()?.split('?')[0] || ''
        fileName =
          urlFileName && /\.(pdf|doc|docx|xls|xlsx|zip|rar|txt)/i.test(urlFileName)
            ? decodeURIComponent(urlFileName)
            : 'unknown'
      }

      // Normalize file name
      fileName = normalizeFileName(fileName)

      // Extract date from text (format: DD.MM.YYYY)
      const dateMatch = liText.match(/\(((?:\d{1,2}\.){2}\d{4})\)/)
      const dateOfCreation = dateMatch ? dateMatch[1] || '' : ''

      // Extract description - text after the file link, before "Zložka dokumentov"
      let description = ''
      // Get all text nodes in the list item, excluding the link itself
      const $liClone = $li.clone()
      $liClone.find('a').remove()
      let descText = $liClone.text().trim()

      // Remove file format/size pattern like "[PDF, 220 kB]"
      descText = descText.replaceAll(/\s*\[(pdf|doc|docx|xls|xlsx|zip|rar|txt)[^\]]*]/gi, '').trim()
      // Remove date pattern if present
      descText = descText.replace(/\((?:\d{1,2}\.){2}\d{4}\)/, '').trim()
      // Remove "Zložka dokumentov: ..." part and everything after it
      const categoryIndex = descText.toLowerCase().indexOf('zložka dokumentov:')
      if (categoryIndex !== -1) {
        descText = descText.slice(0, categoryIndex).trim()
      }
      // Clean up multiple spaces but keep newlines
      if (descText) {
        // Normalize multiple spaces to single space, but preserve newlines
        descText = descText.replaceAll(/[\t ]+/g, ' ').trim()
        description = descText
      }

      // Build full URL
      let fileUrl: string
      try {
        fileUrl = href.startsWith('http') ? href : new URL(href, url).toString()
      } catch {
        fileUrl = href
      }

      const strapiCategory = mapToStrapiCategory(itemCategory, '')
      const entry: FileEntry = {
        fileName,
        format,
        mimeType: getMimeType(format),
        fileUrl,
        dateOfCreation,
        oldCategory: itemCategory,
        clarifiedOldCategory: clarifyOldCategory(itemCategory, dateOfCreation),
        newCategory: strapiCategory.name,
        strapiCategoryId: strapiCategory.id,
        strapiDocumentId: strapiCategory.documentId,
        description,
      }

      files.push(entry)
    })
  } else {
    // Original category page parsing
    // Find file links - look for links with [PDF, ...] pattern or file extensions
    $('a[href]').each((_, element) => {
      const $link = $(element)
      const href = $link.attr('href')
      const text = $link.text().trim()

      if (!href) return

      // Get full text including parent elements for date extraction
      const $parent = $link.parent()
      const parentText = $parent.text().trim()

      // Skip HTML links and document structure links
      if (
        (href.includes('.html') || href.includes('.htm') || /\/ds-\d+/.test(href)) &&
        !/\[pdf|\[doc|\[xls|\[zip|\[rar/i.test(text) &&
        !/\.(pdf|doc|docx|xls|xlsx|zip|rar|txt)(\?|$)/i.test(href)
      ) {
        return
      }

      // Check if it's a file link - either has file extension or [PDF] pattern
      const hasFileExt = /\.(pdf|doc|docx|xls|xlsx|zip|rar|txt)(\?|$)/i.test(href)
      const hasFilePattern =
        /\[(pdf|doc|docx|xls|xlsx|zip|rar|txt)/i.test(text) ||
        /\[(pdf|doc|docx|xls|xlsx|zip|rar|txt)/i.test(parentText)

      if (!hasFileExt && !hasFilePattern) return

      // Extract format from [PDF, ...] or file extension
      const formatMatch =
        text.match(/\[(pdf|doc|docx|xls|xlsx|zip|rar|txt)/i) ||
        parentText.match(/\[(pdf|doc|docx|xls|xlsx|zip|rar|txt)/i) ||
        href.match(/\.(pdf|doc|docx|xls|xlsx|zip|rar|txt)(\?|$)/i)

      const format = formatMatch ? formatMatch[1]?.toLowerCase() || 'pdf' : 'pdf'

      // Skip HTML files
      if (format === 'html' || format === 'htm') return

      // Extract file name - remove [PDF, ...] and date patterns
      let fileName = text.replaceAll(/\s*\[.*?]\s*/g, '').trim()
      fileName = fileName.replaceAll(/\s*\((?:\d{1,2}\.){2}\d{4}\)\s*/g, '').trim()

      // If no good name from text, try from URL
      if (!fileName || fileName.length < 3) {
        const urlFileName = href.split('/').pop()?.split('?')[0] || ''
        fileName =
          urlFileName && /\.(pdf|doc|docx|xls|xlsx|zip|rar|txt)/i.test(urlFileName)
            ? decodeURIComponent(urlFileName)
            : 'unknown'
      }

      // Normalize file name: trim and normalize whitespace
      fileName = normalizeFileName(fileName)

      // Extract date from text (format: DD.MM.YYYY)
      const dateMatch =
        text.match(/\(((?:\d{1,2}\.){2}\d{4})\)/) || parentText.match(/\(((?:\d{1,2}\.){2}\d{4})\)/)
      const dateOfCreation = dateMatch ? dateMatch[1] || '' : ''

      // Extract description - text after the file link in parent element
      let description = ''
      const linkIndex = parentText.indexOf(text)
      if (linkIndex !== -1) {
        // Get text after the link
        let descText = parentText.slice(linkIndex + text.length)
        // Remove file format/size pattern like "[PDF, 220 kB]"
        descText = descText
          .replaceAll(/\s*\[(pdf|doc|docx|xls|xlsx|zip|rar|txt)[^\]]*]/gi, '')
          .trim()
        // Remove date pattern if present
        descText = descText.replace(/\((?:\d{1,2}\.){2}\d{4}\)/, '').trim()
        // Clean up multiple spaces but keep newlines
        if (descText) {
          // Normalize multiple spaces to single space, but preserve newlines
          descText = descText.replaceAll(/[\t ]+/g, ' ').trim()
          description = descText
        }
      }

      // Build full URL
      let fileUrl: string
      try {
        fileUrl = href.startsWith('http') ? href : new URL(href, url).toString()
      } catch {
        fileUrl = href
      }

      const strapiCategory = mapToStrapiCategory(currentCategory, parentCategory)
      const entry: FileEntry = {
        fileName,
        format,
        mimeType: getMimeType(format),
        fileUrl,
        dateOfCreation,
        oldCategory: currentCategory || 'Unknown',
        clarifiedOldCategory: clarifyOldCategory(currentCategory || 'Unknown', dateOfCreation),
        newCategory: strapiCategory.name,
        strapiCategoryId: strapiCategory.id,
        strapiDocumentId: strapiCategory.documentId,
        description,
      }

      files.push(entry)
    })
  }

  // Find next page link - look for pagination links
  let nextPageUrl: string | null = null
  const currentPageMatch = url.match(/stranka=(\d+)/i)
  const currentPageNum = currentPageMatch ? Number.parseInt(currentPageMatch[1] || '1', 10) : 1

  if (isSearchResultsPage) {
    // For search results, look for "ďalšia stránka" link or next page number
    $('a').each((_, element) => {
      const $link = $(element)
      const href = $link.attr('href')
      const text = $link.text().trim().toLowerCase()

      if (!href) return

      // Look for "ďalšia stránka" or next page number
      if (text.includes('ďalšia') || text.includes('next')) {
        const pageMatch = href.match(/stranka=(\d+)/i)
        if (pageMatch) {
          const pageNum = Number.parseInt(pageMatch[1] || '1', 10)
          if (pageNum === currentPageNum + 1) {
            try {
              nextPageUrl = href.startsWith('http') ? href : new URL(href, url).toString()
            } catch {
              // Skip invalid URLs
            }
          }
        }
      } else {
        // Check if it's a page number link
        const pageMatch = href.match(/stranka=(\d+)/i)
        if (pageMatch && /^\d+$/.test(text)) {
          const pageNum = Number.parseInt(pageMatch[1] || '1', 10)
          if (pageNum === currentPageNum + 1) {
            try {
              nextPageUrl = href.startsWith('http') ? href : new URL(href, url).toString()
            } catch {
              // Skip invalid URLs
            }
          }
        }
      }
    })
  } else {
    // Look for pagination links in category pages
    $('a[href*="stranka="], a[href*="archiv=1"]').each((_, element) => {
      const $link = $(element)
      const href = $link.attr('href')

      if (!href) return

      const pageMatch = href.match(/stranka=(\d+)/i)
      if (pageMatch) {
        const pageNum = Number.parseInt(pageMatch[1] || '1', 10)
        // Find next page (higher than current)
        if (pageNum === currentPageNum + 1) {
          try {
            nextPageUrl = href.startsWith('http') ? href : new URL(href, url).toString()
          } catch {
            // Skip invalid URLs
          }
        }
      }
    })
  }

  // If no explicit next link found, construct it
  if (!nextPageUrl && currentPageNum < 100) {
    const nextPage = currentPageNum + 1
    if (url.includes('stranka=')) {
      nextPageUrl = url.replace(/stranka=\d+/i, `stranka=${nextPage}`)
    } else {
      nextPageUrl = url.includes('?') ? `${url}&stranka=${nextPage}` : `${url}?stranka=${nextPage}`
    }
  }

  return { files, nextPageUrl }
}

const main = async () => {
  // Check for skip validation flag
  const skipValidation =
    process.argv.includes('--skip-validation') ||
    process.argv.includes('--no-validation') ||
    process.env.SKIP_VALIDATION === 'true'

  const baseUrl =
    'https://old.starz.sk/vismo/zobraz_dok.asp?hledani=1&datum_do=&id_org=600167&datum_od=1%2E1%2E2015&query=&strVlastnik=&kontext=1&archiv=1&submit=Vyh%C4%BEada%C5%A5&tzv=1&pocet=25&stranka=1'
  const allFiles: FileEntry[] = []
  const seenUrls = new Set<string>()
  let currentUrl: string | null = baseUrl
  let pageCount = 0
  // Search results show 2344 total records, 25 per page = ~94 pages
  const maxPages = 100

  console.log('Starting scrape...')
  if (skipValidation) {
    console.log('URL validation: SKIPPED')
  }

  // First pass: collect all files
  while (currentUrl && pageCount < maxPages) {
    pageCount++
    console.log(`Page ${pageCount}/${maxPages}`)

    try {
      const { files, nextPageUrl } = await scrapePage(currentUrl)

      // Add files (deduplicate by URL)
      for (const file of files) {
        if (!seenUrls.has(file.fileUrl)) {
          seenUrls.add(file.fileUrl)
          allFiles.push(file)
          console.log(`  Found: ${file.fileName}`)
        }
      }

      currentUrl = nextPageUrl

      // Small delay to avoid overwhelming server
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      console.error(`Error on page ${pageCount}:`, error)
      // Try to continue with next page
      if (currentUrl && currentUrl.includes('stranka=')) {
        const match: RegExpMatchArray | null = currentUrl.match(/stranka=(\d+)/i)
        if (match && match[1]) {
          const nextPage: number = Number.parseInt(match[1], 10) + 1
          currentUrl = currentUrl.replace(/stranka=\d+/i, `stranka=${nextPage}`)
        } else {
          break
        }
      } else {
        break
      }
    }
  }

  // Second pass: validate URLs (if not skipped)
  let validFiles: FileEntry[]
  if (skipValidation) {
    console.log(`\nSkipping URL validation. Using all ${allFiles.length} collected files.`)
    validFiles = allFiles
  } else {
    console.log(`\nCollected ${allFiles.length} files. Validating URLs...`)

    validFiles = []
    for (let i = 0; i < allFiles.length; i += 1) {
      const file = allFiles[i]
      process.stdout.write(
        `\rValidating ${i + 1}/${allFiles.length}: ${file.fileName.slice(0, 50)}...`,
      )

      const isValid = await isValidFileUrl(file.fileUrl)
      if (isValid) {
        validFiles.push(file)
      } else {
        console.log(`\n  ✗ Skipped (HTML or invalid): ${file.fileName}`)
      }

      // Small delay
      if (i % 10 === 0) {
        await new Promise((resolve) => {
          setTimeout(resolve, 200)
        })
      }
    }

    console.log('\n')
  }

  // Write CSV
  const csvHeader =
    'fileName,format,mimeType,fileUrl,dateOfCreation,oldCategory,clarifiedOldCategory,newCategory,id,documentId,description\n'
  const csvRows = validFiles
    .map(
      (file) =>
        `${escapeCsv(file.fileName)},${escapeCsv(file.format)},${escapeCsv(file.mimeType)},${escapeCsv(file.fileUrl)},${escapeCsv(file.dateOfCreation)},${escapeCsv(file.oldCategory)},${escapeCsv(file.clarifiedOldCategory)},${escapeCsv(file.newCategory)},${file.strapiCategoryId},${escapeCsv(file.strapiDocumentId)},${escapeCsv(file.description)}`,
    )
    .join('\n')

  const csvContent = csvHeader + csvRows
  const outputPath = path.join(process.cwd(), 'next/scripts/dev/starz_files_export.csv')
  const outputDir = path.dirname(outputPath)

  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Create/overwrite CSV file (writeFileSync creates file if it doesn't exist)
  fs.writeFileSync(outputPath, csvContent, 'utf8')

  console.log(`Done! Valid files: ${validFiles.length}/${allFiles.length}`)
  console.log(`CSV saved to: ${outputPath}`)
}

main().catch(console.error)
