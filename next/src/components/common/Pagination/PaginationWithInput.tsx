import { Button, Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'

import Icon from '@/src/components/common/Icon/Icon'
import { usePaginationWithInput } from '@/src/components/common/Pagination/usePaginationWithInput'
import NumberField from '@/src/components/fields/NumberField'
import cn from '@/src/utils/cn'

type PaginationWithInputProps = {
  currentPage: number
  totalCount: number
  onPageChange: (value: number) => void
}

/**
 * Figma: https://www.figma.com/design/2qF09hDT9QNcpdztVMNAY4/OLO-Web?node-id=37-1906&t=Ix6vxd23ycmma0c2-4
 * Interaction design inspired by: https://ant.design/components/pagination
 */

const PaginationWithInput = ({
  currentPage,
  totalCount,
  onPageChange: handlePageChange,
}: PaginationWithInputProps) => {
  const { t } = useTranslation()

  const { inputValue, handleChange, handleKeyDown } = usePaginationWithInput({
    currentPage,
    totalCount,
    handlePageChange,
  })

  return (
    <nav>
      <div className={cn('flex items-center justify-start gap-4')}>
        <Button
          variant="plain"
          isDisabled={!inputValue || inputValue < 2}
          onPress={() => {
            handlePageChange(currentPage - 1)
          }}
          aria-label={t('Pagination.aria.goToPreviousPage')}
          icon={<Icon name="arrow-left" />}
          className="rounded-full"
        />

        <div className="flex items-center justify-center gap-2">
          <NumberField
            aria-label={t('Pagination.aria.goToPage', { page: inputValue })}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            displayOptionalLabel={false}
            className={cn(
              // Set input width to fit three digits
              // TODO consider setting input width dynamically according to number of pages
              '[&_input]:w-16 [&_input]:text-center',
            )}
          />

          <div className="flex gap-1">
            <div className="flex size-6 justify-center">
              <Typography variant="p-small">/</Typography>
            </div>
            <Typography variant="p-small">{totalCount}</Typography>
          </div>
        </div>

        <Button
          variant="plain"
          isDisabled={!inputValue || inputValue >= totalCount}
          onPress={() => {
            handlePageChange(currentPage + 1)
          }}
          aria-label={t('Pagination.aria.goToNextPage')}
          icon={<Icon name="arrow-right" />}
          className="rounded-full"
        />
      </div>
    </nav>
  )
}

export default PaginationWithInput
