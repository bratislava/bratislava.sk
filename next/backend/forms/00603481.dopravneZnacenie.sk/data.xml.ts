export default `<?xml version="1.0" encoding="utf-8"?>
<E-form xmlns="http://schemas.gov.sk/doc/eform/00603481.dopravneZnacenie.sk/0.2"
        xsi:schemaLocation="http://schemas.gov.sk/doc/eform/00603481.dopravneZnacenie.sk/0.2"
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
  <Body>
    <ZoznamPriloh>
      <ProjektOrganizacieDopravy>
        <Nazov>POD.pdf</Nazov>
        <Prilozena>true</Prilozena>
      </ProjektOrganizacieDopravy>
      <ZavazneStanoviskoKrajskehoDopravnehoInspektoratu>
        <Nazov>KDI.pdf</Nazov>
        <Prilozena>true</Prilozena>
      </ZavazneStanoviskoKrajskehoDopravnehoInspektoratu>
      <StanoviskaSpravcovCiest>
        <Nazov>Ruzinov.pdf</Nazov>
        <Prilozena>true</Prilozena>
      </StanoviskaSpravcovCiest>
      <StanoviskaSpravcovCiest>
        <Nazov>NoveMesto.pdf</Nazov>
        <Prilozena>true</Prilozena>
      </StanoviskaSpravcovCiest>
      <VyhradenehoParkovanieVztahKPrevadzke>
        <Nazov>NajomnaZmluva.pdf</Nazov>
        <Prilozena>true</Prilozena>
      </VyhradenehoParkovanieVztahKPrevadzke>
      <SplnomocnenieNaZastupovanie>
        <Nazov>splnomocnenie.pdf</Nazov>
        <Prilozena>true</Prilozena>
      </SplnomocnenieNaZastupovanie>
    </ZoznamPriloh>
    <Ziadatel>
      <VoSvojomMene>true</VoSvojomMene>
      <TypOsoby>
        <Code>1</Code>
        <Name>Fyzická osoba</Name>
        <WsEnumCode>UPVSIAM_001</WsEnumCode>
      </TypOsoby>
      <Kontakt>
        <TelefonneCislo>
          <MedzinarodneVolacieCislo>+421</MedzinarodneVolacieCislo>
          <Predvolba>904</Predvolba>
          <Cislo>123456</Cislo>
        </TelefonneCislo>
        <Email>hruska@example.com</Email>
        <KontaktnaOsoba>
          <Meno>Janko</Meno>
          <Priezvisko>Hruška</Priezvisko>
        </KontaktnaOsoba>
      </Kontakt>
      <Adresa>
        <Meno>Janko</Meno>
        <Priezvisko>Hruška</Priezvisko>
        <UlicaACislo>
          <Ulica>Hlboká cesta</Ulica>
          <SupisneCislo>970</SupisneCislo>
          <OrientacneCislo>5</OrientacneCislo>
        </UlicaACislo>
        <PSC>81104</PSC>
        <Obec>
          <Code>SK0101528595</Code>
          <Name>Bratislava - mestská časť Staré Mesto</Name>
          <WsEnumCode>SUSR_0025</WsEnumCode>
        </Obec>
        <Stat>
          <Code>703</Code>
          <Name>Slovenská republika</Name>
          <WsEnumCode>SUSR_0086</WsEnumCode>
        </Stat>
      </Adresa>
    </Ziadatel>
    <DopravneZnacenie>
      <NazvyUlic>Hlboká cesta</NazvyUlic>
      <DovodZmenyVDopravnomZnaceni>VyhradeneParkovanie</DovodZmenyVDopravnomZnaceni>
      <VyhradeneParkovanie>
        <Typ>Nove</Typ>
        <PocetParkovacichMiest>2</PocetParkovacichMiest>
        <UzivanaPlochaJednehoMiestaDlzka>6.0</UzivanaPlochaJednehoMiestaDlzka>
        <UzivanaPlochaJednehoMiestaSirka>2.8</UzivanaPlochaJednehoMiestaSirka>
        <TerminVyhradeniaMiestaOd>2022-01-01</TerminVyhradeniaMiestaOd>
        <TerminVyhradeniaMiestaDo>2023-01-01</TerminVyhradeniaMiestaDo>
      </VyhradeneParkovanie>
      <TrvacnostDopravnehoZnacenia>Docasne</TrvacnostDopravnehoZnacenia>
      <DatumUmiestneniaDopravnehoZnacenia>2022-01-01</DatumUmiestneniaDopravnehoZnacenia>
      <DatumOdstraneniaDopravnehoZnacenia>2023-01-01</DatumOdstraneniaDopravnehoZnacenia>
    </DopravneZnacenie>
    <Uzavierka>
      <Typ>Ciastocna</Typ>
      <SirkaVolnehoJazdnehoPruhu>5</SirkaVolnehoJazdnehoPruhu>
      <UliceOd>Robotnicka ulica</UliceOd>
      <UliceDo>Kvetinova ulica</UliceDo>
      <DlzkaVMetroch>50</DlzkaVMetroch>
      <SirkaVMetroch>10</SirkaVMetroch>
      <DatumACasOd>2022-01-01T05:00:00</DatumACasOd>
      <DatumACasDo>2022-05-01T17:00:00</DatumACasDo>
      <Popis>Bude uzatvorena cesta</Popis>
    </Uzavierka>
    <KontaktnaOsobaRovnakaAkoZiadatel>false</KontaktnaOsobaRovnakaAkoZiadatel>
    <KontaktnaOsoba>
      <TelefonneCislo>
        <MedzinarodneVolacieCislo>+421</MedzinarodneVolacieCislo>
        <Predvolba>905</Predvolba>
        <Cislo>987654</Cislo>
      </TelefonneCislo>
      <Email>jozefina.hruskova@example.com</Email>
      <KontaktnaOsoba>
        <Meno>Jozefina</Meno>
        <Priezvisko>Hrušková</Priezvisko>
      </KontaktnaOsoba>
    </KontaktnaOsoba>
    <ZodpovednyProjektant>
      <ObchodneMeno>Kutyil, s.r.o.</ObchodneMeno>
      <ICO>12345678</ICO>
      <Kontakt>
        <TelefonneCislo>
          <MedzinarodneVolacieCislo>+421</MedzinarodneVolacieCislo>
          <Predvolba>905</Predvolba>
          <Cislo>246135</Cislo>
        </TelefonneCislo>
        <Email>lazslo@example.com</Email>
        <KontaktnaOsoba>
          <Meno>László</Meno>
          <Priezvisko>Komárom</Priezvisko>
        </KontaktnaOsoba>
      </Kontakt>
    </ZodpovednyProjektant>
    <Dorucenie>
      <AdresatPodania>
        <AdresatPodania>Mesto</AdresatPodania>
      </AdresatPodania>
      <Checkbox>
        <Notifikacia>true</Notifikacia>
      </Checkbox>
      <FormaOdoslaniaZiadosti>Elektronicky</FormaOdoslaniaZiadosti>
      <FormaDoruceniaRozhodnutia>
        <TypSposobuDorucenia>Pošta</TypSposobuDorucenia>
        <AdresaDoruceniaRozhodnutia>
          <Meno>Janko</Meno>
          <Priezvisko>Hruška</Priezvisko>
          <UlicaACislo>
            <Ulica>Hlboká cesta</Ulica>
            <SupisneCislo>970</SupisneCislo>
          </UlicaACislo>
          <PSC>81104</PSC>
          <Obec>
            <Code>SK0101528595</Code>
            <Name>Bratislava - mestská časť Staré Mesto</Name>
            <WsEnumCode>SUSR_0025</WsEnumCode>
          </Obec>
          <Stat>
            <Code>703</Code>
            <Name>Slovenská republika</Name>
            <WsEnumCode>SUSR_0086</WsEnumCode>
          </Stat>
        </AdresaDoruceniaRozhodnutia>
      </FormaDoruceniaRozhodnutia>
    </Dorucenie>
    <ZakladneVyhlasenie>
      <SpravnostUdajovText>Všeobecné informácie o poskytnutí, spracovaní a ochrane osobných údajov nájdete na
        https://esluzby.bratislava.sk/page/ochrana-osobnych-udajov
      </SpravnostUdajovText>
      <SuhlasSoSpracovanimText>Týmto dávam na základe slobodnej vôle súhlas na spracovanie mojich osobných údajov
        uvedených vo formulári tohto podania a získaných z môjho osobného dokladu za v zmysle Nariadenia európskeho
        parlamentu a rady EÚ 2016/679 o ochrane fyzických osôb pri spracúvaní osobných údajov a o voľnom pohybe takýchto
        údajov a zákona č. 18/2018 Z.z. o ochrane osobných údajov a o zmene a doplnení niektorých zákonov. Zároveň
        potvrdzujem dovŕšenie veku 16 rokov pre potreby spracovania osobných údajov. Osobné údaje poskytujem za účelom
        spracovania mojej žiadosti.
      </SuhlasSoSpracovanimText>
      <PoskytujemSuhlas>true</PoskytujemSuhlas>
      <PoskytujemSuhlasText>Poskytujem súhlas na spracovanie osobných údajov</PoskytujemSuhlasText>
      <NeposkytujemSuhlas>false</NeposkytujemSuhlas>
      <NeposkytujemSuhlasText>Neposkytujem súhlas na spracovanie osobných údajov</NeposkytujemSuhlasText>
    </ZakladneVyhlasenie>
  </Body>
</E-form>`
