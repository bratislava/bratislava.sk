import { AdvancedAccordionItem, AdvancedAccordionItemProps } from '../AdvancedAccordionItem/AdvancedAccordionItem'
import { BasicSearch } from '../BasicSearch/BasicSearch'
import Divider from '../Divider/Divider'
import { useEffect } from 'react'
import { useMsal } from '@azure/msal-react'
import { Client, AuthProvider, AuthProviderCallback, Options } from '@microsoft/microsoft-graph-client'
import { useRouter } from 'next/router'

import { NavigationClient, NavigationOptions } from '@azure/msal-browser'
import { NextRouter } from 'next/router'

/**
 * This is an example for overriding the default function MSAL uses to navigate to other urls in your webpage
 */
export class CustomNavigationClient extends NavigationClient {
  router: NextRouter

  constructor(router: NextRouter) {
    super()
    this.router = router
  }

  /**
   * Navigates to other pages within the same web application
   * You can use the useRouter hook provided by next.js to take advantage of client-side routing
   * @param url
   * @param options
   */
  async navigateInternal(url: string, options: NavigationOptions) {
    const relativePath = url.replace(window.location.origin, '')
    if (options.noHistory) {
      this.router.replace(relativePath)
    } else {
      this.router.push(relativePath)
    }

    return false
  }
}

export interface AdvancedAccordionProps {
  title?: string
  dividerStyle?: string
}

export const AdvancedAccordion = ({ title, dividerStyle }: AdvancedAccordionProps) => {
  const { instance } = useMsal()
  const router = useRouter()
  const navigationClient = new CustomNavigationClient(router)
  instance.setNavigationClient(navigationClient)

  const authProvider: AuthProvider = async (callback: AuthProviderCallback) => {
    // Your logic for getting and refreshing accessToken

    // Error should be passed in case of error while authenticating
    // accessToken should be passed upon successful authentication

    //callback(error, accessToken);
    // let tokenResponse = await instance.handleRedirectPromise()
    // console.log('tok res ', tokenResponse)
    // let account
    // if (tokenResponse) {
    //   account = tokenResponse.account
    // } else {
    //   account = instance.getAllAccounts()[0]
    // }
    // account
    //const account = instance.getAllAccounts()[0]
    // retrieve token
    let account = null
    const accounts = instance.getAllAccounts()
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0])
      account = accounts[0]
    }
    var token = await instance
      .acquireTokenSilent({
        scopes: ['User.ReadBasic.All'],
        account: account ?? (null as any),
      })
      .then((response: { accessToken: string | null }) => {
        callback('', response.accessToken)
      })
      .catch((error: any) => {
        callback(error, '')
      })
  }
  let options: Options = {
    authProvider,
  }
  const client = Client.init(options)
  useEffect(() => {
    const fetchData = async () => {
      /* DOCS on https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/initialize-confidential-client-application.md */

      // const config = {
      //   auth: {
      //     clientId: 'a6f86f77-53f7-4a8c-a1e8-06671a2395b8',
      //     authority: 'https://login.microsoftonline.com/fe69e74e-1e66-4fcb-99c5-58e4a2d2a063',
      //     clientSecret: 'yIR8Q~AUoke372.TfYXGxiZgfW0tWx_D4mH7qdfQ',
      //     knownAuthorities: ['https://login.microsoftonline.com/fe69e74e-1e66-4fcb-99c5-58e4a2d2a063'],
      //   },
      // }
      // const cca = new msal.ConfidentialClientApplication(config)
      // const clientCredentialRequest = {
      //   scopes: ['user.read.all'], // replace with your resource
      //   authority: 'https://login.microsoftonline.com/fe69e74e-1e66-4fcb-99c5-58e4a2d2a063',
      // }
      // cca
      //   .acquireTokenByClientCredential({ ...clientCredentialRequest })
      //   .then((response) => {
      //     console.log('Response: ', response)
      //   })
      //   .catch((error) => {
      //     console.log(JSON.stringify(error))
      //   })

      // const msalConfig = {
      //   auth: {
      //     clientId: 'a6f86f77-53f7-4a8c-a1e8-06671a2395b8',
      //     authority: 'https://login.microsoftonline.com/fe69e74e-1e66-4fcb-99c5-58e4a2d2a063',
      //     knownAuthorities: ['https://login.microsoftonline.com/fe69e74e-1e66-4fcb-99c5-58e4a2d2a063'],
      //   },
      // }

      // const pca = new msal.PublicClientApplication(msalConfig)

      // const deviceCodeRequest = {
      //   deviceCodeCallback: (response: { message: any }) => console.log(response.message),
      //   scopes: ['user.read.all'],
      // }

      // pca
      //   .acquireTokenByDeviceCode(deviceCodeRequest)
      //   .then((response) => {
      //     console.log(JSON.stringify(response))
      //   })
      //   .catch((error) => {
      //     console.log(JSON.stringify(error))
      //   })
      let users = await client.api('/users').get()
      console.log(users)
    }
    fetchData()
  }, [])

  return (
    <div className="flex flex-col">
      <div className="text-default lg:text-lg font-semibold pb-4">{title}</div>
      <BasicSearch collapse className="flex lg:hidden pb-6" placeholder={''} title={''} buttonText={''} />
      <AdvancedAccordionItem {...firstItem} />
      {/* <Divider
        className="py-6 lg:py-10"
        dividerStyle={dividerStyle && dividerStyle?.length > 1 ? dividerStyle : 'mesto_01_full_width'}
      /> */}
      <AdvancedAccordionItem {...secondItem} />
    </div>
  )
}

