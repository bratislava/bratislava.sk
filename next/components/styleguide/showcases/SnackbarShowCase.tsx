import { useSnackbar } from '@utils/useSnackbar'

import Button from '../../forms/simple-components/Button'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const SnackbarShowCase = () => {
  const { showSnackbar } = useSnackbar()
  return (
    <Wrapper direction="column" title="Snackbar">
      <Stack>
        <Button
          text="Success Top-Left"
          onPress={() => showSnackbar('Success Top-Left', 'top-left', 'success', true, 10_000)}
        />
        <Button
          text="Warning Top-Center"
          onPress={() => showSnackbar('Warning Top-Center', 'top-center', 'warning')}
        />
        <Button
          text="Info Top-Right"
          onPress={() => showSnackbar('Info Top-Right', 'top-right', 'info')}
        />
      </Stack>
      <Stack>
        <Button
          text="Error Bottom-Left"
          onPress={() => showSnackbar('Error Bottom-Left', 'bottom-left', 'error')}
        />
        <Button
          text="Info Bottom-Center"
          onPress={() => showSnackbar('Info Bottom-Center', 'bottom-center', 'info')}
        />
        <Button
          text="Success Bottom-Right"
          onPress={() => showSnackbar('Success Bottom-Right', 'bottom-right', 'success')}
        />
      </Stack>
    </Wrapper>
  )
}

export default SnackbarShowCase
