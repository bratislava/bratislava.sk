import AnnouncementBanner from '@/src/components/common/AnnouncementBanner/AnnouncementBanner'

import Stack from '../Stack'
import Wrapper from '../Wrapper'

const AnnouncementBannerShowcase = () => {
  return (
    <Wrapper title="Non-critical notification">
      <Stack className="w-304">
        <AnnouncementBanner />
      </Stack>
    </Wrapper>
  )
}

export default AnnouncementBannerShowcase
