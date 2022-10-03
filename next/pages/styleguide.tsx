import { AsyncServerProps } from '@utils/types'
import { isProductionDeployment } from '@utils/utils'
import cx from 'classnames'
import Button from 'components/forms/Button'
import InputField from 'components/forms/InputField'
import PageWrapper from 'components/layouts/PageWrapper'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactNode } from 'react'

import ArrowRightIcon from '../assets/images/forms/arrow-right.svg'
import SearchIcon from '../assets/images/forms/search-icon.svg'

type WrapperProps = {
  title?: string
  children: ReactNode
  direction?: 'column' | 'row'
}

export const Wrapper = ({ title, children, direction = 'row' }: WrapperProps) => {
  return (
    <div className="mb-10 flex flex-col">
      {title && <h2 className="pb-2 text-lg font-semibold">{title}</h2>}
      <div
        className={cx('flex', {
          'flex-col space-y-2': direction === 'column',
          'space-x-2': direction === 'row',
        })}
      >
        {children}
      </div>
    </div>
  )
}

type StackProps = {
  bg?: 'white' | 'dark'
  width?: 'desktop' | 'mobile' | 'full' | null
  direction?: 'column' | 'row'
  children: React.ReactNode
}

export const Stack = ({ direction = 'row', children }: StackProps) => {
  return (
    <div
      className={cx('flex', {
        'flex-col space-y-2': direction === 'column',
        'space-x-2 items-end': direction === 'row',
      })}
    >
      {children}
    </div>
  )
}

