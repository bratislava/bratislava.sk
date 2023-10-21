import { AddToPhotosIcon, ThumbsUpIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'

import CardBase from './CardBase'
import CardContent from './CardContent'

const Divider = () => <div className="my-6 h-1 w-full border-b  border-gray-200" />

export const ProjectDetailCard = ({ id, dateMonth, dateYear, votesCount }) => {
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

        <Button
          className="my-3 w-full"
          size="sm"
          variant="category"
          startIcon={<ThumbsUpIcon />}
          onPress={() => console.log(id)}
        >
          Podporit projekt hlasom
        </Button>
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
