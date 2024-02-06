import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import {
  Control,
  DefaultValues,
  FieldErrorsImpl,
  FieldPath,
  FieldValues,
  useForm as useFormHook,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import * as Yup from 'yup'

export type Form<T extends FieldValues> = {
  isFormDisabled: boolean
  getErrorMessage: (fieldName: FieldPath<T>) => string
  enableForm: () => void
  disableForm: () => void
  formState: T
  formErrors: FieldErrorsImpl<T>
  register: UseFormRegister<T>
  handleSubmit: UseFormHandleSubmit<T>
  control: Control<T>
}

export const useForm = <T extends Yup.AnyObjectSchema, R extends FieldValues>(
  defaultValues: R,
  schemaBuilder: (yup: typeof Yup) => T,
): Form<R> => {
  const [isFormDisabled, setIsFormDisabled] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormHook<R>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldUseNativeValidation: false,
    defaultValues: defaultValues as DefaultValues<R>,
    resolver: yupResolver(schemaBuilder(Yup)),
  })

  const getErrorMessage = (fieldName: FieldPath<R>): string => {
    return errors[fieldName]?.message?.toString() ?? ''
  }

  const disableForm = () => {
    setIsFormDisabled(true)
  }

  const enableForm = () => {
    setIsFormDisabled(false)
  }

  return {
    isFormDisabled,
    getErrorMessage,
    enableForm,
    disableForm,
    formState: watch(),
    formErrors: errors,
    register,
    handleSubmit,
    control,
  }
}
