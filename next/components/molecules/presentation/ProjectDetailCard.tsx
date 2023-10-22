import { AddToPhotosIcon, ThumbsUpIcon } from '@assets/ui-icons'
import RegistrationModal from '@components/forms/segments/RegistrationModal/RegistrationModal'
import Button from '@components/forms/simple-components/Button'
import { useUser } from '@components/providers/ServerSideAuthProvider'
import { useState } from 'react'

import CardBase from './CardBase'
import CardContent from './CardContent'

const Divider = () => <div className="my-6 h-1 w-full border-b  border-gray-200" />

interface Props {
  dateMonth: string
  dateYear: number
  votesCount: number
  onVote: () => Promise<void>
  voted?: boolean
}

export const ProjectDetailCard = ({ dateMonth, dateYear, votesCount, voted, onVote }: Props) => {
  const { isAuthenticated } = useUser((state) => state.isAuthenticated)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <RegistrationModal isOpen={isOpen} onOpenChange={(value) => setIsOpen(!!value)} />

      <CardBase variant={null} className="h-full bg-gray-50 lg:w-96">
        <CardContent className="grow justify-between">
          <div className="flex flex-col">
            <h4 className="text-default line-clamp-3">Aktuálny počet hlasov</h4>
            <div className="mt-2 line-clamp-4 text-font">{votesCount}</div>
          </div>

          <Divider />

          <div className="flex flex-col">
            <h4 className="text-default line-clamp-3">Dátum ukončenie hlasovania</h4>
            <div className="mt-2 line-clamp-4 text-font">
              {dateMonth} {dateYear}
            </div>
          </div>

          <Divider />

          <h4 className="text-default line-clamp-3">Páči sa vám projekt?</h4>

          <Button
            className="my-3 w-full"
            size="sm"
            variant="category"
            startIcon={<ThumbsUpIcon />}
            onPress={isAuthenticated ? onVote : () => setIsOpen(true)}
          >
            {voted ? 'Ďakujeme za váš hlas' : 'Podporiť projekt hlasom'}
          </Button>

          <Button
            className="w-full"
            size="sm"
            variant="category-outline"
            startIcon={<AddToPhotosIcon />}
          >
            Podporit projekt hlasom
          </Button>
        </CardContent>
      </CardBase>
    </>
  )
}
