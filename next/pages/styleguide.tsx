import { ReactNode } from 'react'
import cx from 'classnames'

import { AsyncServerProps } from '@utils/types'
import { isProductionDeployment } from '@utils/utils'
import PageWrapper from 'components/layouts/PageWrapper'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Button from 'components/forms/Button'

import SearchIcon from '../assets/images/forms/search-icon.svg'
import ArrowRightIcon from '../assets/images/forms/arrow-right.svg'
import FieldHeader from '../components/forms/FieldHeader'
import FieldErrorMessage from '../components/forms/FieldErrorMessage'
import Radio from '../components/forms/Radio'
import RadioGroup from 'components/forms/RadioGroup'
import Switch from 'components/forms/ToggleButton'

type WrapperProps = {
  title?: string
  children: ReactNode
  direction?: 'column' | 'row'
}

export const Wrapper = ({ title, children, direction = 'row' }: WrapperProps) => {
  return (
    <div className={'mb-10 flex flex-col'}>
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
      className={cx('flex flex-wrap gap-1 p-3 border border-dashed border-gray-800 rounded-lg', {
        'flex-col space-y-2 items-center': direction === 'column',
        'space-x-2 items-end': direction === 'row',
      })}
    >
      {children}
    </div>
  )
}

type ButtonShowCaseProps = {}

export const ButtonShowCase = ({}: ButtonShowCaseProps) => {
  return <div></div>
}

const Styleguide = ({ page }: AsyncServerProps<typeof getServerSideProps>) => {
  return (
    <PageWrapper locale={page.locale}>
      <div className="bg-[#E5E5E5] min-h-screen">
        <div className="max-w-screen-lg mx-auto px-12 pt-12 pb-64">
          <Wrapper direction="column" title="Field header" >
            <Stack>
              <FieldHeader label="Simple" htmlFor="input-name"/>
            </Stack>
            <Stack>
              <FieldHeader label="Required" htmlFor="input-name" required/>
            </Stack>
            <Stack>
              <FieldHeader label="Tooltip" htmlFor="input-name" tooltip="This is random tooltip"/>
            </Stack>
            <Stack>
              <FieldHeader label="Description" htmlFor="input-name" description="This is simple description"/>
            </Stack>
            <Stack>
              <FieldHeader label="Everything" htmlFor="input-name"
                           description="This is is simple description" tooltip="This is some tooltip"
                           required/>
            </Stack>
            <Stack>
              <FieldHeader label="Everything but optional" htmlFor="input-name"
                           description="This is is simple description" tooltip="This is some tooltip" />
            </Stack>
          </Wrapper>

          <Wrapper direction="column" title="Field error message" >
            <Stack>
              <FieldErrorMessage errorMessage="This is error message for fields"/>
            </Stack>
          </Wrapper>

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
          <Wrapper direction="column" title="Radio">
            <Stack>
              <RadioGroup label='Basic'>
                <Radio value='one' tooltip="This is some tooltip1">One</Radio>
                <Radio value='two' isDisabled>Two</Radio>
                <Radio value='three' error tooltip="This is some tooltip3">Three</Radio>
              </RadioGroup>
              <RadioGroup label='Boxed' >
                <Radio value='one' variant='boxed' tooltip="This is some tooltip1">One</Radio>
                <Radio value='two' variant='boxed' isDisabled>Huge text</Radio>
                <Radio value='three' variant='boxed' error>Three</Radio>
              </RadioGroup>
              <RadioGroup label='Card' defaultValue='two'>
                <Radio value='one' variant='card' tooltip="This is some tooltip1">One</Radio>
                <Radio value='two' variant='card' isDisabled>Two</Radio>
                <Radio value='three' variant='card' error>Three</Radio>
              </RadioGroup>
            </Stack>
          </Wrapper>
          <Wrapper direction="column" title="Toggle">
            <Stack>
              <Switch value='one'>Value</Switch>
              <Switch value='two' defaultSelected>Value</Switch>
              <Switch value='two' isDisabled>Value</Switch>
              <Switch value='two' isDisabled defaultSelected>Value</Switch>
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
