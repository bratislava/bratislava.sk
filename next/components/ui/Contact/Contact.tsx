import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import { ReactComponent as Email } from '../../../assets/images/email2.svg'
import { ReactComponent as Phone } from '../../../assets/images/phone.svg'

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
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <div className={cx('flex flex-col h-full', { 'justify-center': !address })}>
          {title && <h4 className="mb-6 font-semibold text-md leading-[36px]">{title}</h4>}
          {description && (
            <UIMarkdown className="text-sm md:text-default leading-[24px] md:leading-[30px]" content={description} />
          )}
        </div>
      </div>

      {items.map((item) => (
        <div
          key={item.variant}
          className={cx('w-full mb-6 last:mb-0 md:mb-0', {
            'md:w-1/2': items.length === 1 && !address,
            'md:w-1/4': items.length === 2,
            'md:w-1/6': items.length === 3,
            'md:w-5/12': items.length === 1 && address,
          })}
        >
          <ContactItem {...item} linkVariant={itemLinkVariant} />
        </div>
      ))}
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
    return <UIMarkdown className="text-sm md:text-default leading-[24px] md:leading-[30px]" content={value} />
  }

  const Icon = variant === 'phone' ? Phone : Email

  return (
    <div className="flex flex-col items-center justify-center h-full text-default leading-[30px]">
      <Icon className="w-24 h-24" />
      {value.split(',').map((item, key) => {
        return (
          <>
            <span
              className={cx('font-semibold w-full break-all text-center', {
                'mt-9': key === 0,
              })}
              key={key}
            >
              {item}
            </span>
          </>
        )
      })}
      {label && href && (
        <a
          href={href}
          className={cx('mt-8 px-6 py-3 font-medium border-2 rounded-lg shadow-sm whitespace-nowrap', {
            'bg-primary border-primary': linkVariant === 'primary',
            'bg-secondary border-secondary': linkVariant === 'secondary',
            'text-white': linkVariant === 'primary',
          })}
        >
          {label}
        </a>
      )}
    </div>
  )
}

export default Contact
