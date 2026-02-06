import AlertMessage from '@/src/components/common/AlertMessage/AlertMessage'
import { Enum_Componentsectionsalert_Alertvariant } from '@/src/services/graphql'

import Stack from '../Stack'
import Wrapper from '../Wrapper'

const AlertShowCase = () => {
  return (
    <Wrapper direction="column" title="Alert">
      <Stack direction="column">
        <AlertMessage title="Error" variant={Enum_Componentsectionsalert_Alertvariant.Error} />
        <AlertMessage title="Success" variant={Enum_Componentsectionsalert_Alertvariant.Success} />
        <AlertMessage title="Info" variant={Enum_Componentsectionsalert_Alertvariant.Info} />
        <AlertMessage title="Warning" variant={Enum_Componentsectionsalert_Alertvariant.Warning} />
      </Stack>
      <Stack direction="column">
        <AlertMessage
          title="Error"
          text="Alert text"
          variant={Enum_Componentsectionsalert_Alertvariant.Error}
        />
        <AlertMessage
          title="Success"
          text="Alert text"
          variant={Enum_Componentsectionsalert_Alertvariant.Success}
        />
        <AlertMessage
          title="Info"
          text="Alert text"
          variant={Enum_Componentsectionsalert_Alertvariant.Info}
        />
        <AlertMessage
          title="Warning"
          text="Alert text"
          variant={Enum_Componentsectionsalert_Alertvariant.Warning}
        />
      </Stack>
      <Stack direction="column">
        <AlertMessage title="Error" variant={Enum_Componentsectionsalert_Alertvariant.Error}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </AlertMessage>
        <AlertMessage title="Success" variant={Enum_Componentsectionsalert_Alertvariant.Success}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </AlertMessage>
        <AlertMessage title="Info" variant={Enum_Componentsectionsalert_Alertvariant.Info}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </AlertMessage>
        <AlertMessage title="Warning" variant={Enum_Componentsectionsalert_Alertvariant.Warning}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </AlertMessage>
      </Stack>
    </Wrapper>
  )
}

export default AlertShowCase
