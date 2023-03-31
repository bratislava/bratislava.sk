const fetchTootootEvents = () => {
  fetch(
    'https://api.tootoot.co/api/event/search?categories=&cityId=54e5bb329016501adcf16d4b&page=0&perPage=18&since=&till=&withoutStream=true',
    {
      headers: {
        accept: 'application/vnd.tootoot.v2+json',
        'accept-language': 'sk',
        location: '17.1544;48.2173',
        'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        sessionid: '60e9b503b3463713f4b6c5f4',
        tootootbuilddate: '2023-03-27T11:43:19.803Z',
      },
      referrer: 'https://tootoot.fm/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
    },
  )
}
