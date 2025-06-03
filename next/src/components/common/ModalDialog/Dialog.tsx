import { Typography } from '@bratislava/component-library'
import { forwardRef, ReactNode } from 'react'
import { Dialog as ReactAriaDialog, DialogProps } from 'react-aria-components'
import { CrossIcon } from 'src/assets/icons'

import Button from '@/src/components/common/Button/Button'
import { useTranslation } from '@/src/utils/useTranslation'

type TitleProps = { title: string; 'aria-label'?: string } | { title?: never; 'aria-label': string }

type Props = { children: ReactNode } & TitleProps & Omit<DialogProps, 'children' | 'aria-label'>

/*
 * Styling of Dialog to have fixed header and scrollable body is challenging.
 * Working solution was to use flexbox as mentioned here: https://stackoverflow.com/questions/4069734/fixed-header-footer-with-scrollable-content
 */

const Dialog = forwardRef<HTMLElement, Props>(({ children, title, ...props }, ref) => {
  const { t } = useTranslation()

  return (
    <ReactAriaDialog
      ref={ref}
      {...props}
      className="relative flex h-full flex-col overflow-y-hidden rounded-xl focus:outline-hidden"
    >
      {({ close }) => (
        <>
          {title ? (
            <div className="flex shrink-0 items-start justify-between gap-4 border-b-2 px-6 py-4">
              {/* TODO use Heading, it renders as h2 so we get nested headings */}
              {/* <Heading slot="title"> */}
              <Typography variant="h5" as="h2">
                {title}
              </Typography>
              {/* </Heading> */}
              <Button
                icon={<CrossIcon />}
                aria-label={t('Dialog.aria.close')}
                variant="plain"
                className="-m-2"
                onPress={close}
              />
            </div>
          ) : null}

          <div className="flex grow flex-col overflow-y-scroll p-6">{children}</div>

          {/* If we want to implement some fixed footer, it goes here, with "flex shrink-0" */}

          {/* Render the close button above content, without using z-index, if no Dialog title is provided */}
          {title ? null : (
            <Button
              icon={<CrossIcon />}
              aria-label={t('Dialog.aria.close')}
              className="absolute top-6 right-6 -m-2 bg-white hover:bg-grey-100"
              variant="outline"
              size="small"
              onPress={close}
            />
          )}
        </>
      )}
    </ReactAriaDialog>
  )
})

export default Dialog
