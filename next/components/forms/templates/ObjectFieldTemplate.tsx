import { ObjectFieldTemplateProps } from '@rjsf/utils'
import { Fragment } from 'react'

const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const { title, description, properties, idSchema } = props
  return (
    <fieldset id={idSchema.$id}>
      {title && (
        <legend id={`${idSchema.$id}__title`} className="text-h1 mb-10">
          {title}
        </legend>
      )}
      {description && <p id={`${idSchema.$id}__description`}>{description}</p>}
      {properties?.map((element) => (
        <Fragment key={element.content.key}>{element.content}</Fragment>
      ))}
    </fieldset>
  )
}

export default ObjectFieldTemplate
