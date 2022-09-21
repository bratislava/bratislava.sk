import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import Ajv from 'ajv'
import * as cheerio from 'cheerio'
import xml2js from 'xml2js'
import addFormats from 'ajv-formats'
import { buildXmlRecursive, removeNeedlessXmlTransformArraysRecursive } from '@utils/forms'

// TODO remove this file

type Json = string | number | boolean | null | { [property: string]: Json } | Json[]

const dummySchema = {
  type: 'object',
  required: ['age'],
  properties: {
    firstName: {
      type: 'string',
      minLength: 2,
      maxLength: 20,
    },
    lastName: {
      type: 'string',
      minLength: 5,
      maxLength: 15,
    },
    age: {
      type: 'integer',
      minimum: 18,
      maximum: 100,
    },
    gender: {
      type: 'string',
      enum: ['Male', 'Female', 'Undisclosed'],
    },
    height: {
      type: 'number',
    },
    dateOfBirth: {
      type: 'string',
      format: 'date',
    },
    rating: {
      type: 'integer',
    },
    committer: {
      type: 'boolean',
    },
    address: {
      type: 'object',
      properties: {
        street: {
          type: 'string',
        },
        streetnumber: {
          type: 'string',
        },
        postalCode: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
      },
    },
  },
}

const dummy = {
  'E-form': {
    Meta: {
      ID: '00603481.dopravneZnacenie.sk',
      Name: 'Dopravné značenie',
      Gestor: '',
      RecipientId: '',
      Version: '0.2',
      ZepRequired: 'false',
      EformUuid: '5ea0cad2-8759-4826-8d4c-c59c1d09ec29',
      SenderID: 'mailto:hruska@example.com',
    },
    Body: {
      ZoznamPriloh: {
        ProjektOrganizacieDopravy: {
          Nazov: 'POD.pdf',
          Prilozena: 'true',
        },
        ZavazneStanoviskoKrajskehoDopravnehoInspektoratu: {
          Nazov: 'KDI.pdf',
          Prilozena: 'true',
        },
        StanoviskaSpravcovCiest: [
          {
            Nazov: 'Ruzinov.pdf',
            Prilozena: 'true',
          },
          {
            Nazov: 'NoveMesto.pdf',
            Prilozena: 'true',
          },
        ],
        VyhradenehoParkovanieVztahKPrevadzke: {
          Nazov: 'NajomnaZmluva.pdf',
          Prilozena: 'true',
        },
        SplnomocnenieNaZastupovanie: {
          Nazov: 'splnomocnenie.pdf',
          Prilozena: 'true',
        },
      },
      Ziadatel: {
        VoSvojomMene: 'true',
        TypOsoby: {
          Code: '1',
          Name: 'Fyzická osoba',
          WsEnumCode: 'UPVSIAM_001',
        },
        Kontakt: {
          TelefonneCislo: {
            MedzinarodneVolacieCislo: '+421',
            Predvolba: '904',
            Cislo: '123456',
          },
          Email: 'hruska@example.com',
          KontaktnaOsoba: {
            Meno: 'Janko',
            Priezvisko: 'Hruška',
          },
        },
        Adresa: {
          Meno: 'Janko',
          Priezvisko: 'Hruška',
          UlicaACislo: {
            Ulica: 'Hlboká cesta',
            SupisneCislo: '970',
            OrientacneCislo: '5',
          },
          PSC: '81104',
          Obec: {
            Code: 'SK0101528595',
            Name: 'Bratislava - mestská časť Staré Mesto',
            WsEnumCode: 'SUSR_0025',
          },
          Stat: {
            Code: '703',
            Name: 'Slovenská republika',
            WsEnumCode: 'SUSR_0086',
          },
        },
      },
      DopravneZnacenie: {
        NazvyUlic: 'Hlboká cesta',
        DovodZmenyVDopravnomZnaceni: 'VyhradeneParkovanie',
        VyhradeneParkovanie: {
          Typ: 'Nove',
          PocetParkovacichMiest: '2',
          UzivanaPlochaJednehoMiestaDlzka: '6.0',
          UzivanaPlochaJednehoMiestaSirka: '2.8',
          TerminVyhradeniaMiestaOd: '2022-01-01',
          TerminVyhradeniaMiestaDo: '2023-01-01',
        },
        TrvacnostDopravnehoZnacenia: 'Docasne',
        DatumUmiestneniaDopravnehoZnacenia: '2022-01-01',
        DatumOdstraneniaDopravnehoZnacenia: '2023-01-01',
      },
      Uzavierka: {
        Typ: 'Ciastocna',
        SirkaVolnehoJazdnehoPruhu: '5',
        UliceOd: 'Robotnicka ulica',
        UliceDo: 'Kvetinova ulica',
        DlzkaVMetroch: '50',
        SirkaVMetroch: '10',
        DatumACasOd: '2022-01-01T05:00:00',
        DatumACasDo: '2022-05-01T17:00:00',
        Popis: 'Bude uzatvorena cesta',
      },
      KontaktnaOsobaRovnakaAkoZiadatel: 'false',
      KontaktnaOsoba: {
        TelefonneCislo: {
          MedzinarodneVolacieCislo: '+421',
          Predvolba: '905',
          Cislo: '987654',
        },
        Email: 'jozefina.hruskova@example.com',
        KontaktnaOsoba: {
          Meno: 'Jozefina',
          Priezvisko: 'Hrušková',
        },
      },
      ZodpovednyProjektant: {
        ObchodneMeno: 'Kutyil, s.r.o.',
        ICO: '12345678',
        Kontakt: {
          TelefonneCislo: {
            MedzinarodneVolacieCislo: '+421',
            Predvolba: '905',
            Cislo: '246135',
          },
          Email: 'lazslo@example.com',
          KontaktnaOsoba: {
            Meno: 'László',
            Priezvisko: 'Komárom',
          },
        },
      },
      Dorucenie: {
        AdresatPodania: {
          AdresatPodania: 'Mesto',
        },
        Checkbox: {
          Notifikacia: 'true',
        },
        FormaOdoslaniaZiadosti: 'Elektronicky',
        FormaDoruceniaRozhodnutia: {
          TypSposobuDorucenia: 'Pošta',
          AdresaDoruceniaRozhodnutia: {
            Meno: 'Janko',
            Priezvisko: 'Hruška',
            UlicaACislo: {
              Ulica: 'Hlboká cesta',
              SupisneCislo: '970',
            },
            PSC: '81104',
            Obec: {
              Code: 'SK0101528595',
              Name: 'Bratislava - mestská časť Staré Mesto',
              WsEnumCode: 'SUSR_0025',
            },
            Stat: {
              Code: '703',
              Name: 'Slovenská republika',
              WsEnumCode: 'SUSR_0086',
            },
          },
        },
      },
      ZakladneVyhlasenie: {
        SpravnostUdajovText:
          'Všeobecné informácie o poskytnutí, spracovaní a ochrane osobných údajov nájdete na\n        https://esluzby.bratislava.sk/page/ochrana-osobnych-udajov',
        SuhlasSoSpracovanimText:
          'Týmto dávam na základe slobodnej vôle súhlas na spracovanie mojich osobných údajov\n        uvedených vo formulári tohto podania a získaných z môjho osobného dokladu za v zmysle Nariadenia európskeho\n        parlamentu a rady EÚ 2016/679 o ochrane fyzických osôb pri spracúvaní osobných údajov a o voľnom pohybe takýchto\n        údajov a zákona č. 18/2018 Z.z. o ochrane osobných údajov a o zmene a doplnení niektorých zákonov. Zároveň\n        potvrdzujem dovŕšenie veku 16 rokov pre potreby spracovania osobných údajov. Osobné údaje poskytujem za účelom\n        spracovania mojej žiadosti.',
        PoskytujemSuhlas: 'true',
        PoskytujemSuhlasText: 'Poskytujem súhlas na spracovanie osobných údajov',
        NeposkytujemSuhlas: 'false',
        NeposkytujemSuhlasText: 'Neposkytujem súhlas na spracovanie osobných údajov',
      },
    },
    _xmlns: 'http://schemas.gov.sk/doc/eform/00603481.dopravneZnacenie.sk/0.2',
    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    '_xsi:schemaLocation': 'http://schemas.gov.sk/doc/eform/00603481.dopravneZnacenie.sk/0.2',
  },
}

