import { useSnackbar } from 'react-simple-snackbar'

import Button from '../../forms/simple-components/Button'
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
