import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import Email from '../../../assets/images/email2.svg'
import Phone from '../../../assets/images/phone.svg'

export interface ContactProps {
  className?: string
  itemLinkVariant?: 'primary' | 'secondary'
  title?: string
  description?: string
  phone?: string
  phoneLabel?: string
  email?: string
  emailLabel?: string
  address?: string
}

export const Contact = ({
  className,
  itemLinkVariant,
  title,
  description,
  phone,
  phoneLabel,
  email,
  emailLabel,
  address,
}: ContactProps) => {
  const { Markdown: UIMarkdown } = useUIContext()

  const items: ContactItemProps[] = []
  if (address) items.push({ variant: 'address', value: address })
  if (phone)
    items.push({
      variant: 'phone',
      value: phone,
      label: phoneLabel,
      href: `tel:${phone.replace(/ /g, '')}`,
    })
  if (email)
    items.push({
      variant: 'email',
      value: email,
      label: emailLabel,
      href: `mailto:${email}`,
    })

  return (
    <div className={cx(className, 'flex flex-col md:flex-row text-font gap-3')}>
      <div className="mb-6 w-full md:mb-0 md:w-1/2">
        <div className={cx('flex flex-col h-full', { 'justify-center': !address })}>
          {title && <h4 className="mb-6 text-md font-semibold leading-[36px]">{title}</h4>}
          {description && (
            <UIMarkdown className="text-sm leading-[24px] md:text-default md:leading-[30px]" content={description} />
          )}
        </div>
      </div>
      <div className="mb-6 w-full md:mb-0 md:w-1/2">
        <div className="flex flex-col gap-3 text-font md:flex-row">
          {items.map((item) =>
              (item.variant !== 'address' || (item.variant === 'address' && address.trim().length > 0)) && (
                <div
                  key={item.variant}
                  className={cx('w-full mb-6 last:mb-0 md:mb-0', {
                    'md:w-1/1': items.length === 1,
                    'md:w-1/2': items.length === 2 && 3,
                  })}
                >
                  <ContactItem {...item} linkVariant={itemLinkVariant} />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  )
}

interface ContactItemProps {
  variant: 'phone' | 'email' | 'address'
  value: string
  label?: string
  href?: string
  linkVariant?: string
}

const ContactItem = ({ variant, value, label, href, linkVariant = 'primary' }: ContactItemProps) => {
  const { Markdown: UIMarkdown } = useUIContext()

  if (variant === 'address') {
    return <UIMarkdown className="text-sm leading-[24px] md:text-default md:leading-[30px]" content={value} />
  }

  const Icon = variant === 'phone' ? Phone : Email

  return (
    <div className="relative flex h-full flex-col items-center justify-start pb-20 text-default leading-[30px]">
      <Icon className="h-24 w-24" />
      {value.split(',').map((item, key) => {
        return (
          <div key={key} className="text-center">
            <span
              className={cx('font-semibold w-full break-all text-center', {
                'mt-9': key === 0,
                'whitespace-nowrap': variant === 'phone',
              })}
            >
              {item}
            </span>
          </div>
        )
      })}
      {label && href && (
        <a
          href={href}
          className={cx(
            'mt-8 px-6 py-3 font-medium border-2 rounded-lg shadow-sm whitespace-nowrap absolute bottom-0',
            {
              'bg-primary border-primary': linkVariant === 'primary',
              'bg-secondary border-secondary text-white': linkVariant === 'secondary',
              'text-black': linkVariant === 'primary',
            }
          )}
        >
          {label}
        </a>
      )}
    </div>
  )
}

export default Contact
