import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'
import { DialogTrigger } from 'react-aria-components'

import Dialog from '@/src/components/common/ModalDialog/Dialog'
import Modal from '@/src/components/common/ModalDialog/Modal'
import ArticlesCheckboxFilters from '@/src/components/sections/ArticlesSection/ArticlesAll/ArticlesCheckboxFilters'
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
      <Modal width="auto" modalClassname="h-[100dvh] rounded-none mx-0">
        <Dialog title={t('ArticlesCheckboxFiltersModal.title')}>
          <ArticlesCheckboxFilters filters={filters} onFiltersChange={onFiltersChange} />
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}

export default ArticlesCheckboxFiltersModal
