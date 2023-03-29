// @ts-strict-ignore
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

export interface FooterSectionProps {
  className?: string
  title: string
  pageLinks?: { title: string; url: string }[]
}

export const FooterSection = ({ className, title, pageLinks }: FooterSectionProps) => {
  const { Link: UILink } = useUIContext()

  return (
    <div className={cx(className, 'flex flex-col gap-y-6 lg:gap-y-11')} aria-label="Footer Section">
      <p className="font-semibold">{title}</p>
      <ul className="flex flex-col gap-y-3 lg:gap-y-5">
        {pageLinks?.map((link, i) => (
          <li className="cursor-pointer" key={i}>
            <UILink
              href={
                link.url?.startsWith('http') || link.url?.startsWith('https')
                  ? link.url
                  : `/${link.url}` ?? '#'
              }
              className="hover:underline"
              target={link.url?.startsWith('http') ? '_blank' : null}
            >
              {link.title}
            </UILink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterSection
