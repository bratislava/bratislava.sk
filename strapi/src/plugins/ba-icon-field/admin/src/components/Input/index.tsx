import React from 'react'
import PropTypes from 'prop-types'
import {
  Combobox,
  ComboboxOption,
  Field,
  FieldError,
  FieldHint,
  FieldLabel,
  Stack,
} from '@strapi/design-system'
import { useIntl } from 'react-intl'
import { Clock } from '@strapi/icons'

const IconSelect = ({
  value,
  onChange,
  name,
  intlLabel,
  labelAction,
  required,
  attribute,
  description,
  placeholder,
  disabled,
  error,
}: any) => {
  const icons = [
    'mesto_bratislava',
    'doprava_a_mapy',
    'zivotne_prostredie_a_vystavba',
    'socialne_sluzby_a_byvanie',
    'vzdelavanie_a_volny_cas',
    'kultura_a_komunity',
  ]

  const { formatMessage } = useIntl()
  const isValidValue = value && icons.includes(value)

  return (
    <Field
      name={name}
      id={name}
      required={required}
      hint={description && formatMessage(description)}
    >
      <Stack spacing={1}>
        <FieldLabel action={labelAction}>{formatMessage(intlLabel)}</FieldLabel>

        <Combobox
          placeholder={placeholder && formatMessage(placeholder)}
          aria-label={formatMessage(intlLabel)}
          aria-disabled={disabled}
          disabled={disabled}
          value={isValidValue ? value : null}
          onChange={(icon: any) =>
            onChange({ target: { name, value: icon, type: attribute.type } })
          }
        >
          {icons.map((icon) => (
            <ComboboxOption value={icon} key={icon}>
              <Clock />
              {icon}
            </ComboboxOption>
          ))}
        </Combobox>

        <FieldHint />
        <FieldError />
      </Stack>
    </Field>
  )
}

IconSelect.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: '',
}

IconSelect.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
}

export default IconSelect
