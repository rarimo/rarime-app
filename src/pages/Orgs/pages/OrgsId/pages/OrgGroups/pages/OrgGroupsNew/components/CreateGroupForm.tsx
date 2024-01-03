import { Divider, FormControl, Stack, StackProps, Typography } from '@mui/material'
import { HTMLAttributes, useCallback } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'

import { createOrgGroup, OrgGroup, OrgGroupRule } from '@/api'
import { ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { UiButton, UiCheckbox, UiSwitch, UiTextField } from '@/ui'

interface Props extends StackProps {
  formProps?: HTMLAttributes<HTMLFormElement>
  onGroupCreated?: (orgGroup: OrgGroup) => void
}

// TODO: ideally array of rules should be per org, e. g. "create rule" form
const HARDCODED_RULES: OrgGroupRule[] = [
  {
    name: 'First name',
    scheme: '',
    required: false,
  },
  {
    name: 'Last name',
    scheme: '',
    required: false,
  },
  {
    name: 'Date of birth',
    scheme: '',
    required: false,
  },
  {
    name: 'Phone number',
    scheme: '',
    required: false,
  },
  {
    name: 'Telegram',
    scheme: '',
    required: false,
  },
  {
    name: 'Discord',
    scheme: '',
    required: false,
  },
]

enum FieldNames {
  GroupName = 'groupName',
  GroupDescription = 'groupDescription',
  GroupRules = 'groupRules',
}

type GroupRuleField = OrgGroupRule & { selected: boolean }

const DEFAULT_VALUES = {
  [FieldNames.GroupName]: '',
  [FieldNames.GroupDescription]: '',
  [FieldNames.GroupRules]: HARDCODED_RULES.map(el => ({
    ...el,
    selected: false,
  })) as GroupRuleField[],
}

export default function CreateGroupForm({ formProps, onGroupCreated, ...rest }: Props) {
  const { org } = useOrgDetails()

  const {
    formState,
    handleSubmit,
    control,
    register,
    isFormDisabled,
    getErrorMessage,
    disableForm,
    enableForm,
  } = useForm(DEFAULT_VALUES, yup =>
    yup.object().shape({
      [FieldNames.GroupName]: yup.string().required(),
      [FieldNames.GroupRules]: yup.array().required(),
    }),
  )

  const { fields: groupRuleFields } = useFieldArray({
    control,
    name: FieldNames.GroupRules, // unique name for your Field Array
  })

  const submit = useCallback(async () => {
    disableForm()

    try {
      const orgGroup = await createOrgGroup(org.id, {
        metadata: {
          name: formState[FieldNames.GroupName],
          description: formState[FieldNames.GroupDescription],
        },
        rules: formState[FieldNames.GroupRules].filter(el => el.selected),
      })

      onGroupCreated?.(orgGroup)
    } catch (error) {
      ErrorHandler.process(error)
    }

    enableForm()
  }, [disableForm, enableForm, formState, onGroupCreated, org.id])

  return (
    <Stack {...rest} flex={1}>
      <form {...formProps} onSubmit={handleSubmit(submit)}>
        <Controller
          name={FieldNames.GroupName}
          control={control}
          render={({ field }) => (
            <FormControl>
              <UiTextField
                {...field}
                label={FieldNames.GroupName}
                errorMessage={getErrorMessage(FieldNames.GroupName)}
                disabled={isFormDisabled}
              />
            </FormControl>
          )}
        />
        <Controller
          name={FieldNames.GroupDescription}
          control={control}
          render={({ field }) => (
            <FormControl>
              <UiTextField
                {...field}
                label={FieldNames.GroupDescription}
                errorMessage={getErrorMessage(FieldNames.GroupDescription)}
                disabled={isFormDisabled}
              />
            </FormControl>
          )}
        />

        <Typography variant='h4' mt={4} textAlign='center'>
          Select employer informations
        </Typography>
        <Divider />

        {groupRuleFields.map((field, idx) => (
          <FormControl key={field.id}>
            <Stack direction='row' justifyContent='space-between'>
              <UiSwitch
                label={field.name}
                {...register(`${FieldNames.GroupRules}.${idx}.selected`)}
              />

              {/*TODO: add autoselect on required change*/}
              <UiCheckbox
                label='Required'
                {...register(`${FieldNames.GroupRules}.${idx}.required`)}
              />
            </Stack>
          </FormControl>
        ))}

        <UiButton type='submit'>Create</UiButton>
      </form>
    </Stack>
  )
}
