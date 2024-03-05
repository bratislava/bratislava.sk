import { Ginis } from '../../../../index'

jest.setTimeout(20000)

describe('Detail-dokumentu', () => {
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
      debug: true,
    })
  })

  test('Basic request', async () => {
    const data = await ginis.json.ssl.detailDokumentu({
      'Id-dokumentu': 'MAG0X03RYYSN',
    })
    expect(data?.HistorieDokumentu?.length).toBeGreaterThan(0)
  })
})
