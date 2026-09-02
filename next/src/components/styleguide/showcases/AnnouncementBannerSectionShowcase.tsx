import AnnouncementBannerSection from '@/src/components/common/AnnouncementBannerSection/AnnouncementBannerSection'

import Stack from '../Stack'
import Wrapper from '../Wrapper'

const AnnouncementBannerSectionShowcase = () => {
  return (
    <Wrapper direction="column" title="Announcement Banner Section">
      <Stack direction="column" className="items-stretch">
        <AnnouncementBannerSection
          title="Announcement Banner"
          link={{ label: 'Learn more', url: '#' }}
        />
      </Stack>
    </Wrapper>
  )
}

export default AnnouncementBannerSectionShowcase
