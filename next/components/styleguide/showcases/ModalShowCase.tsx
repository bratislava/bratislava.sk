import Modal from 'components/forms/Modal'
import React,{useState} from 'react'

import Button from '../../forms/Button'
import MessageModal from '../../forms/MessageModal'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'


const firstScreen = () => {
  return (
    <div className='flex h-full w-full items-center justify-center rounded-lg bg-[blue] p-2 text-white'>
      First screen
    </div>
  )
}

const secondScreen = () => {
  return (
    <div className='flex h-full w-full items-center justify-center rounded-lg bg-[orange] p-2 text-white'>
      Second screen
    </div>
  )
}

const thirdScreen = () => {
  return (
    <div className='flex h-full w-full items-center justify-center rounded-lg bg-[purple] p-2 text-white'>
      Third screen ( the last one )
    </div>
  )
}

const ModalShowCase = () => {
  const [modalShow, setModalShow] = useState(false)
  return (
    <Wrapper direction="column" title="Modal">
      <Stack direction="column">
        <Button size='sm' text='Open modal' onPress={()=>setModalShow(true)}/>
        {/* eslint-disable-next-line no-alert */}
        <Modal divider show={modalShow} onClose={()=> setModalShow(false)}  onSubmit={()=>{alert("Modal submitted"); setModalShow(false); }} content={[firstScreen,secondScreen,thirdScreen]}/>
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
