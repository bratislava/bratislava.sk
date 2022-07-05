import { AdvancedAccordionItem, AdvancedAccordionItemProps } from '../AdvancedAccordionItem/AdvancedAccordionItem'
import { BasicSearch } from '../BasicSearch/BasicSearch'
import Divider from '../Divider/Divider'

export interface AdvancedAccordionProps {
  title?: string
  dividerStyle?: string
  items?: AdvancedAccordionItemProps[]
}

export const AdvancedAccordion = ({ title, dividerStyle, items }: AdvancedAccordionProps) => {
  return (
    <div className="flex flex-col">
      <div className="text-default lg:text-lg font-semibold pb-4">{title}</div>
      <BasicSearch collapse className="flex lg:hidden pb-6" placeholder={''} title={''} buttonText={''} />
      <AdvancedAccordionItem {...items[0]} />
      <Divider
        className="py-6 lg:py-10"
        dividerStyle={dividerStyle && dividerStyle?.length > 1 ? dividerStyle : 'mesto_01_full_width'}
      />
      <AdvancedAccordionItem {...items[1]} />
    </div>
  )
}
