import { Address } from '@utils/useAccount'
import CorrespondenceAddressModal from 'components/forms/segments/CorrespondenceAddressModal/CorrespondenceAddressModal'
import RegistrationModal from 'components/forms/segments/RegistrationModal/RegistrationModal'
import Modal from 'components/forms/widget-components/Modals/Modal'
import { useState } from 'react'

import Button from '../../forms/simple-components/Button'
import MessageModal from '../../forms/widget-components/Modals/MessageModal'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const firstScreen = () => {
  return (
    <div className="flex w-full items-center justify-center rounded-lg bg-[blue] p-2 text-white">
      First screen
    </div>
  )
}

const secondScreen = () => {
  return (
    <div className="flex w-full items-center justify-center rounded-lg bg-[orange] p-2 text-white">
      Second screen
    </div>
  )
}

const thirdScreen = () => {
  return (
    <div className="flex w-full items-center justify-center rounded-lg bg-[purple] p-2 text-white">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
      was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
      passages, and more recently with desktop publishing software like Aldus PageMaker including
      versions of Lorem Ipsum.
    </div>
  )
}

const singleModalContent = ({ onSubmit }: any) => {
  return (
    <div>
      <div className="flex w-full items-center justify-center rounded-lg bg-[green] p-2 text-white">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </div>
      <div className="flex justify-between mt-2">
        <Button text="First" variant="black-outline" onPress={onSubmit} />
        <Button text="Second" variant="black-outline" onPress={onSubmit} />
      </div>
    </div>
  )
}

const ModalShowCase = () => {
  const [modalSingleShow, setModalSingleShow] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [modalShowSuccess, setModalShowSuccess] = useState(false)
  const [modalShowError, setModalShowError] = useState(false)
  const [modalShowInfo, setModalShowInfo] = useState(false)
  const [modalShowWarning, setModalShowWarning] = useState(false)
  const [correnspondenceAddressModalShow, setCorrenspondenceAddressModalShow] = useState(false)
  const [registrationModal, setRegistrationModal] = useState(false)

  const onSubmitCorrespondenceAddress = ({ data }: { data?: Address }) => {
    console.log(data)
    setCorrenspondenceAddressModalShow(false)
  }

  return (
    <Wrapper direction="column" title="Modal">
      <Stack direction="column">
        <Button
          size="sm"
          variant="black"
          text="Open modal single content modal window"
          onPress={() => setModalSingleShow(true)}
        />
        <Button
          size="sm"
          variant="black-outline"
          text="Open modal (divider is optional parameter)"
          onPress={() => setModalShow(true)}
        />
        <Button
          size="sm"
          variant="black"
          text="Open success message modal"
          onPress={() => setModalShowSuccess(true)}
        />
        <Button
          size="sm"
          variant="black-outline"
          text="Open error message modal"
          onPress={() => setModalShowError(true)}
        />
        <Button
          size="sm"
          variant="black"
          text="Open info message modal"
          onPress={() => setModalShowInfo(true)}
        />
        <Button
          size="sm"
          variant="black-outline"
          text="Open warning message modal"
          onPress={() => setModalShowWarning(true)}
        />
        <Button
          size="sm"
          variant="black"
          text="Open correspondence address modal"
          onPress={() => setCorrenspondenceAddressModalShow(true)}
        />
        <Button
          size="sm"
          variant="black"
          text="Open registration modal"
          onPress={() => setRegistrationModal(true)}
        />
        <Modal
          divider
          header="Some header"
          show={modalSingleShow}
          onClose={() => setModalSingleShow(false)}
          onSubmit={() => {
            alert('Modal submitted')
            setModalSingleShow(false)
          }}
          content={singleModalContent}
          className="w-[700px]"
          confirmLabel="Finish"
          cancelLabel="Zrušit"
        />
        <Modal
          divider
          header="Some header"
          show={modalShow}
          onClose={() => setModalShow(false)}
          onSubmit={() => {
            alert('Modal submitted')
            setModalShow(false)
          }}
          content={[firstScreen, secondScreen, thirdScreen]}
          className="w-[700px]"
          confirmLabel="Finish"
          cancelLabel="Zrušit"
        />

        <MessageModal
          show={modalShowSuccess}
          confirmLabel="Primary action"
          type="success"
          cancelHandler={() => {
            setModalShowSuccess(false)
          }}
          submitHandler={() => {
            setModalShowSuccess(false)
          }}
          title="Lorem ipsum"
          cancelLabel="Cancel"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </MessageModal>

        <MessageModal
          show={modalShowError}
          confirmLabel="Primary action"
          type="error"
          cancelHandler={() => {
            setModalShowError(false)
          }}
          submitHandler={() => {
            setModalShowError(false)
          }}
          title="Lorem ipsum"
          cancelLabel="Cancel"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </MessageModal>

        <MessageModal
          show={modalShowInfo}
          className="w-[700px]"
          confirmLabel="Primary action"
          type="info"
          cancelHandler={() => {
            setModalShowInfo(false)
          }}
          submitHandler={() => {
            setModalShowInfo(false)
          }}
          title="Lorem ipsum"
          cancelLabel="Cancel"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </MessageModal>

        <MessageModal
          show={modalShowWarning}
          className="w-[700px]"
          confirmLabel="Primary action"
          type="warning"
          cancelHandler={() => {
            setModalShowWarning(false)
          }}
          submitHandler={() => {
            setModalShowWarning(false)
          }}
          title="Lorem ipsum"
          cancelLabel="Cancel"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </MessageModal>
        <CorrespondenceAddressModal
          show={correnspondenceAddressModalShow}
          onClose={() => setCorrenspondenceAddressModalShow(false)}
          onSubmit={onSubmitCorrespondenceAddress}
          defaultValues={{}}
        />
        <RegistrationModal show={registrationModal} onClose={() => setRegistrationModal(false)} />
      </Stack>
    </Wrapper>
  )
}

export default ModalShowCase
