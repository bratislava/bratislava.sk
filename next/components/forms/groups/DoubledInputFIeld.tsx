import InputField from '../widget-components/InputField/InputField'

interface InputBase {
  label: [string, string]
  classNames?: [string, string]
}
export const DoubledInputField = ({ label, classNames = ['', ''] }: InputBase) => {
  return (
    <div className="flex flex-row items-start p-0 gap-4">
      <InputField label={label[0]} placeholder="" className={classNames[0]} />
      <InputField label={label[1]} placeholder="" className={classNames[1]} />
    </div>
  )
}
