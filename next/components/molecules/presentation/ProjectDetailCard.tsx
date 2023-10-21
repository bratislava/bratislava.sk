import { AddToPhotosIcon, ThumbsUpIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'

import CardBase from './CardBase'
import CardContent from './CardContent'

const Divider = () => <div className="my-6 h-1 w-full border-b  border-gray-200" />

export const ProjectDetailCard = ({ ...rest }) => {
  return (
    <CardBase variant={null} className="h-full w-96 bg-gray-50" {...rest}>
      <CardContent className="grow justify-between">
        <div className="flex flex-col">
          <h4 className="text-default line-clamp-3 group-hover:underline">Aktuálny počet hlasov</h4>
          <div className="mt-2 line-clamp-4 text-font">22 456</div>
        </div>

        <Divider />

        <div className="flex flex-col">
          <h4 className="text-default line-clamp-3 group-hover:underline">
            Dátum ukončenie hlasovania
          </h4>
          <div className="mt-2 line-clamp-4 text-font">30. október 2023</div>
        </div>

        <Divider />

        <h4 className="text-default line-clamp-3 group-hover:underline">Páči sa vám projekt?</h4>

        <Button className="my-3 w-full" size="sm" variant="category" startIcon={<ThumbsUpIcon />}>
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