const dummyXml = `
<?xml version="1.0" encoding="utf-8"?>
<E-form xmlns="http://schemas.gov.sk/doc/eform/00603481.dopravneZnacenie.sk/0.2" xsi:schemaLocation="http://schemas.gov.sk/doc/eform/00603481.dopravneZnacenie.sk/0.2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Meta>
    <ID>00603481.dopravneZnacenie.sk</ID>
    <Name>Dopravné značenie</Name>
    <Gestor></Gestor>
    <RecipientId></RecipientId>
    <Version>0.2</Version>
    <ZepRequired>false</ZepRequired>
    <EformUuid>5ea0cad2-8759-4826-8d4c-c59c1d09ec29</EformUuid>
    <SenderID>mailto:hruska@example.com</SenderID>
  </Meta>
</E-form>
`

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = {
    firstName: 'Max',
    lastName: 'Power',
    age: 20,
    address: {
      street: 'hey',
      city: 'ho',
    },
  }

  // json -> xml, loads into a prepped xml body
  const $ = cheerio.load(dummyXml, { xmlMode: true })
  buildXmlRecursive(['E-form', 'Body'], $, data)
  console.log($.html())

  console.log('--------')
  // xml Body part -> json
  const xmlString = `<wrapper>${$('E-form Body').html()}</wrapper>`
  const obj = (await xml2js.parseStringPromise(xmlString))['wrapper']
  removeNeedlessXmlTransformArraysRecursive(obj, [], dummySchema)
  console.log('--------')
  // validate according to AJv based on schema.json

  const ajv = new Ajv()
  addFormats(ajv)
  const validate = ajv.compile(dummySchema)
  console.log(validate(obj))
  console.log(validate.errors)

  // const json = await xml2js.parseStringPromise($.html())

  // console.log(json)

  // console.dir(await parseXml(), { depth: 10 })

  // console.log(getNodeAtPath(dummySchema, ['address']))

  // res.write($.html())
  // res.setHeader('Content-Type', 'text/xml')
  // res.setHeader('Content-Disposition', 'attachment; filename=test.xml')
  // res.send($.html())
  res.end()
  // browse
  // const dataPath = path.join(__dirname, '..', '..', '..', 'forms', forceString(ctx.query.eform), 'data.xml')
  // return res.json(data)
}

export default withSentry(handler)
