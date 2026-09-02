import AnnouncementBannerSection from '@/src/components/common/AnnouncementBannerSection/AnnouncementBannerSection'

import Stack from '../Stack'
import Wrapper from '../Wrapper'

const AnnouncementBannerSectionShowcase = () => {
  return (
    <Wrapper title="Announcement Banner Section">
      <Stack className="w-304">
        <AnnouncementBannerSection
          title="Announcement Banner"
          link={{ label: 'Learn more', url: '#' }}
        />
      </Stack>
    </Wrapper>
  )
}

export default AnnouncementBannerSectionShowcase
