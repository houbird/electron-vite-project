import { useState } from 'react'
export interface formFuncInput {
  updateType: string
  value: string
}

type updateFormFunc = (Input: formFuncInput) => void

interface Props {
  labelTitle?: string
  labelStyle?: string
  required?: boolean
  labelDescription?: string
  labelBL?: string
  labelBR?: string
  type?: string
  containerClassName?: string
  InputClassName?: string
  defaultValue?: string
  placeholder?: string
  updateFormValue: updateFormFunc
  updateType: string
}

function InputText (props: Props) {
  const { labelTitle, labelStyle = '', required = false, labelDescription = '', labelBL = '', labelBR = '', type = 'text', containerClassName = '', InputClassName = '', defaultValue, placeholder = '', updateFormValue, updateType } = props
  const [value, setValue] = useState(defaultValue)

  const updateInputValue = (val: string) => {
    setValue(val)
    updateFormValue({ updateType, value: val })
  }

  return (
  <>
      <div className={`form-group ${containerClassName}`}>
        <div className="label">
          <span className={`label-text ${labelStyle}`}>{ labelTitle }</span>
          <span className={`label-text label-text-alt ${required ? 'danger' : ''}`}>
            { required ? '*' : ''} { labelDescription || (required ? 'Required' : '') }
          </span>
        </div>
        <input className={`mb-0 ${InputClassName}`} type={type} value={ value } placeholder={ placeholder } onChange={(e) => { updateInputValue(e.target.value) }}/>
        <div className="label">
          <span className="label-text label-text-alt">{ labelBL }</span>
          <span className="label-text label-text-alt">{ labelBR }</span>
        </div>
      </div>
  </>
  )
}

export default InputText
