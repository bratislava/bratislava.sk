import { AddressIcon } from '@assets/images'
import { ArrowRightIcon, CalendarIcon, ContactIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import { useServerSideAuth } from '@components/providers/ServerSideAuthStore'
import { formatDate } from '@utils/local-date'

import CardBase from './CardBase'
import CardContent from './CardContent'

interface Props {
  availableTickets: number
  startDate: string
  address: string
  onAdd: () => void
}

export const EventDetailCard = ({ startDate, address, availableTickets, onAdd }: Props) => {
  const { isAuthenticated } = useServerSideAuth()

  const valueMap = [
    { value: formatDate(startDate), icon: <CalendarIcon fontSize={24} /> },
    {
      value: `${availableTickets} voľných miest`,
      icon: <ContactIcon fontSize={24} />,
    },
    { value: address, icon: <AddressIcon fontSize={24} /> },
  ]

  return (
    <CardBase variant={null} className="h-full bg-gray-50 lg:w-96">
      <CardContent className="grow justify-between">
        <h3 className="text-large mb-2 line-clamp-3">Detail podujatia</h3>

        {valueMap.map(({ value, icon }) => (
          <div key={value} className="mt-4 flex gap-4">
            {icon}
            <div className="line-clamp-4 text-font">{value}</div>
          </div>
        ))}

        <Button
          className="my-3 w-full"
          size="sm"
          variant="category"
          startIcon={<ArrowRightIcon />}
          onPress={onAdd}
        >
          Zúčastniť sa podujatia
        </Button>

        <Button
          className="w-full"
          size="sm"
          variant="category-outline"
          startIcon={<CalendarIcon />}
        >
          Pridať do kalendára
        </Button>
      </CardContent>
    </CardBase>
  )
}
