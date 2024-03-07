import { Ginis } from '../../../../index'
const fs = require('fs').promises

jest.setTimeout(20000)

describe('Pridat-soubor', () => {
  let ginis: Ginis
  beforeAll(() => {
    console.log(
      'Loading GINIS credentials from .env - make sure you have correct local configuration.'
    )
    ginis = new Ginis({
      urls: {
        ssl: 'http://172.25.1.195/gordic/ginis/ws/SSL01_BRA/Ssl.svc',
      },
      username: process.env['GINIS_USERNAME']!,
      password: process.env['GINIS_PASSWORD']!,
      debug: false,
    })
  })

  test('Basic request', async () => {
    console.log('start reading')
    const contents = await fs.readFile('./src/api/json/ssl/__tests__/raw-data.bin', {
      encoding: 'base64',
    })
    console.log('done reading ')

    const data = await ginis.json.ssl.pridatSoubor({
      'Id-dokumentu': 'MAG0X03RYYSN',
      'Jmeno-souboru': 'raw-data.bin',
      'Typ-vazby': 'elektronicka-priloha',
      Data: contents,
    })
    expect(data['PridatSoubor'][0]?.['VerzeSouboru']).toBeTruthy()
  })
})
