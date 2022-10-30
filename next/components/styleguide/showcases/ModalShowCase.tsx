import Modal, { ModalHeader, ModalFooter } from 'components/forms/Modal'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'
import MessageModal from '../../forms/MessageModal'

const ModalShowCase = () => {
  return (
    <Wrapper direction="column" title="Modal">
      <Stack direction="column">
        <ModalHeader divider/>
        <ModalHeader />
        <ModalHeader flow/>
        <ModalHeader flow divider/>
        <ModalFooter divider/>
        <ModalFooter />
        <Modal />
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <MessageModal buttonText='Primary action' type='error' cancelHandler={()=>{}} submitHandler={()=>{}} message='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'/>
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <MessageModal buttonText='Primary action' type='info' cancelHandler={()=>{}} submitHandler={()=>{}} message='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'/>
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <MessageModal buttonText='Primary action' type='warning' cancelHandler={()=>{}} submitHandler={()=>{}} message='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'/>
      </Stack>
    </Wrapper>
  )
}

export default ModalShowCase
