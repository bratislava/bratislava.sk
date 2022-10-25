import Alert from 'components/forms/Alert'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const AlertShowCase = () => {
  return (
    <Wrapper direction='column' title='TEST Alert'>
      <Stack direction='column'>
        <Alert message='Alert text' type='error' />
        <Alert message='Alert text' type='success' />
        <Alert message='Alert text' type='info' />
        <Alert message='Alert text' type='warning' />
      </Stack>
      <Stack direction='column'>
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' type='error' close={()=>{}}/>
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' type='success' close={()=>{}}/>
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' type='info' close={()=>{}}/>
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' type='warning' close={()=>{}}/>
      </Stack>
      <Stack direction='column'>
        <Alert message='Alert text' type='error' solid />
        <Alert message='Alert text' type='success' solid />
        <Alert message='Alert text' type='info' solid />
        <Alert message='Alert text' type='warning' solid />
      </Stack>
      <Stack direction='column'>
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' type='error' close={()=>{}} solid />
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' type='success' close={()=>{}} solid />
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' type='info' close={()=>{}} solid />
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' type='warning' close={()=>{}} solid />
      </Stack>
      <Stack direction='column'>
        <Alert message='Alert text' type='error' variant='message'
               content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        <Alert message='Alert text' type='success' variant='message'
               content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        <Alert message='Alert text' type='info' variant='message'
               content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        <Alert message='Alert text' type='warning' variant='message'
               content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
      </Stack>
      <Stack direction='column'>
        <Alert message='Alert text' solid type='error' variant='message'
                   content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        <Alert message='Alert text' solid type='success' variant='message'
                   content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        <Alert message='Alert text' solid type='info' variant='message'
                   content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        <Alert message='Alert text' solid type='warning' variant='message'
                   content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
      </Stack>
      <Stack direction='column'>
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' type='error' buttons={[{title: "Button",handler: ()=>{}},{title: "Button",handler: ()=>{}}]} variant='message'
                   content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' type='success' buttons={[{title: "Button",handler: ()=>{}},{title: "Button",handler: ()=>{}}]} variant='message'
                   content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' type='info' buttons={[{title: "Button",handler: ()=>{}},{title: "Button",handler: ()=>{}}]} variant='message'
                   content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' type='warning' buttons={[{title: "Button",handler: ()=>{}},{title: "Button",handler: ()=>{}}]} variant='message'
                   content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
      </Stack>
      <Stack direction='column'>
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' solid type='error' buttons={[{title: "Button",handler: ()=>{}},{title: "Button",handler: ()=>{}}]} variant='message'
                   content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' solid type='success' buttons={[{title: "Button",handler: ()=>{}},{title: "Button",handler: ()=>{}}]} variant='message'
                   content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' solid type='info' buttons={[{title: "Button",handler: ()=>{}},{title: "Button",handler: ()=>{}}]} variant='message'
                   content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
        {/* eslint-disable-next-line lodash/prefer-noop */}
        <Alert message='Alert text' solid type='warning' buttons={[{title: "Button",handler: ()=>{}},{title: "Button",handler: ()=>{}}]} variant='message'
                   content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' />
      </Stack>
    </Wrapper>
  )
}

export default AlertShowCase
