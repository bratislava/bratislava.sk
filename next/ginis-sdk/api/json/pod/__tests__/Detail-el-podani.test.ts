import { Ginis } from '../../../../index'

jest.setTimeout(20000)

describe('Detail-el-podani', () => {
  let ginis: Ginis
  beforeAll(() => {
    console.log(
      'Loading GINIS credentials from .env - make sure you have correct local configuration.'
    )
    ginis = new Ginis({
      urls: {
        pod: 'http://172.25.1.195/gordic/ginis/ws/POD01/Pod.svc',
      },
      username: process.env['GINIS_USERNAME']!,
      password: process.env['GINIS_PASSWORD']!,
      debug: false,
    })
  })

  test('Basic request', async () => {
    const data = await ginis.json.pod.detailElPodani({
      'Id-zpravy': '4f700d05-9989-4798-a469-1b05f03c9cb7',
    })
    expect(data.DetailElPodani[0]?.IdDokumentu).toBe('MAG0X03RZA55')
  })
})
