import { AddToPhotosIcon, ThumbsUpIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import { useServerSideAuth } from '@components/providers/ServerSideAuthProvider'

import CardBase from './CardBase'
import CardContent from './CardContent'

const Divider = () => <div className="my-6 h-1 w-full border-b  border-gray-200" />

interface Props {
  dateMonth: string
  dateYear: number
  votesCount: number
  onVote: () => void
  voted?: boolean
}

export const ProjectDetailCard = ({ dateMonth, dateYear, votesCount, voted, onVote }: Props) => {
  const { isAuthenticated } = useServerSideAuth()

  console.log(votesCount, voted)

  return (
    <CardBase variant={null} className="h-full w-96 bg-gray-50">
      <CardContent className="grow justify-between">
        <div className="flex flex-col">
          <h4 className="text-default line-clamp-3 group-hover:underline">Aktuálny počet hlasov</h4>
          <div className="mt-2 line-clamp-4 text-font">{votesCount}</div>
        </div>

        <Divider />

        <div className="flex flex-col">
          <h4 className="text-default line-clamp-3 group-hover:underline">
            Dátum ukončenie hlasovania
          </h4>
          <div className="mt-2 line-clamp-4 text-font">
            {dateMonth} {dateYear}
          </div>
        </div>

        <Divider />

        <h4 className="text-default line-clamp-3 group-hover:underline">Páči sa vám projekt?</h4>

        {isAuthenticated ? (
          <Button
            className="my-3 w-full"
            size="sm"
            variant="category"
            startIcon={<ThumbsUpIcon />}
            onPress={onVote}
          >
            {voted ? 'Ďakujeme za váš hlas' : 'Podporiť projekt hlasom'}
          </Button>
        ) : (
          <Button
            className="my-3 w-full"
            size="sm"
            variant="category"
            href="http://localhost:3001/prihlasenie"
            startIcon={<ThumbsUpIcon />}
          >
            Prihlaste sa a podporte projekt
          </Button>
        )}
        <Button
          className="my-3 w-full"
          size="sm"
          variant="category-outline"
          startIcon={<AddToPhotosIcon />}
        >
          Podporit projekt hlasom
        </Button>
      </CardContent>
    </CardBase>
  )
}
