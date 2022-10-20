import Alert from 'components/forms/Alert'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const AlertShowCase = () => {
  return (
    <Wrapper direction='column' title='Alert'>
      <Stack direction='column'>
        <Alert message='Alert text' type='error' />
        <Alert message='Alert text' type='success' />
        <Alert message='Alert text' type='info' />
        <Alert message='Alert text' type='warning' />
      </Stack>
      <Stack direction='column'>
        <Alert message='Alert text' type='error' close onClick={() => null} />
        <Alert message='Alert text' type='success' close onClick={() => null} />
        <Alert message='Alert text' type='info' close onClick={() => null} />
        <Alert message='Alert text' type='warning' close onClick={() => null} />
      </Stack>
      <Stack direction='column'>
        <Alert message='Alert text' type='error' solid />
        <Alert message='Alert text' type='success' solid />
        <Alert message='Alert text' type='info' solid />
        <Alert message='Alert text' type='warning' solid />
      </Stack>
      <Stack direction='column'>
        <Alert message='Alert text' type='error' close solid />
        <Alert message='Alert text' type='success' close solid />
        <Alert message='Alert text' type='info' close solid />
        <Alert message='Alert text' type='warning' close solid />
      </Stack>
      <Stack direction='column'>
        <Alert message='Alert text' buttonLabel1='Click' buttonHandler1={() => {
        }} buttonLabel2='Click' buttonHandler2={() => {
        }} type='error' variant='message'
               content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'></Alert>
        <Alert message='Alert text' type='success' variant='message'
               content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        <Alert message='Alert text' type='info' variant='message'
               content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        <Alert message='Alert text' buttonLabel1='Click' buttonHandler1={() => {
        }} buttonLabel2='Click' buttonHandler2={() => {
        }} type='warning' variant='message'
               content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
      </Stack>
      <Stack direction='column'>
        <Alert message='Alert text' buttonLabel1='Click' buttonHandler1={() => {
        }} buttonLabel2='Click' buttonHandler2={() => {
        }} solid type='error' variant='message'
               content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        <Alert message='Alert text' solid type='success' variant='message'
               content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        <Alert message='Alert text' solid type='info' variant='message'
               content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        <Alert message='Alert text' solid type='warning' variant='message'
               content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
      </Stack>
    </Wrapper>
  )
}

export default AlertShowCase
