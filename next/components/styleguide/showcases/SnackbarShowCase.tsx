import { useState } from 'react'

import Snackbar from '../../forms/info-components/Snackbar'
import Button from '../../forms/simple-components/Button'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const SnackbarShowCase = () => {
  const [successSolid, setSuccessSolid] = useState<boolean>(false)
  const [warningSolid, setWarningSolid] = useState<boolean>(false)
  const [infoSolid, setInfoSolid] = useState<boolean>(false)
  const [errorSolid, setErrorSolid] = useState<boolean>(false)

  const [successNotSolid, setSuccessNotSolid] = useState<boolean>(false)
  const [warningNotSolid, setWarningNotSolid] = useState<boolean>(false)
  const [infoNotSolid, setInfoNotSolid] = useState<boolean>(false)
  const [errorNotSolid, setErrorNotSolid] = useState<boolean>(false)
  return (
    <Wrapper
      direction="column"
      title="Snackbar ( wait for disappearing the previous one before choosing another button ) glitch effect only on this page"
    >
      <Stack>
        {successSolid && (
          <Snackbar
            message="Snackbar text"
            type="success"
            solid
            onClose={() => setSuccessSolid(false)}
          />
        )}
        {warningSolid && (
          <Snackbar
            message="Snackbar text"
            type="warning"
            solid
            onClose={() => setWarningSolid(false)}
          />
        )}
        {infoSolid && (
          <Snackbar message="Snackbar text" type="info" solid onClose={() => setInfoSolid(false)} />
        )}
        {errorSolid && (
          <Snackbar
            message="Snackbar text"
            type="error"
            solid
            onClose={() => setErrorSolid(false)}
          />
        )}
        <Button
          variant="category"
          text="Success solid"
          onPress={() => {
            setSuccessSolid(true)
          }}
        />
        <Button
          variant="category"
          text="Warning solid"
          onPress={() => {
            setWarningSolid(true)
          }}
        />
        <Button
          variant="category"
          text="Info solid"
          onPress={() => {
            setInfoSolid(true)
          }}
        />
        <Button
          variant="category"
          text="Error solid"
          onPress={() => {
            setErrorSolid(true)
          }}
        />
      </Stack>
      <Stack>
        {successNotSolid && (
          <Snackbar
            message="Snackbar text"
            type="success"
            icon={false}
            onClose={() => setSuccessNotSolid(false)}
          />
        )}
        {warningNotSolid && (
          <Snackbar
            message="Snackbar text"
            type="warning"
            onClose={() => setWarningNotSolid(false)}
          />
        )}
        {infoNotSolid && (
          <Snackbar message="Snackbar text" type="info" onClose={() => setInfoNotSolid(false)} />
        )}
        {errorNotSolid && (
          <Snackbar message="Snackbar text" type="error" onClose={() => setErrorNotSolid(false)} />
        )}
        <Button
          variant="category"
          text="Success not solid"
          onPress={() => {
            setSuccessNotSolid(true)
          }}
        />
        <Button
          variant="category"
          text="Warning not solid"
          onPress={() => {
            setWarningNotSolid(true)
          }}
        />
        <Button
          variant="category"
          text="Info not solid"
          onPress={() => {
            setInfoNotSolid(true)
          }}
        />
        <Button
          variant="category"
          text="Error not solid"
          onPress={() => {
            setErrorNotSolid(true)
          }}
        />
      </Stack>
    </Wrapper>
  )
}

export default SnackbarShowCase
