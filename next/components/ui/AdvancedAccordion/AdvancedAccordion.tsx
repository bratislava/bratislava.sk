import { AdvancedAccordionItem, AdvancedAccordionItemProps } from '../AdvancedAccordionItem/AdvancedAccordionItem'
import { BasicSearch } from '../BasicSearch/BasicSearch'
import { Divider } from '../Divider/Divider'

export interface AdvancedAccordionProps {
  title?: string
  dividerStyle?: string
  items?: AdvancedAccordionItemProps[]
}

export const AdvancedAccordion = ({ title, dividerStyle, items }: AdvancedAccordionProps) => {
  return (
    <div className="flex flex-col">
      <div className="pb-4 text-default font-semibold lg:text-lg">{title}</div>
      {/* Does not work at the moment, comented out, kept as a TODO reminder in case this component is resurrected */}
      {/* <BasicSearch collapse className="flex pb-6 lg:hidden" placeholder="" title="" buttonText="" /> */}
      <AdvancedAccordionItem {...items[0]} />
      <Divider
        className="py-6 lg:py-10"
        dividerStyle={dividerStyle && dividerStyle?.length > 1 ? dividerStyle : 'mesto_01_full_width'}
      />
      <AdvancedAccordionItem {...items[1]} />
    </div>
  )
}
