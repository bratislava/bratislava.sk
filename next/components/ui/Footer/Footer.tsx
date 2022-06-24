import cx from 'classnames'
import FBLogo from '../../../assets/images/FB.svg'
import IGLogo from '../../../assets/images/IG.svg'
import YTLogo from '../../../assets/images/YT.svg'
import BABrand from '../../../assets/images/BABrand.svg'
import EULogo from '../../../assets/images/EULogo.svg'
import { FooterSection, FooterSectionProps } from '../FooterSection/FooterSection'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import React from 'react'

export interface FooterProps {
  className?: string
  facebookLink?: string
  instagramLink?: string
  youtubeLink?: string
  address?: string
  email?: string
  phone?: string
  sections?: FooterSectionProps[]
  accessibilityLink?: { title: string; url: string }
  copyright?: string
  /**
   * Active link should not have url
   */
  languageLinks?: { title: string; url?: string; locale: string }[]
}

export const Footer = ({
  className,
  facebookLink,
  instagramLink,
  youtubeLink,
  address,
  email,
  phone,
  sections,
  accessibilityLink,
  copyright,
  languageLinks,
}: FooterProps) => {
  const { Link: UILink } = useUIContext()

  console.log(sections)
  return (
    <footer className={cx(className, 'text-base text-gray-universal-800 pt-14')}>
      <section className="flex justify-between items-center" aria-label="Logo and Social Media Links">
        <BABrand />
        <div className="flex items-center justify-between lg:w-52">
          <nav className="hidden lg:flex gap-4 text-gray-universal-500 cursor-pointer" aria-label="Social Media Links">
            {facebookLink && (
              <a href={facebookLink} target="_blank" rel="noreferrer">
                <FBLogo />
              </a>
            )}
            {instagramLink && (
              <a href={instagramLink} target="_blank" rel="noreferrer">
                <IGLogo />
              </a>
            )}
            {youtubeLink && (
              <a href={youtubeLink} target="_blank" rel="noreferrer">
                <YTLogo />
              </a>
            )}
          </nav>
          <span className="hidden lg:block">
            <EULogo />
          </span>
        </div>
      </section>

      <section aria-label="Contact Info and Sections" className="flex flex-col xl:flex-row gap-x-28 py-14">
        <div className="flex flex-col gap-y-6 xl:gap-y-16" aria-label="Contact Info">
          <p className="whitespace-pre-wrap leading-6">{address}</p>
          <div className="flex flex-col gap-y-1 xl:gap-y-5 underline">
            <a className="block" href={`mailto:${email}`}>
              {email}
            </a>
            <a className="block" href={`tel:${phone?.replace(/ /g, '')}`}>
              {phone}
            </a>
          </div>
        </div>
        <div
          className="w-2/3 flex flex-col lg:flex-row w-full justify-around 2xl:flex 2xl:flex-wrap gap-y-10 mt-10 xl:mt-0"
          aria-label="Project Info sections"
        >
          {sections?.map((section, i) => (
            <FooterSection key={i} title={section.title} pageLinks={section.pageLinks} />
          ))}
        </div>
      </section>

      <hr />

      <section
        aria-label="Accessibility and Copyright"
        className="flex flex-col text-center gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between pt-14"
      >
        {accessibilityLink && <UILink href={accessibilityLink.url}>{accessibilityLink.title}</UILink>}
        <div className="flex justify-center gap-x-10 lg:hidden" aria-label="lang">
          {languageLinks?.map(({ url, title, locale }, i) => (
            <React.Fragment key={i}>
              {url === undefined ? (
                <span className="font-semibold">{title}</span>
              ) : (
                <UILink className="font-normal" href={url} locale={locale}>
                  {title}
                </UILink>
              )}
            </React.Fragment>
          ))}
        </div>
        <nav
          className="flex mt-5 justify-center text-gray-universal-500 lg:hidden gap-5"
          aria-label="Social Media Links"
        >
          {facebookLink && (
            <a href={facebookLink} target="_blank" rel="noreferrer">
              <FBLogo />
            </a>
          )}
          {instagramLink && (
            <a href={instagramLink} target="_blank" rel="noreferrer">
              <IGLogo />
            </a>
          )}
          {youtubeLink && (
            <a href={youtubeLink} target="_blank" rel="noreferrer">
              <YTLogo />
            </a>
          )}
        </nav>
        <span className="mt-5 lg:hidden">
          <EULogo />
        </span>
        <p className="mt-2 lg:mt-0">{copyright}</p>
        <div className="hidden lg:block" aria-label="lang">
          {languageLinks?.map(({ url, title, locale }, i) => (
            <React.Fragment key={i}>
              {url === undefined ? (
                <span className="font-semibold">{title}</span>
              ) : (
                <UILink className="font-normal" href={url} locale={locale}>
                  {title}
                </UILink>
              )}
              {i < languageLinks.length - 1 && <span> / </span>}
            </React.Fragment>
          ))}
        </div>
      </section>
    </footer>
  )
}

export default Footer