export const firstItem: AdvancedAccordionItemProps = {
  title: 'Primátor hlavného mesta SR Bratislavy',
  departments: [
    {
      departmentCards: [
        {
          id: '1',
          email: 'primator@bratislava.sk',
          heading: true,
          phone: '+421-2-59356535',
          subtitle: 'Primátor',
          title: 'Vallo Matúš, Ing. arch.',
        },
      ],
      subitems: [],
    },
    {
      title: 'Kancelária primátora',
      departmentCards: [
        {
          id: '2',
          email: 'meno.priezvisko@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Riaditeľ kancelárie primátora',
          title: 'Kmeť J.',
        },
      ],
      subitems: [
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Oddelenie zahraničných vzťahov a protokolu',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Oddelenie komunikácie a marketingu',
        },
        {
          departmentCards: [
            {
              id: '3',
              email: 'meno.priezvisko@bratislava.sk',
              phone: '+421 *** *** ***',
              subtitle: 'Pozícia',
              title: 'Priezvisko Meno, Titul',
            },
            {
              id: '4',

              email: 'meno.priezvisko@bratislava.sk',
              phone: '+421 *** *** ***',
              subtitle: 'Pozícia',
              title: 'Priezvisko Meno, Titul',
            },
            {
              id: '5',
              email: 'meno.priezvisko@bratislava.sk',
              phone: '+421 *** *** ***',
              subtitle: 'Pozícia',
              title: 'Priezvisko Meno, Titul',
            },
            {
              id: '6',
              email: 'meno.priezvisko@bratislava.sk',
              phone: '+421 *** *** ***',
              subtitle: 'Pozícia',
              title: 'Priezvisko Meno, Titul',
            },
            {
              id: '7',
              email: 'meno.priezvisko@bratislava.sk',
              phone: '+421 *** *** ***',
              subtitle: 'Pozícia',
              title: 'Priezvisko Meno, Titul',
            },
            {
              id: '8',
              email: 'meno.priezvisko@bratislava.sk',
              phone: '+421 *** *** ***',
              subtitle: 'Pozícia',
              title: 'Priezvisko Meno, Titul',
            },
            {
              id: '9',
              email: 'meno.priezvisko@bratislava.sk',
              phone: '+421 *** *** ***',
              subtitle: 'Pozícia',
              title: 'Priezvisko Meno, Titul',
            },
            {
              id: '10',
              email: 'meno.priezvisko@bratislava.sk',
              phone: '+421 *** *** ***',
              subtitle: 'Pozícia',
              title: 'Priezvisko Meno, Titul',
            },
          ],
          subdepartments: [],
          title: 'Oddelenie vzťahov s verejnosťou',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Sprostredkovateľský orgán - Integrovaný regionálny operačný program',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Útvar správy mestských podnikov',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Útvar hlavného architekta',
        },
      ],
    },
    {
      departmentPhone: '+421 *** *** ***',
      title: 'Sekretariát primátora',
      departmentCards: [
        {
          id: '11',
          email: 'meno.priezvisko@bratislava.sk',
          heading: false,
          phone: '+421 *** *** ***',
          subtitle: 'Vedúca sekretariátu primátora',
          title: 'Marušicová A.',
        },
        {
          id: '12',
          email: 'meno.priezvisko@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Pozícia',
          title: 'Priezvisko Meno, Titul',
        },
        {
          id: '13',
          email: 'meno.priezvisko@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Pozícia',
          title: 'Priezvisko Meno, Titul',
        },
        {
          id: '14',
          email: 'meno.priezvisko@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Pozícia',
          title: 'Priezvisko Meno, Titul',
        },
      ],
      subitems: [
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Poradcovia primátora',
        },
      ],
    },
    {
      title: 'Námestníci primátora',
      departmentCards: [
        {
          id: '15',
          email: 'meno.priezvisko@bratislava.sk',
          heading: false,
          phone: '+421 *** *** ***',
          subtitle: '1. námestníčka primátora',
          title: 'Kratochvílová T.',
        },
        {
          id: '16',
          email: 'meno.priezvisko@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Námestníčka primátora',
          title: 'Zaťovičová Z.',
        },
        {
          id: '17',
          email: 'meno.priezvisko@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Námestníčka primátora',
          title: 'Plavúchová A. L.',
        },
      ],
      subitems: [
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Kancelária námestníčky Kratochvílovej',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Kancelária námestníčky Zaťovičovej',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Kancelária námestníčky Antalovej Plavúchovej',
        },
      ],
    },
  ],
}

