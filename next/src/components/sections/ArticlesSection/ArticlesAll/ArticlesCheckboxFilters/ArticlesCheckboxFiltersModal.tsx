import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'
import { DialogTrigger } from 'react-aria-components'

import Button from '@/src/components/common/Button/Button'
import Dialog from '@/src/components/common/ModalDialog/Dialog'
import Modal from '@/src/components/common/ModalDialog/Modal'
import ArticlesCheckboxFilters from '@/src/components/sections/ArticlesSection/ArticlesAll/ArticlesCheckboxFilters/ArticlesCheckboxFilters'
import { ArticlesFilters } from '@/src/services/meili/fetchers/articlesFetcher'

type Props = {
  triggerButton: ReactNode
  filters: ArticlesFilters
  onFiltersChange: (filters: ArticlesFilters) => void
}

/**
 * Figma: https://www.figma.com/design/2qF09hDT9QNcpdztVMNAY4/OLO-Web?node-id=1341-11025&m=dev
 */

const ArticlesCheckboxFiltersModal = ({ triggerButton, filters, onFiltersChange }: Props) => {
  const { t } = useTranslation()

  return (
    <DialogTrigger>
      {triggerButton}
      <Modal width="auto" modalClassname="h-[100dvh] rounded-none m-0 w-full">
        <Dialog title={t('ArticlesCheckboxFiltersModal.title')}>
          {({ close }) => {
            return (
              <>
                <div className="scrollbar-hide overflow-y-auto">
                  <ArticlesCheckboxFilters filters={filters} onFiltersChange={onFiltersChange} />
                </div>
                <div className="absolute bottom-0 border-t border-border-passive-primary bg-background-passive-base py-3">
                  <Button variant="solid" onPress={close} fullWidth>
                    {t('ArticlesCheckboxFiltersModal.applyFiltersButton')}
                  </Button>
                </div>
              </>
            )
          }}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}

export default ArticlesCheckboxFiltersModal
