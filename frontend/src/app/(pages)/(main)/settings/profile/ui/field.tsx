import {
  TextInput,
  TextInputProps,
  Textarea,
  TextareaProps,
} from '@mantine/core'
import { IconType } from 'react-icons/lib'

interface props extends Omit<TextInputProps & TextareaProps, 'autoComplete'> {
  cl?: string
  label: string
  placeholder: string
  LeftSectionIcon?: IconType
  role?: ROLES
}

export enum ROLES {
  INPUT = 'INPUT',
  TEXTAREA = 'TEXTAREA',
}

export const Field = ({
  cl = 'w-[250px]',
  label,
  placeholder,
  LeftSectionIcon,
  role = ROLES.INPUT,
  ...props
}: props) => {
  if (role === ROLES.TEXTAREA) {
    return (
      <Textarea
        styles={{
          input: { border: 'none', outline: 'none' },
        }}
        label={label}
        placeholder={placeholder}
        className={cl}
        minRows={3}
        autosize
        {...props}
      />
    )
  }

  return (
    <TextInput
      styles={{
        input: { border: 'none', outline: 'none' },
      }}
      label={label}
      placeholder={placeholder}
      className={cl}
      leftSection={LeftSectionIcon && <LeftSectionIcon size={16} />}
      {...props}
      error={props.error}
    />
  )
}