export const secondItem: AdvancedAccordionItemProps = {
  title: 'Magistrát hlavného mesta SR Bratislavy',
  departments: [
    {
      departmentCards: [
        {
          id: '18',
          email: 'riaditel@bratislava.sk',
          heading: true,
          phone: '+421-2-59356663',
          subtitle: 'Riaditeľ magistrátu',
          title: 'Košťál Ctibor, Mgr.',
        },
      ],
      subitems: [
        {
          departmentCards: [],
          groupHeading: 'Priamo riadené oddelenia riaditeľom magistrátu',
          subdepartments: [],
          title: 'Oddelenie ľudských zdrojov',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Odd. verejného obstarávania',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Oddelenie správy komunikácií',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Odd. programovania a spolupráce',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Útvar hlavného ekonóma',
        },
        {
          departmentCards: [],
          groupHeading: 'Podriadené sekcie',
          subdepartments: [],
          title: 'Sekcia financií',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Sekcia dopravy',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Sekcia správy nehnuteľností',
        },
      ],
    },
    {
      departmentPhone: '+421 *** *** ***',
      title: 'Kancelária riaditeľa magistrátu',
      departmentCards: [
        {
          id: '19',
          email: 'meno.priezvisko@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Pozícia',
          title: 'Priezvisko Meno, Titul',
        },
        {
          id: '20',
          email: 'meno.priezvisko@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Pozícia',
          title: 'Priezvisko Meno, Titul',
        },
        {
          id: '21',
          email: 'meno.priezvisko@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Pozícia',
          title: 'Priezvisko Meno, Titul',
        },
        {
          id: '22',
          email: 'meno.priezvisko@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Pozícia',
          title: 'Priezvisko Meno, Titul',
        },
        {
          id: '23',
          email: 'meno.priezvisko@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Pozícia',
          title: 'Priezvisko Meno, Titul',
        },
        {
          id: '24',
          email: 'meno.priezvisko@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Pozícia',
          title: 'Priezvisko Meno, Titul',
        },
        {
          id: '25',
          email: 'meno.priezvisko@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Pozícia',
          title: 'Priezvisko Meno, Titul',
        },
        {
          id: '26',
          email: 'meno.priezvisko@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Pozícia',
          title: 'Priezvisko Meno, Titul',
        },
      ],
      subitems: [],
    },
    {
      title: 'Zástupcovia riaditeľa magistrátu',
      departmentCards: [
        {
          id: '26',
          email: 'lukas.dinda@bratislava.sk',
          phone: '+421 *** *** ***',
          subtitle: 'Zástupca riaditeľa magistrátu',
          title: 'Radosa M.',
        },
      ],
      subitems: [
        {
          departmentCards: [],
          groupHeading: 'Priamo riadené oddelenia zástupcom riaditeľa magistrátu',
          subdepartments: [],
          title: 'Oddelenie komunálneho podniku',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Oddelenie správy komunikácií',
        },
        {
          departmentCards: [],
          groupHeading: 'Podriadené sekcie',
          subdepartments: [],
          title: 'Sekcia právnych služieb',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Sekcia životného prostredia',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Sekcia nájomného bývania',
        },
        {
          departmentCards: [],
          groupCard: {
            id: '27',
            email: 'lukas.dinda@bratislava.sk',
            phone: '+421 *** *** ***',
            subtitle: 'Zástupkyňa riaditeľa magistrátu',
            title: 'Bargerová J.',
          },
          groupHeading: 'Priamo riadené oddelenia zástupkyňou riaditeľa magistrátu',
          subdepartments: [],
          title: 'Oddelenie školstva, športu a mládeže',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Oddelenie kultúry',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Oddelenie vnútornej správy',
        },
        {
          departmentCards: [],
          groupHeading: 'Podriadené sekcie',
          subdepartments: [],
          title: 'Sekcia sociálnych vecí',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Sekcia územného rozvoja',
        },
        {
          departmentCards: [],
          groupCard: {
            id: '28',
            email: 'lukas.dinda@bratislava.sk',
            phone: '+421 *** *** ***',
            subtitle: 'Zástupca riaditeľa magistrátu',
            title: 'Dinda Lukáš, Ing.',
          },
          groupHeading: 'Priamo riadené oddelenia zástupcom riaditeľa magistrátu',
          subdepartments: [],
          title: 'Oddelenie implementácie externého fiancovania',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Oddelenie interného auditu',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Oddelenie rozvoja magistrátu',
        },
        {
          departmentCards: [],
          groupHeading: 'Podriadené sekcie',
          subdepartments: [],
          title: 'Sekcia výstavby',
        },
        {
          departmentCards: [
            {
              id: '29',
              email: 'meno.priezvisko@bratislava.sk',
              phone: '+421 *** *** ***',
              subtitle: 'Pozícia',
              title: 'Priezvisko Meno, Titul',
            },
            {
              id: '30',
              email: 'meno.priezvisko@bratislava.sk',
              phone: '+421 *** *** ***',
              subtitle: 'Pozícia',
              title: 'Priezvisko Meno, Titul',
            },
          ],
          subdepartments: [
            {
              departmentCards: [],
              title: 'Projektová kancelária - SIDal',
            },
            {
              departmentCards: [],
              title: 'Oddelenie dátových a priestorových analýz',
            },
            {
              departmentCards: [],
              title: 'Oddelenie informatiky',
            },
            {
              departmentCards: [
                {
                  id: '31',
                  email: 'meno.priezvisko@bratislava.sk',
                  phone: '+421 *** *** ***',
                  subtitle: 'Pozícia',
                  title: 'Priezvisko Meno, Titul',
                },
                {
                  id: '32',
                  email: 'meno.priezvisko@bratislava.sk',
                  phone: '+421 *** *** ***',
                  subtitle: 'Pozícia',
                  title: 'Priezvisko Meno, Titul',
                },
                {
                  id: '33',
                  email: 'meno.priezvisko@bratislava.sk',
                  phone: '+421 *** *** ***',
                  subtitle: 'Pozícia',
                  title: 'Priezvisko Meno, Titul',
                },
                {
                  id: '34',
                  email: 'meno.priezvisko@bratislava.sk',
                  phone: '+421 *** *** ***',
                  subtitle: 'Pozícia',
                  title: 'Priezvisko Meno, Titul',
                },
                {
                  id: '35',
                  email: 'meno.priezvisko@bratislava.sk',
                  phone: '+421 *** *** ***',
                  subtitle: 'Pozícia',
                  title: 'Priezvisko Meno, Titul',
                },
                {
                  id: '36',
                  email: 'meno.priezvisko@bratislava.sk',
                  phone: '+421 *** *** ***',
                  subtitle: 'Pozícia',
                  title: 'Priezvisko Meno, Titul',
                },
                {
                  id: '37',
                  email: 'meno.priezvisko@bratislava.sk',
                  phone: '+421 *** *** ***',
                  subtitle: 'Pozícia',
                  title: 'Priezvisko Meno, Titul',
                },
                {
                  id: '38',
                  email: 'meno.priezvisko@bratislava.sk',
                  phone: '+421 *** *** ***',
                  subtitle: 'Pozícia',
                  title: 'Priezvisko Meno, Titul',
                },
              ],
              title: 'Oddelenie inovácií a digitálnych služieb',
            },
          ],
          title: 'Sekcia informatiky, dát a inovácií',
        },
        {
          departmentCards: [],
          subdepartments: [],
          title: 'Projektová kancelária - magistrát',
        },
      ],
    },
  ],
}
