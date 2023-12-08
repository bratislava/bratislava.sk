import IconArrowRight from '@assets/ui-icons/sipka-doprava.svg'
import MLink from '@components/forms/simple-components/MLink'

export interface SearchResultsHeaderProps {
  title: string
  // FIXME: set type well
  handleShowMore: any
}

export const SearchResultsHeader = ({ title, handleShowMore }: SearchResultsHeaderProps) => {
  return (
    <div className="mb-4 flex flex-row items-baseline">
      <h2 className="text-size-h4 text-gray-800">{title}</h2>
      <button className="ml-auto flex gap-2 text-main-700" type="button" onClick={handleShowMore}>
        <span className="text-size-p-large font-medium underline">Viac výsledkov</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m11.99 3.37-1.06 1.06 6.86 6.82H2.99v1.5h14.8l-6.86 6.82 1.06 1.06L20.67 12l-8.68-8.63Z"
          />
        </svg>
      </button>
    </div>
  )
}
