import { Typography } from '@bratislava/component-library'
import { useTranslations } from 'next-intl'
import React, { forwardRef, ReactNode } from 'react'
import { Dialog as ReactAriaDialog, DialogProps } from 'react-aria-components'

import { CrossIcon } from '@/assets/ui-icons'
import Button from '@/components/common/Button/Button'

type TitleProps = { title: string; 'aria-label'?: string } | { title?: never; 'aria-label': string }

type Props = { children: ReactNode } & TitleProps & Omit<DialogProps, 'children' | 'aria-label'>

/*
 * Styling of Dialog to have fixed header and scrollable body is challenging.
 * Working solution was to use flexbox as mentioned here: https://stackoverflow.com/questions/4069734/fixed-header-footer-with-scrollable-content
 */

const Dialog = forwardRef<HTMLElement, Props>(({ children, title, ...props }, ref) => {
  const t = useTranslations('Dialog')

  return (
    <ReactAriaDialog
      ref={ref}
      {...props}
      className="relative flex h-full flex-col overflow-y-hidden rounded-xl focus:outline-none"
    >
      {({ close }) => (
        <>
          {title ? (
            <div className="flex shrink-0 items-start justify-between gap-4 border-b-2 px-6 py-4">
              {/* TODO use Heading, it renders as h2 so we get nested headings */}
              {/* <Heading slot="title"> */}
              <Typography type="h2" size="h5">
                {title}
              </Typography>
              {/* </Heading> */}
              <Button
                icon={<CrossIcon />}
                aria-label={t('aria.close')}
                variant="black-plain"
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
              aria-label={t('aria.close')}
              className="absolute right-6 top-6 -m-2 bg-white hover:bg-gray-100"
              variant="black-outline"
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
