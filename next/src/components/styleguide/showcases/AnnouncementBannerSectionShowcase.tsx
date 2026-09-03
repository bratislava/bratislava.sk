import AnnouncementBannerSection from '@/src/components/sections/homepage-sections/AnnouncementBannerSection'

import Stack from '../Stack'
import Wrapper from '../Wrapper'

const AnnouncementBannerSectionShowcase = () => {
  return (
    <Wrapper direction="column" title="Announcement Banner Section">
      <Stack direction="column" className="items-stretch">
        <AnnouncementBannerSection
          title="Announcement Banner"
          text="This is the default 'dark' variant announcement banner section."
          link={{ label: 'Learn more', url: '#' }}
          variant="dark"
        />

        <AnnouncementBannerSection
          title="Announcement Banner"
          text="This is an announcement banner section. With an inverted variant, the background and text colors are swapped."
          link={{ label: 'Learn more', url: '#' }}
          variant="inverted"
        />
      </Stack>
    </Wrapper>
  )
}

export default AnnouncementBannerSectionShowcase
