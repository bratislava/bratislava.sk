import cx from 'classnames'
export interface FooterSectionProps {
  className?: string
  title: string
  pageLinks?: { title: string; url: string }[]
}

export const FooterSection = ({ className, title, pageLinks }: FooterSectionProps) => (
  <div className={cx(className, 'flex flex-col gap-y-6 lg:gap-y-11')} aria-label="Footer Section">
    <p className="font-semibold">{title}</p>
    <ul className="flex flex-col gap-y-3 lg:gap-y-5">
      {pageLinks?.map((link, i) => (
        <li className="cursor-pointer" key={i}>
          <a href={'/' + link.url}>{link.title}</a>
        </li>
      ))}
    </ul>
  </div>
)

export default FooterSection
