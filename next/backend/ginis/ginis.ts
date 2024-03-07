import { Ginis } from '../../ginis-sdk'

export const ginis = new Ginis({
  // connect to any subset of services needed, all the urls are optional but requests to services missing urls will fail
  urls: {
    ude: process.env.GINIS_HOST_UDE ?? '',
  },
  // credentials
  username: process.env.GINIS_USERNAME ?? '',
  password: process.env.GINIS_PASSWORD ?? '',
  // if debug === true prints all the requests and responses into console
  // warning - these logs WILL include credentials!
  debug: false,
})
