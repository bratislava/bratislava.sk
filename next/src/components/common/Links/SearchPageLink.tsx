import { Button, Typography } from '@bratislava/component-library'

import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import { getLinkProps } from '@/src/utils/getLinkProps'

type Props = {
  searchPage: string
}

const SearchPageLink = ({ searchPage }: Props) => {
  const { general } = useGeneralContext()

  let page

  switch (searchPage) {
    case 'officialBoard':
      page = general?.officialBoardPage
      break
    case 'articles':
      page = general?.newsPage
      break
    case 'assets':
      page = general?.assetsPage
      break
    default:
      return null
  }

  return page ? (
    <Button variant="link" {...getLinkProps({ page })}>
      <Typography variant="p-small">{page.title}</Typography>
    </Button>
  ) : null
}

export default SearchPageLink
