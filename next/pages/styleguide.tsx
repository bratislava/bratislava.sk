import React, { ReactNode } from 'react'
import cx from 'classnames'

import { AsyncServerProps } from '@utils/types'
import { isProductionDeployment } from '@utils/utils'
import PageWrapper from 'components/layouts/PageWrapper'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Button from 'components/forms/Button'

import SearchIcon from '../assets/images/search-icon.svg'
import ArrowRightIcon from '../assets/images/arrow-right.svg'
import SelectField from 'components/forms/SelectField'

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
      className={cx('flex flex-wrap', {
        'flex-col space-y-2': direction === 'column',
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
  const selectOptions = [
    { value: 'stuFei', label: 'STU FEI'},
    { value: 'stuFiit', label: 'STU FIIT'},
    { value: 'ukFmfi', label: 'UK FMFI'},
    { value: 'tukeFei', label: 'TUKE FEI' },
    { value: 'unizaFeit', label: 'UNIZA FEIT' }
  ]

  return (
    <PageWrapper locale={page.locale}>
      <div className="bg-[#E5E5E5] min-h-screen">
        <div className="max-w-screen-lg mx-auto px-12 pt-12 pb-64">
          <Wrapper direction="column" title="SelectField">
            <Stack>
              <SelectField name="select-test" label="default values" options={selectOptions} value={selectOptions.slice(0, 2)}/>
              <SelectField name="select-test" label="placeholder" options={selectOptions} placeholder="Test placeholder"/>
              <SelectField name="select-test" label="disabled" options={selectOptions} disabled/>
              <SelectField name="select-test" label="required" options={selectOptions} required/>
              <SelectField name="select-test" label="description" options={selectOptions} description="This is simple description"/>
              <SelectField name="select-test" label="tooltip" options={selectOptions} tooltip/>
              <SelectField name="select-test" label="error" options={selectOptions} errorMessage="Test error message"/>
              <SelectField name="select-test" label="full header + event"
                           options={selectOptions} description="simple description"
                           errorMessage="Test error message" tooltip required
                           onChangeSelected={values => console.log(values)}/>
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
