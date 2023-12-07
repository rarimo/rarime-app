import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import {
  DefaultValues,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useForm as useFormHook,
} from 'react-hook-form'
import * as Yup from 'yup'

export const useForm = <T extends Yup.AnyObjectSchema, R extends object>(
  defaultValues: R,
  schemaBuilder: (yup: typeof Yup) => T,
) => {
  const [isFormDisabled, setIsFormDisabled] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormHook({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldUseNativeValidation: false,
    defaultValues: defaultValues as DefaultValues<R>,
    resolver: yupResolver(schemaBuilder(Yup)),
  })

  const getErrorMessage = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>,
  ): string => {
    return error?.message?.toString() ?? ''
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