const Styleguide = ({ page }: AsyncServerProps<typeof getServerSideProps>) => {
  return (
    <PageWrapper locale={page.locale}>
      <div className="min-h-screen bg-[#E5E5E5]">
        <div className="mx-auto max-w-screen-xl px-12 pt-12 pb-64">
          <Wrapper direction="column" title="Button">
            <Stack>
              <Button text="Button" />
              <Button text="Button" size="sm" />
              <Button text="Button disabled" disabled />
              <Button text="Button disabled" size="sm" disabled />
            </Stack>
            <Stack>
              <Button text="Button" startIcon={<SearchIcon />} />
              <Button text="Button" endIcon={<ArrowRightIcon />} />
              <Button text="Button" startIcon={<SearchIcon />} endIcon={<ArrowRightIcon />} />
              <Button text="Button" size="sm" startIcon={<SearchIcon />} />
              <Button text="Button" size="sm" endIcon={<ArrowRightIcon />} />
              <Button text="Button" size="sm" startIcon={<SearchIcon />} endIcon={<ArrowRightIcon />} />
            </Stack>
            <Stack>
              <Button icon={<SearchIcon />} />
              <Button icon={<SearchIcon />} size="sm" />
              <Button icon={<SearchIcon />} disabled />
              <Button icon={<SearchIcon />} size="sm" disabled />
            </Stack>

            <Stack>
              <Button variant="brand-outline" text="Button" />
              <Button variant="brand-outline" text="Button" size="sm" />
              <Button variant="brand-outline" text="Button disabled" disabled />
              <Button variant="brand-outline" text="Button disabled" size="sm" disabled />
            </Stack>
            <Stack>
              <Button variant="brand-outline" text="Button" startIcon={<SearchIcon />} />
              <Button variant="brand-outline" text="Button" endIcon={<ArrowRightIcon />} />
              <Button variant="brand-outline" text="Button" startIcon={<SearchIcon />} endIcon={<ArrowRightIcon />} />
              <Button variant="brand-outline" text="Button" size="sm" startIcon={<SearchIcon />} />
              <Button variant="brand-outline" text="Button" size="sm" endIcon={<ArrowRightIcon />} />
              <Button
                variant="brand-outline"
                text="Button"
                size="sm"
                startIcon={<SearchIcon />}
                endIcon={<ArrowRightIcon />}
              />
            </Stack>
            <Stack>
              <Button variant="brand-outline" icon={<SearchIcon />} />
              <Button variant="brand-outline" icon={<SearchIcon />} size="sm" />
              <Button variant="brand-outline" icon={<SearchIcon />} disabled />
              <Button variant="brand-outline" icon={<SearchIcon />} size="sm" disabled />
            </Stack>

            <Stack>
              <Button variant="black" text="Button" />
              <Button variant="black" text="Button" size="sm" />
              <Button variant="black" text="Button disabled" disabled />
              <Button variant="black" text="Button disabled" size="sm" disabled />
            </Stack>
            <Stack>
              <Button variant="black" text="Button" startIcon={<SearchIcon />} />
              <Button variant="black" text="Button" endIcon={<ArrowRightIcon />} />
              <Button variant="black" text="Button" startIcon={<SearchIcon />} endIcon={<ArrowRightIcon />} />
              <Button variant="black" text="Button" size="sm" startIcon={<SearchIcon />} />
              <Button variant="black" text="Button" size="sm" endIcon={<ArrowRightIcon />} />
              <Button variant="black" text="Button" size="sm" startIcon={<SearchIcon />} endIcon={<ArrowRightIcon />} />
            </Stack>
            <Stack>
              <Button variant="black" icon={<SearchIcon />} />
              <Button variant="black" icon={<SearchIcon />} size="sm" />
              <Button variant="black" icon={<SearchIcon />} disabled />
              <Button variant="black" icon={<SearchIcon />} size="sm" disabled />
            </Stack>

            <Stack>
              <Button variant="black-outline" text="Button" />
              <Button variant="black-outline" text="Button" size="sm" />
              <Button variant="black-outline" text="Button disabled" disabled />
              <Button variant="black-outline" text="Button disabled" size="sm" disabled />
            </Stack>
            <Stack>
              <Button variant="black-outline" text="Button" startIcon={<SearchIcon />} />
              <Button variant="black-outline" text="Button" endIcon={<ArrowRightIcon />} />
              <Button variant="black-outline" text="Button" startIcon={<SearchIcon />} endIcon={<ArrowRightIcon />} />
              <Button variant="black-outline" text="Button" size="sm" startIcon={<SearchIcon />} />
              <Button variant="black-outline" text="Button" size="sm" endIcon={<ArrowRightIcon />} />
              <Button
                variant="black-outline"
                text="Button"
                size="sm"
                startIcon={<SearchIcon />}
                endIcon={<ArrowRightIcon />}
              />
            </Stack>
            <Stack>
              <Button variant="black-outline" icon={<SearchIcon />} />
              <Button variant="black-outline" icon={<SearchIcon />} size="sm" />
              <Button variant="black-outline" icon={<SearchIcon />} disabled />
              <Button variant="black-outline" icon={<SearchIcon />} size="sm" disabled />
            </Stack>

            <Stack>
              <Button variant="negative" text="Button" />
              <Button variant="negative" text="Button" size="sm" />
              <Button variant="negative" text="Button disabled" disabled />
              <Button variant="negative" text="Button disabled" size="sm" disabled />
            </Stack>
            <Stack>
              <Button variant="negative" text="Button" startIcon={<SearchIcon />} />
              <Button variant="negative" text="Button" endIcon={<ArrowRightIcon />} />
              <Button variant="negative" text="Button" startIcon={<SearchIcon />} endIcon={<ArrowRightIcon />} />
              <Button variant="negative" text="Button" size="sm" startIcon={<SearchIcon />} />
              <Button variant="negative" text="Button" size="sm" endIcon={<ArrowRightIcon />} />
              <Button
                variant="negative"
                text="Button"
                size="sm"
                startIcon={<SearchIcon />}
                endIcon={<ArrowRightIcon />}
              />
            </Stack>

            <Stack>
              <Button variant="plain-brand" text="Button" />
              <Button variant="plain-brand" text="Button" size="sm" />
              <Button variant="plain-brand" text="Button disabled" disabled />
              <Button variant="plain-brand" text="Button disabled" size="sm" disabled />
            </Stack>
            <Stack>
              <Button variant="plain-brand" icon={<SearchIcon />} />
              <Button variant="plain-brand" icon={<SearchIcon />} size="sm" />
              <Button variant="plain-brand" icon={<SearchIcon />} disabled />
              <Button variant="plain-brand" icon={<SearchIcon />} size="sm" disabled />
            </Stack>

            <Stack>
              <Button variant="plain-black" text="Button" />
              <Button variant="plain-black" text="Button" size="sm" />
              <Button variant="plain-black" text="Button disabled" disabled />
              <Button variant="plain-black" text="Button disabled" size="sm" disabled />
            </Stack>
            <Stack>
              <Button variant="plain-black" icon={<SearchIcon />} />
              <Button variant="plain-black" icon={<SearchIcon />} size="sm" />
              <Button variant="plain-black" icon={<SearchIcon />} disabled />
              <Button variant="plain-black" icon={<SearchIcon />} size="sm" disabled />
            </Stack>

            <Stack>
              <Button variant="plain-negative" text="Button" />
              <Button variant="plain-negative" text="Button" size="sm" />
              <Button variant="plain-negative" text="Button disabled" disabled />
              <Button variant="plain-negative" text="Button disabled" size="sm" disabled />
            </Stack>

            <Stack>
              <Button variant="link-brand" href="#" label="Label value" />
              <Button variant="link-brand" href="#" label="Label value" size="sm" />
            </Stack>
            <Stack>
              <Button variant="link-black" href="#" label="Label value" />
              <Button variant="link-black" href="#" label="Label value" size="sm" />
            </Stack>
          </Wrapper>
          <Wrapper direction="column" title="Input Field">
            <Stack>
              <InputField label="Label" placeholder="Placeholder" />
              <InputField leftIcon={<SearchIcon />} label="Label" placeholder="Placeholder" />
              <InputField label="Label" placeholder="Placeholder" value="Value" resetIcon />
              <InputField leftIcon={<SearchIcon />} label="Label" placeholder="Placeholder" value="Value" resetIcon />
            </Stack>
            <Stack>
              <InputField label="Label" placeholder="Placeholder" required />
              <InputField leftIcon={<SearchIcon />} label="Label" placeholder="Placeholder" required />
              <InputField label="Label" placeholder="Placeholder" value="Value" resetIcon required />
              <InputField
                leftIcon={<SearchIcon />}
                label="Label"
                placeholder="Placeholder"
                value="Value"
                resetIcon
                required
              />
            </Stack>
            <Stack>
              <InputField errorMessage="Error message" label="Label" placeholder="Placeholder" />
              <InputField
                errorMessage="Error message"
                leftIcon={<SearchIcon />}
                label="Label"
                placeholder="Placeholder"
              />
              <InputField
                errorMessage="Error message"
                label="Label"
                placeholder="Placeholder"
                value="Value"
                resetIcon
              />
              <InputField
                errorMessage="Error message"
                leftIcon={<SearchIcon />}
                label="Label"
                placeholder="Placeholder"
                value="Value"
                resetIcon
              />
            </Stack>
            <Stack>
              <InputField description="Help text" label="Label" placeholder="Placeholder" />
              <InputField description="Help text" leftIcon={<SearchIcon />} label="Label" placeholder="Placeholder" />
              <InputField description="Help text" label="Label" placeholder="Placeholder" value="Value" resetIcon />
              <InputField
                description="Help text"
                leftIcon={<SearchIcon />}
                label="Label"
                placeholder="Placeholder"
                value="Value"
                resetIcon
              />
            </Stack>
            <Stack>
              <InputField
                errorMessage="Error message"
                description="Help text"
                label="Label"
                placeholder="Placeholder"
              />
              <InputField
                errorMessage="Error message"
                description="Help text"
                leftIcon={<SearchIcon />}
                label="Label"
                placeholder="Placeholder"
              />
              <InputField
                errorMessage="Error message"
                description="Help text"
                label="Label"
                placeholder="Placeholder"
                value="Value"
                resetIcon
              />
              <InputField
                errorMessage="Error message"
                description="Help text"
                leftIcon={<SearchIcon />}
                label="Label"
                placeholder="Placeholder"
                value="Value"
                resetIcon
              />
            </Stack>
            <Stack>
              <InputField label="Label" placeholder="Placeholder" tooltip />
              <InputField leftIcon={<SearchIcon />} label="Label" placeholder="Placeholder" tooltip />
              <InputField label="Label" placeholder="Placeholder" value="Value" resetIcon tooltip />
              <InputField
                leftIcon={<SearchIcon />}
                label="Label"
                placeholder="Placeholder"
                value="Value"
                resetIcon
                tooltip
              />
            </Stack>
            <Stack>
              <InputField description="Help text" label="Label" placeholder="Placeholder" tooltip />
              <InputField
                description="Help text"
                leftIcon={<SearchIcon />}
                label="Label"
                placeholder="Placeholder"
                tooltip
              />
              <InputField
                description="Help text"
                label="Label"
                placeholder="Placeholder"
                value="Value"
                resetIcon
                tooltip
              />
              <InputField
                description="Help text"
                leftIcon={<SearchIcon />}
                label="Label"
                placeholder="Placeholder"
                value="Value"
                resetIcon
                tooltip
              />
            </Stack>
          </Wrapper>
        </div>
      </div>
    </PageWrapper>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (isProductionDeployment()) return { notFound: true }

  const locale = ctx.locale ?? 'sk'

  return {
    props: {
      page: {
        locale: ctx.locale,
      },
      ...(await serverSideTranslations(locale)),
    },
  }
}

export default Styleguide
