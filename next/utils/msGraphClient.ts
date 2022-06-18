// import { Client, AuthProvider, AuthProviderCallback, Options } from '@microsoft/microsoft-graph-client'
// import axios from 'axios'
// const authProvider: AuthProvider = async (callback: AuthProviderCallback) => {
//   // Your logic for getting and refreshing accessToken

//   // Error should be passed in case of error while authenticating
//   // accessToken should be passed upon successful authentication

//   //callback(error, accessToken);

//   // account
//   // const account = this.props.msalContext.instance.getAllAccounts()[0];
//   // retrieve token
//   // var token = await this.props.msalContext
//   //   .instance.acquireTokenSilent({
//   //     scopes: ['User.Read.All'],
//   //     account: account
//   //   })
//   //   .then((response: { accessToken: string | null; }) => {
//   //     callback('', response.accessToken);
//   //   })
//   //   .catch((error: any) => {
//   //     callback(error, '');
//   //   });

//   const formData: FormData = new FormData()
//   formData.append('grant_type', 'client_credentials')
//   formData.append('client_id', 'a6f86f77-53f7-4a8c-a1e8-06671a2395b8')
//   formData.append('client_secret', 'yIR8Q~AUoke372.TfYXGxiZgfW0tWx_D4mH7qdfQ')
//   formData.append('scope', 'https://graph.microsoft.com/.default')
//   const postUrl = 'https://login.microsoftonline.com/fe69e74e-1e66-4fcb-99c5-58e4a2d2a063/oauth2/v2.0/token'
//   const response = await fetch(postUrl, {
//     headers: { 'Access-Control-Allow-Origin': '*' },
//     body: formData,
//     method: 'post',
//   })
//   console.log('response je', response)

//   const token =
//     'eyJ0eXAiOiJKV1QiLCJub25jZSI6IjNGLXJFV2gtbkpYR1FoTUlLdDdsRGVESGNGbmVKcWM1SFF6VFdNUFdweHciLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mZTY5ZTc0ZS0xZTY2LTRmY2ItOTljNS01OGU0YTJkMmEwNjMvIiwiaWF0IjoxNjU1NDUzMzQ4LCJuYmYiOjE2NTU0NTMzNDgsImV4cCI6MTY1NTQ1NzI0OCwiYWlvIjoiRTJaZ1lKaFRHUDRpS3VaL0JPUFVvNDk0Myt6S0J3QT0iLCJhcHBfZGlzcGxheW5hbWUiOiJCcmF0aXNsYXZhIEhvbWVwYWdlIiwiYXBwaWQiOiJhNmY4NmY3Ny01M2Y3LTRhOGMtYTFlOC0wNjY3MWEyMzk1YjgiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mZTY5ZTc0ZS0xZTY2LTRmY2ItOTljNS01OGU0YTJkMmEwNjMvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiJiY2MwZWQ1MS1lZTE3LTQ0NjctODExOS04ZDliN2NiM2RkNzEiLCJyaCI6IjAuQVVnQVR1ZHBfbVlleTAtWnhWamtvdEtnWXdNQUFBQUFBQUFBd0FBQUFBQUFBQUJJQUFBLiIsInJvbGVzIjpbIlVzZXIuUmVhZC5BbGwiXSwic3ViIjoiYmNjMGVkNTEtZWUxNy00NDY3LTgxMTktOGQ5YjdjYjNkZDcxIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiZmU2OWU3NGUtMWU2Ni00ZmNiLTk5YzUtNThlNGEyZDJhMDYzIiwidXRpIjoid05ZQmVIa2g2MC1BcGpWNVFwOG5BQSIsInZlciI6IjEuMCIsIndpZHMiOlsiMDk5N2ExZDAtMGQxZC00YWNiLWI0MDgtZDVjYTczMTIxZTkwIl0sInhtc190Y2R0IjoxNDQ3MzM5NzQzfQ.qMy28dy-0akqB2naTHqiBFEVCXq1NR_Q076Z0pDAk_tYXgPqhkT4gQ7am6Bq-KdLPbNh6qzgQxgc_NGb2dDHMo3lVCLB4taYXPaSLRK66bf_6ld6wCCYcbsa4Y9C2xIO1ap53XKzu1C5B1WQgffKPn6sq_EJdQAvPS2HY6bTa_jw_dCHP5FC6jS7fihOVhCFMk6EmbSYz01MbqIFeZxrhcQQSTSWesF7qcEOlxfwu0N8dMGcbrjbTeU6Nh1B0mwzA8NNrc6JGd9XRVVlAIOM6Vv-LB7ATV9ZpSPRdY4Ko7MYFHCBjSFsfhhhuvatNWOKa_RDcGXhTidBRx3uxroB6w'
//   callback('', token)
// }
// let options: Options = {
//   authProvider,
// }

// export const msGraphClient = Client.init(options)

export {}
