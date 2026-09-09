/**
 * Styled variants shared by Disclosure, DisclosureGroup, DisclosureHeader and DisclosurePanel.
 *
 * The variant is set once - on DisclosureGroup, or on a standalone Disclosure - and passed down
 * through DisclosureVariantContext, so individual parts don't need to repeat the same classes.
 */

export type DisclosureVariant = 'boxed' | 'unstyled'

type DisclosureVariantStyles = {
  /** Applied to DisclosureGroup, or to a standalone Disclosure */
  box: string
  header: string
  panel: string
  /**
   * Vertical padding of the panel content, applied to a wrapper inside the panel rather than to
   * the panel itself. React Aria animates the panel by setting its height from "0px" to its scroll
   * height, and with "box-sizing: border-box" a box never renders shorter than its own padding -
   * vertical padding on the panel would stay visible as a strip when collapsed, therefore it's set
   * on nested div.
   */
  panelInner: string
  /** Dividers rendered by DisclosureGroup between its children, `null` means no dividers */
  divider: string | null
}

export const disclosureStyles: Record<DisclosureVariant, DisclosureVariantStyles> = {
  /** Default look - card with border, items separated by inset dividers */
  boxed: {
    box: 'rounded-xl border border-border-passive-primary bg-background-passive-base py-2',
    header: 'p-4 ring-inset lg:px-6',
    panel: 'px-4 lg:px-6',
    panelInner: 'py-4',
    divider: 'mx-4 lg:mx-6',
  },
  /** No styles at all, for one-off cases styled by the consumer */
  unstyled: {
    box: '',
    header: '',
    panel: '',
    panelInner: '',
    divider: null,
  },
}
