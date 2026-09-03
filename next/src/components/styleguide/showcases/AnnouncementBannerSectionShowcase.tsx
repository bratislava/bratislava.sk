import AnnouncementBannerSection from '@/src/components/sections/homepage-sections/AnnouncementBannerSection'

import Stack from '../Stack'
import Wrapper from '../Wrapper'

const AnnouncementBannerSectionShowcase = () => {
  return (
    <Wrapper direction="column" title="Announcement Banner Section">
      <Stack direction="column" className="items-stretch">
        <AnnouncementBannerSection
          title="Announcement Banner"
          text="This is an announcement banner section."
          link={{ label: 'Learn more', url: '#' }}
          variant="dark"
        />
      </Stack>
    </Wrapper>
  )
}

export default AnnouncementBannerSectionShowcase
