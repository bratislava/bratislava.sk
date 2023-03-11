import { useState } from 'react'
import { useSnackbar } from 'react-simple-snackbar'

import { AlertType } from '../../forms/info-components/Alert'
import Button from '../../forms/simple-components/Button'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const SnackbarShowCase = () => {
  const [type, setType] = useState<AlertType>()

  // This example doesn't work
  const optionsDoesntWork = {
    style: {
      backgroundColor:
        type === 'success'
          ? 'rgb(var(--color-success-700))'
          : type === 'info'
          ? 'rgb(var(--color-gray-700))'
          : type === 'warning'
          ? 'rgb(var(--color-warning-700))'
          : 'rgb(var(--color-negative-700))',
    },
  }

  // This example doesn't work
  const [openSnackbar] = useSnackbar(optionsDoesntWork)

  const optionsSuccess = {
    style: {
      backgroundColor: 'rgb(var(--color-success-700))',
    },
  }

  const optionsWarning = {
    style: {
      backgroundColor: 'rgb(var(--color-warning-700))',
    },
  }

  const optionsError = {
    style: {
      backgroundColor: 'rgb(var(--color-negative-700))',
    },
  }

  const optionsInfo = {
    style: {
      backgroundColor: 'rgb(var(--color-gray-700))',
    },
  }

  const [openSnackbarSuccess] = useSnackbar(optionsSuccess)
  const [openSnackbarWarning] = useSnackbar(optionsWarning)
  const [openSnackbarError] = useSnackbar(optionsError)
  const [openSnackbarInfo] = useSnackbar(optionsInfo)
  return (
    <Wrapper direction="column" title="Snackbar">
      <Stack>
        <Button
          text="Success not working properly"
          onPress={() => {
            setType('success')
            openSnackbar('Success')
          }}
        />
        <Button
          text="Error not working properly"
          onPress={() => {
            setType('error')
            openSnackbar('Error')
          }}
        />
        <Button
          text="Info not working properly"
          onPress={() => {
            setType('info')
            openSnackbar('Info')
          }}
        />
        <Button
          text="Warning not working properly"
          onPress={() => {
            setType('warning')
            openSnackbar('Warning')
          }}
        />
      </Stack>
      <Stack>
        <Button
          text="Success"
          onPress={() => {
            openSnackbarSuccess('Success')
          }}
        />
        <Button
          text="Error"
          onPress={() => {
            openSnackbarError('Error')
          }}
        />
        <Button
          text="Info"
          onPress={() => {
            openSnackbarInfo('Info')
          }}
        />
        <Button
          text="Warning"
          onPress={() => {
            openSnackbarWarning('Warning')
          }}
        />
      </Stack>
    </Wrapper>
  )
}

export default SnackbarShowCase
