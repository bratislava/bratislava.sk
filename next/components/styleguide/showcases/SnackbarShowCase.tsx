import Button from '@components/forms/simple-components/Button'
import { useSnackbar } from 'react-simple-snackbar'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const SnackbarShowCase = () => {
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
          onPress={() => {
            openSnackbarSuccess('Success')
          }}
        >
          Success
        </Button>
        <Button
          onPress={() => {
            openSnackbarError('Error')
          }}
        >
          Error
        </Button>
        <Button
          onPress={() => {
            openSnackbarInfo('Info')
          }}
        >
          Info
        </Button>
        <Button
          onPress={() => {
            openSnackbarWarning('Warning')
          }}
        >
          Warning
        </Button>
      </Stack>
    </Wrapper>
  )
}

export default SnackbarShowCase
