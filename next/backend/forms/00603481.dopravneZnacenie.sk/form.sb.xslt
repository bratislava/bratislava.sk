<?xml version="1.0" encoding="utf-8" standalone="yes"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:z="http://schemas.gov.sk/doc/eform/00603481.dopravneZnacenie.sk/0.2">
  <xsl:output method="text" encoding="utf-8" indent="no" />
  <xsl:preserve-space elements="*" />

  <xsl:template match="/z:E-form">
    <xsl:call-template name="base_eform" />
  </xsl:template>

  <!-- this is the template which gets called inside the FO structure -->
  <xsl:template name="body">
    <xsl:call-template name="base_block_with_title">
      <xsl:with-param name="template_name" select="'zoznam_priloh'" />
      <xsl:with-param name="title" select="'Zoznam príloh'" />
      <xsl:with-param name="values" select="z:Body/z:ZoznamPriloh" />
    </xsl:call-template>

    <xsl:call-template name="base_block_with_title">
      <xsl:with-param name="template_name" select="'dopravne_znacenie'" />
      <xsl:with-param name="title" select="'Dopravné značenie'" />
      <xsl:with-param name="values" select="z:Body/z:DopravneZnacenie" />
    </xsl:call-template>

    <xsl:call-template name="base_block_with_title">
      <xsl:with-param name="template_name" select="'uzavierka'" />
      <xsl:with-param name="title" select="'Uzávierka'" />
      <xsl:with-param name="values" select="z:Body/z:Uzavierka" />
    </xsl:call-template>

    <xsl:call-template name="base_block_with_title">
      <xsl:with-param name="template_name" select="'ziadatel'" />
      <xsl:with-param name="title" select="'Žiadateľ'" />
      <xsl:with-param name="values" select="z:Body/z:Ziadatel" />
    </xsl:call-template>

    <xsl:call-template name="base_block_with_title">
      <xsl:with-param name="template_name" select="'kontaktna_osoba'" />
      <xsl:with-param name="title" select="'Kontaktná osoba'" />
      <xsl:with-param name="values" select="z:Body" />
    </xsl:call-template>

    <xsl:call-template name="base_block_with_title">
      <xsl:with-param name="template_name" select="'zodpovedny_projektant'" />
      <xsl:with-param name="title" select="'Zodpovedný projektant'" />
      <xsl:with-param name="values" select="z:Body/z:ZodpovednyProjektant" />
    </xsl:call-template>

    <xsl:call-template name="base_block_with_title">
      <xsl:with-param name="template_name" select="'dorucenie'" />
      <xsl:with-param name="title" select="'Doručenie'" />
      <xsl:with-param name="values" select="z:Body/z:Dorucenie" />
    </xsl:call-template>

    <xsl:call-template name="base_block_with_title">
      <xsl:with-param name="template_name" select="'zakladne_vyhlasenie'" />
      <xsl:with-param name="title" select="'Vyhlásenie'" />
      <xsl:with-param name="values" select="z:Body/z:ZakladneVyhlasenie" />
    </xsl:call-template>
  </xsl:template>

  <!-- XSL cannot dynamically "yield" template, so here is simple mapping for each template based on name -->
  <!-- TODO better way to do this? -->
  <xsl:template name="map">
    <xsl:param name="template"/>
    <xsl:param name="values" />

    <xsl:choose>
      <xsl:when test="$template = 'zoznam_priloh'">
        <xsl:call-template name="zoznam_priloh">
          <xsl:with-param name="values" select="$values" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$template = 'dopravne_znacenie'">
        <xsl:call-template name="dopravne_znacenie">
          <xsl:with-param name="values" select="$values" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$template = 'uzavierka'">
        <xsl:call-template name="uzavierka">
          <xsl:with-param name="values" select="$values" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$template = 'ziadatel'">
        <xsl:call-template name="ziadatel">
          <xsl:with-param name="values" select="$values" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$template = 'kontakt'">
        <xsl:call-template name="kontakt">
          <xsl:with-param name="values" select="$values" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$template = 'adresa'">
        <xsl:call-template name="adresa">
          <xsl:with-param name="values" select="$values" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$template = 'kontaktna_osoba'">
        <xsl:call-template name="kontaktna_osoba">
          <xsl:with-param name="values" select="$values" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$template = 'zodpovedny_projektant'">
        <xsl:call-template name="zodpovedny_projektant">
          <xsl:with-param name="values" select="$values" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$template = 'dorucenie'">
        <xsl:call-template name="dorucenie">
          <xsl:with-param name="values" select="$values" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$template = 'adresat_podania'">
        <xsl:call-template name="adresat_podania">
          <xsl:with-param name="values" select="$values" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$template = 'format_dorucenia_odpovede'">
        <xsl:call-template name="format_dorucenia_odpovede">
          <xsl:with-param name="values" select="$values" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$template = 'zakladne_vyhlasenie'">
        <xsl:call-template name="zakladne_vyhlasenie">
          <xsl:with-param name="values" select="$values" />
        </xsl:call-template>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="zoznam_priloh">
    <xsl:param name="values"/>

    <xsl:for-each select="$values/z:ProjektOrganizacieDopravy">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Projekt organizácie dopravy'" />
        <xsl:with-param name="node" select="z:Nazov" />
      </xsl:call-template>
    </xsl:for-each>
    <xsl:for-each select="$values/z:ZavazneStanoviskoKrajskehoDopravnehoInspektoratu">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Záväzné stanovisko KDI'" />
        <xsl:with-param name="node" select="z:Nazov" />
      </xsl:call-template>
    </xsl:for-each>
    <xsl:for-each select="$values/z:SituaciaSirsichVztahov">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Situácia širších vzťahov'" />
        <xsl:with-param name="node" select="z:Nazov" />
      </xsl:call-template>
    </xsl:for-each>
    <xsl:for-each select="$values/z:StanoviskaSpravcovCiest">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Stanoviská správcov ciest'" />
        <xsl:with-param name="node" select="z:Nazov" />
      </xsl:call-template>
    </xsl:for-each>
    <xsl:for-each select="$values/z:KopiaPovoleniaStavebnehoUradu">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Kópia povolenia stavebného úradu'" />
        <xsl:with-param name="node" select="z:Nazov" />
      </xsl:call-template>
    </xsl:for-each>
    <xsl:for-each select="$values/z:StanoviskoDopravnehoPodnikuBratislava">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Stanovisko Dopravného podniku Bratislava'" />
        <xsl:with-param name="node" select="z:Nazov" />
      </xsl:call-template>
    </xsl:for-each>
    <xsl:for-each select="$values/z:VyhradenehoParkovanieVztahKPrevadzke">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Vzťah k prevádzke'" />
        <xsl:with-param name="node" select="z:Nazov" />
      </xsl:call-template>
    </xsl:for-each>
    <xsl:for-each select="$values/z:VyhradenehoParkovaniePreukazTZP">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Preukaz TŽP'" />
        <xsl:with-param name="node" select="z:Nazov" />
      </xsl:call-template>
    </xsl:for-each>
    <xsl:for-each select="$values/z:SplnomocnenieNaZastupovanie">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Splnomocnenie na zastupovanie'" />
        <xsl:with-param name="node" select="z:Nazov" />
      </xsl:call-template>
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="uzavierka">
    <xsl:param name="values" />

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'Typ uzávierky'" />
      <xsl:with-param name="node">
        <xsl:if test="$values/z:Typ = 'Ciastocna'">
          <xsl:text>Čiastočná</xsl:text>
        </xsl:if>
        <xsl:if test="$values/z:Typ = 'Uplna'">
          <xsl:text>Úplná</xsl:text>
        </xsl:if>
      </xsl:with-param>
    </xsl:call-template>

    <xsl:if test="$values/z:SirkaVolnehoJazdnehoPruhu">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Šírka voľného jazdného pruhu'" />
        <xsl:with-param name="node" select="$values/z:SirkaVolnehoJazdnehoPruhu" />
      </xsl:call-template>
    </xsl:if>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'Ulice od'" />
      <xsl:with-param name="node" select="$values/z:UliceOd" />
    </xsl:call-template>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'Ulice do'" />
      <xsl:with-param name="node" select="$values/z:UliceDo" />
    </xsl:call-template>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'Dĺžka v metroch'" />
      <xsl:with-param name="node" select="$values/z:DlzkaVMetroch" />
    </xsl:call-template>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'Šírka v metroch'" />
      <xsl:with-param name="node" select="$values/z:SirkaVMetroch" />
    </xsl:call-template>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'Dátum začiatku uzávierky'" />
      <xsl:with-param name="node">
        <xsl:call-template name="base_format_datetime">
          <xsl:with-param name="dateTime" select="$values/z:DatumACasOd" />
        </xsl:call-template>
      </xsl:with-param>
    </xsl:call-template>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'Dátum ukončenia uzávierky'" />
      <xsl:with-param name="node">
        <xsl:call-template name="base_format_datetime">
          <xsl:with-param name="dateTime" select="$values/z:DatumACasDo" />
        </xsl:call-template>
      </xsl:with-param>
    </xsl:call-template>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'Presný popis'" />
      <xsl:with-param name="node" select="$values/z:Popis" />
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="zakladne_vyhlasenie">
    <xsl:param name="values" />

    <xsl:call-template name="base_labeled_textarea">
      <xsl:with-param name="text" select="$values/*[local-name() = 'SpravnostUdajovText']" />
      <xsl:with-param name="node" select="$values/*[local-name() = 'SuhlasSoSpracovanimText']" />
    </xsl:call-template>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="$values/*[local-name() = 'PoskytujemSuhlasText']" />
      <xsl:with-param name="node">
        <xsl:call-template name="base_boolean">
          <xsl:with-param name="bool" select="$values/*[local-name() = 'PoskytujemSuhlas']" />
        </xsl:call-template>
      </xsl:with-param>
    </xsl:call-template>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="$values/*[local-name() = 'NeposkytujemSuhlasText']" />
      <xsl:with-param name="node">
        <xsl:call-template name="base_boolean">
          <xsl:with-param name="bool" select="$values/*[local-name() = 'NeposkytujemSuhlas']" />
        </xsl:call-template>
      </xsl:with-param>
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="zodpovedny_projektant">
    <xsl:param name="values" />

    <xsl:for-each select="$values">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Obchodné meno'" />
        <xsl:with-param name="node" select="./*[local-name() = 'ObchodneMeno']" />
      </xsl:call-template>

      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'IČO'" />
        <xsl:with-param name="node" select="./*[local-name() = 'ICO']" />
      </xsl:call-template>

      <xsl:call-template name="kontakt">
        <xsl:with-param name="values" select="$values/z:Kontakt" />
      </xsl:call-template>
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="dorucenie">
    <xsl:param name="values" />

    <xsl:call-template name="base_block_with_title">
      <xsl:with-param name="title" select="'Adresát podania'" />
      <xsl:with-param name="template_name" select="'adresat_podania'" />
      <xsl:with-param name="values" select="$values/*[local-name() = 'AdresatPodania']" />
    </xsl:call-template>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'Žiadam o zasielanie notifikácii zo spracovania podania'"></xsl:with-param>
      <xsl:with-param name="node">
        <xsl:call-template name="base_boolean">
          <xsl:with-param name="bool" select="$values/*[local-name() = 'Checkbox']/*[local-name() = 'Notifikacia']" />
        </xsl:call-template>
      </xsl:with-param>
    </xsl:call-template>

    <xsl:if test="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']">
      <xsl:call-template name="base_block_with_title">
        <xsl:with-param name="title" select="'Doručenie odpovede'" />
        <xsl:with-param name="template_name" select="'format_dorucenia_odpovede'" />
        <xsl:with-param name="values" select="$values" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template name="format_dorucenia_odpovede">
    <xsl:param name="values" />

    <xsl:if test="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']/*[local-name() = 'TypSposobuDorucenia'] = 'Pošta'">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Forma doručenia odpovede'"/>
        <xsl:with-param name="node" select="'Pošta'"/>
      </xsl:call-template>

      <xsl:call-template name="adresa">
        <xsl:with-param name="values" select="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']/*[local-name() = 'AdresaDoruceniaRozhodnutia']" />
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']/*[local-name() = 'TypSposobuDorucenia'] = 'Elektronická schránka'">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Forma doručenia odpovede'"/>
        <xsl:with-param name="node" select="'Elektronická schránka (eDesk)'"/>
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']/*[local-name() = 'TypSposobuDorucenia'] = 'Osobne'">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Forma doručenia odpovede'"/>
        <xsl:with-param name="node" select="'Osobne'"/>
      </xsl:call-template>

      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Miesto osobného vyzdvihnutia odpovede'"></xsl:with-param>
        <xsl:with-param name="node" select="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']/*[local-name() = 'AdresatPodania']"/>
      </xsl:call-template>

      <xsl:if test="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']/*[local-name() = 'AdresatPodania'] = 'Mestská časť'">
        <xsl:call-template name="base_labeled_field">
          <xsl:with-param name="text" select="'Mestská časť'"></xsl:with-param>
          <xsl:with-param name="node" select="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']/*[local-name() = 'MestskaCast']"/>
        </xsl:call-template>
      </xsl:if>
    </xsl:if>

    <xsl:if test="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']/*[local-name() = 'TypSposobuDorucenia'] = 'Fax'">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Forma doručenia odpovede'"/>
        <xsl:with-param name="node" select="'Fax'"/>
      </xsl:call-template>

      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Fax'"/>
        <xsl:with-param name="node">
          <xsl:call-template name="base_format_telefonne_cislo">
            <xsl:with-param name="node" select="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']/*[local-name() = 'FaxPreDorucenie']" />
          </xsl:call-template>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']/*[local-name() = 'TypSposobuDorucenia'] = 'Telefonicky'">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Forma doručenia odpovede'"/>
        <xsl:with-param name="node" select="'Telefonicky'"/>
      </xsl:call-template>

      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Telefónne číslo / mobil'"/>
        <xsl:with-param name="node">
          <xsl:call-template name="base_format_telefonne_cislo">
            <xsl:with-param name="node" select="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']/*[local-name() = 'TelefonPreDorucenie']" />
          </xsl:call-template>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']/*[local-name() = 'TypSposobuDorucenia'] = 'E-mail'">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Forma doručenia odpovede'"/>
        <xsl:with-param name="node" select="'E-mail'"/>
      </xsl:call-template>

      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'E-mail'"/>
        <xsl:with-param name="node" select="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']/*[local-name() = 'EmailPreDorucenie']"/>
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$values/*[local-name() = 'FormaDoruceniaRozhodnutia']/*[local-name() = 'TypSposobuDorucenia'] = 'Bez odpovede'">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Forma doručenia odpovede'"/>
        <xsl:with-param name="node" select="'Bez odpovede'"/>
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template name="adresat_podania">
    <xsl:param name="values" />

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'Adresát podania'" />
      <xsl:with-param name="node">
        <xsl:if test="$values/*[local-name() = 'AdresatPodania'] = 'Mesto'">
          <xsl:text>Mesto</xsl:text>
        </xsl:if>
        <xsl:if test="$values/*[local-name() = 'AdresatPodania'] != 'Mesto'">
          <xsl:text>Mestská časť</xsl:text>
        </xsl:if>
      </xsl:with-param>
    </xsl:call-template>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'Mestská časť'" />
      <xsl:with-param name="node" select="$values/*[local-name() = 'MestskaCast']/*[local-name() = 'Name']" />
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="kontaktna_osoba">
    <xsl:param name="values" />

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'Rovnaká ako žiadateľ'" />
      <xsl:with-param name="node">
        <xsl:call-template name="base_boolean">
          <xsl:with-param name="bool" select="$values/z:KontaktnaOsobaRovnakaAkoZiadatel" />
        </xsl:call-template>
      </xsl:with-param>
    </xsl:call-template>

    <xsl:if test="$values/z:KontaktnaOsobaRovnakaAkoZiadatel = 'false'">
      <xsl:call-template name="kontakt">
        <xsl:with-param name="values" select="$values/z:KontaktnaOsoba" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template name="dopravne_znacenie">
    <xsl:param name="values" />

    <xsl:for-each select="$values">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text">Názvy ulíc</xsl:with-param>
        <xsl:with-param name="node" select="./*[local-name() = 'NazvyUlic']" />
      </xsl:call-template>

      <xsl:if test="(./*[local-name() = 'DovodZmenyVDopravnomZnaceni'] = 'RozkopavkovePrace')">
        <xsl:call-template name="base_labeled_field">
          <xsl:with-param name="text" select="'Dôvod zmeny'" />
          <xsl:with-param name="node" select="'Rozkopávkové práce'" />
        </xsl:call-template>
      </xsl:if>
      <xsl:if test="(./*[local-name() = 'DovodZmenyVDopravnomZnaceni'] = 'StavebnePrace')">
        <xsl:call-template name="base_labeled_field">
          <xsl:with-param name="text" select="'Dôvod zmeny'" />
          <xsl:with-param name="node" select="'Stavebné práce'" />
        </xsl:call-template>

        <xsl:call-template name="base_labeled_field">
          <xsl:with-param name="text" select="'Názov stavby'" />
          <xsl:with-param name="node" select="./*[local-name() = 'NazovStavby']" />
        </xsl:call-template>
      </xsl:if>
      <xsl:if test="(./*[local-name() = 'DovodZmenyVDopravnomZnaceni'] = 'KulturneAleboSportovePodujatia')">
        <xsl:call-template name="base_labeled_field">
          <xsl:with-param name="text" select="'Dôvod zmeny'" />
          <xsl:with-param name="node" select="'Kultúrne alebo športové podujatie'" />
        </xsl:call-template>

        <xsl:call-template name="base_labeled_field">
          <xsl:with-param name="text" select="'Názov podujatia'" />
          <xsl:with-param name="node" select="./*[local-name() = 'NazovPodujatia']" />
        </xsl:call-template>
      </xsl:if>
      <xsl:if test="(./*[local-name() = 'DovodZmenyVDopravnomZnaceni'] = 'VyhradeneParkovanie')">
        <xsl:call-template name="base_labeled_field">
          <xsl:with-param name="text" select="'Dôvod zmeny'" />
          <xsl:with-param name="node" select="'Vyhradené parkovanie'" />
        </xsl:call-template>

        <xsl:call-template name="vyhradene_parkovanie">
          <xsl:with-param name="node" select="./*[local-name() = 'VyhradeneParkovanie']" />
        </xsl:call-template>
      </xsl:if>

      <xsl:if test="(./*[local-name() = 'DovodZmenyVDopravnomZnaceni'] = 'Ine')">
        <xsl:call-template name="base_labeled_field">
          <xsl:with-param name="text" select="'Dôvod zmeny'" />
          <xsl:with-param name="node" select="./*[local-name() = 'IneOdpoved']" />
        </xsl:call-template>
      </xsl:if>

      <xsl:if test="(./*[local-name() = 'TrvacnostDopravnehoZnacenia'] = 'Trvale')">
        <xsl:call-template name="base_labeled_field">
          <xsl:with-param name="text" select="'Typ dopravného značenia'" />
          <xsl:with-param name="node" select="'trvalé'" />
        </xsl:call-template>
      </xsl:if>
      <xsl:if test="(./*[local-name() = 'TrvacnostDopravnehoZnacenia'] = 'Docasne')">
        <xsl:call-template name="base_labeled_field">
          <xsl:with-param name="text" select="'Typ dopravného značenia'" />
          <xsl:with-param name="node" select="'dočasné'" />
        </xsl:call-template>

        <xsl:call-template name="base_labeled_field">
          <xsl:with-param name="text" select="'Dátum umiestnenia'" />
          <xsl:with-param name="node">
            <xsl:call-template name="base_format_date">
              <xsl:with-param name="instr" select="./*[local-name() = 'DatumUmiestneniaDopravnehoZnacenia']"/>
            </xsl:call-template>
          </xsl:with-param>
        </xsl:call-template>

        <xsl:call-template name="base_labeled_field">
          <xsl:with-param name="text" select="'Dátum odstránenia'" />
          <xsl:with-param name="node">
            <xsl:call-template name="base_format_date">
              <xsl:with-param name="instr" select="./*[local-name() = 'DatumOdstraneniaDopravnehoZnacenia']"/>
            </xsl:call-template>
          </xsl:with-param>
        </xsl:call-template>
      </xsl:if>
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="vyhradene_parkovanie">
    <xsl:param name="node" />

    <xsl:if test="$node/z:PocetParkovacichMiest">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Počet parkovacích miest'" />
        <xsl:with-param name="node" select="$node/z:PocetParkovacichMiest" />
      </xsl:call-template>
    </xsl:if>
    <xsl:if test="$node/z:UzivanaPlochaJednehoMiestaDlzka">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Užívaná plocha jedného miesta - dĺžka'" />
        <xsl:with-param name="node" select="$node/z:UzivanaPlochaJednehoMiestaDlzka" />
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$node/z:UzivanaPlochaJednehoMiestaSirka">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Užívaná plocha jedného miesta - šírka'" />
        <xsl:with-param name="node" select="$node/z:UzivanaPlochaJednehoMiestaSirka" />
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$node/z:TerminVyhradeniaMiestaOd">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Termín vyhradenia miesta od'" />
        <xsl:with-param name="node">
          <xsl:call-template name="base_format_date">
            <xsl:with-param name="instr" select="$node/z:TerminVyhradeniaMiestaOd" />
          </xsl:call-template>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$node/z:TerminVyhradeniaMiestaDo">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Termín vyhradenia miesta do'" />
        <xsl:with-param name="node">
          <xsl:call-template name="base_format_date">
            <xsl:with-param name="instr" select="$node/z:TerminVyhradeniaMiestaDo" />
          </xsl:call-template>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$node/z:TerminPredlzeniaDo">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Termín predĺženia do'" />
        <xsl:with-param name="node">
          <xsl:call-template name="base_format_date">
            <xsl:with-param name="instr" select="$node/z:TerminPredlzeniaDo" />
          </xsl:call-template>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$node/z:Prehlasenie">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Prehlásenie'" />
        <xsl:with-param name="node" select="$node/z:Prehlasenie" />
      </xsl:call-template>

      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Súhlasím s prehlásenim'" />
        <xsl:with-param name="node">
          <xsl:call-template name="base_boolean">
            <xsl:with-param name="bool" select="$node/*[local-name() = 'PrehlasenieSuhlas']" />
          </xsl:call-template>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$node/z:ZmenaECV">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Zmena EČV'" />
        <xsl:with-param name="node" select="$node/z:ZmenaECV" />
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$node/z:InaZmena">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Iná zmena'" />
        <xsl:with-param name="node" select="$node/z:InaZmena" />
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$node/z:CisloPlatnehoPovolenia">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Číslo platného povolenia'" />
        <xsl:with-param name="node" select="$node/z:CisloPlatnehoPovolenia" />
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$node/z:TerminZruseniaMiestaOd">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Termín zrušenia miesta od'" />
        <xsl:with-param name="node">
          <xsl:call-template name="base_format_date">
            <xsl:with-param name="instr" select="$node/z:TerminZruseniaMiestaOd" />
          </xsl:call-template>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template name="ziadatel">
    <xsl:param name="values" />

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'Žiada vo svojom mene'" />
      <xsl:with-param name="node">
        <xsl:call-template name="base_boolean">
          <xsl:with-param name="bool" select="$values/*[local-name() = 'VoSvojomMene']" />
        </xsl:call-template>
      </xsl:with-param>
    </xsl:call-template>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'Typ osoby'" />
      <xsl:with-param name="node" select="$values/z:TypOsoby/z:Name" />
    </xsl:call-template>

    <xsl:call-template name="base_block_with_title">
      <xsl:with-param name="title" select="'Kontaktné údaje'" />
      <xsl:with-param name="template_name" select="'kontakt'" />
      <xsl:with-param name="values" select="$values/z:Kontakt" />
    </xsl:call-template>

    <xsl:call-template name="base_block_with_title">
      <xsl:with-param name="title">
        <xsl:if test="$values/z:TypOsoby/z:Code = 1">
          <xsl:text>Adresa trvalého bydliska</xsl:text>
        </xsl:if>
        <xsl:if test="$values/z:TypOsoby/z:Code = 2">
          <xsl:text>Adresa miesta podnikania / sídla spoločnosti</xsl:text>
        </xsl:if>
        <xsl:if test="($values/z:TypOsoby/z:Code != 1) and ($values/z:TypOsoby/z:Code != 2) and ($values/z:TypOsoby/z:Code != 3) and ($values/z:TypOsoby/z:Code != 4)">
          <xsl:text>Adresa</xsl:text>
        </xsl:if>
      </xsl:with-param>
      <xsl:with-param name="template_name" select="'adresa'" />
      <xsl:with-param name="values" select="$values/z:Adresa" />
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="adresa">
    <xsl:param name="values" />

    <xsl:if test="$values/*[local-name() = 'Meno']">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Meno'" />
        <xsl:with-param name="node" select="$values/*[local-name() = 'Meno']" />
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$values/*[local-name() = 'Priezvisko']">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Priezvisko'" />
        <xsl:with-param name="node" select="$values/*[local-name() = 'Priezvisko']" />
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$values/*[local-name() = 'ObchodneMenoNazov']">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Obchodné meno / názov'" />
        <xsl:with-param name="node" select="$values/*[local-name() = 'ObchodneMenoNazov']" />
      </xsl:call-template>
    </xsl:if>

    <xsl:if test="$values/*[local-name() = 'UlicaACislo']">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Ulica'" />
        <xsl:with-param name="node" select="$values/*[local-name() = 'UlicaACislo']/*[local-name() = 'Ulica']" />
      </xsl:call-template>
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Číslo'" />
        <xsl:with-param name="node" select="concat($values/*[local-name() = 'UlicaACislo']/*[local-name() = 'SupisneCislo'],'/',$values/*[local-name() = 'UlicaACislo']/*[local-name() = 'OrientacneCislo'])" />
      </xsl:call-template>
    </xsl:if>
    <xsl:if test="$values/*[local-name() = 'PoschodieACisloBytu']">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text">
          Poschodie a číslo bytu
        </xsl:with-param>
        <xsl:with-param name="node" select="$values/*[local-name() = 'PoschodieACisloBytu']" />
      </xsl:call-template>
    </xsl:if>
    <xsl:if test="$values/*[local-name() = 'POBOX']">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text">
          P.O.Box
        </xsl:with-param>
        <xsl:with-param name="node" select="$values/*[local-name() = 'POBOX']" />
      </xsl:call-template>
    </xsl:if>
    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text">
        <xsl:text>Obec</xsl:text>
      </xsl:with-param>
      <xsl:with-param name="node" select="$values/*[local-name() = 'Obec']/*[local-name() = 'Name']" />
    </xsl:call-template>
    <xsl:if test="$values/*[local-name() = 'CastObce']">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text">
          <xsl:text>Časť obce</xsl:text>
        </xsl:with-param>
        <xsl:with-param name="node" select="$values/*[local-name() = 'CastObce']" />
      </xsl:call-template>
    </xsl:if>
    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text">
        <xsl:text>PSČ</xsl:text>
      </xsl:with-param>
      <xsl:with-param name="node" select="$values/*[local-name() = 'PSC']" />
    </xsl:call-template>
    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text">
        <xsl:text>Štát</xsl:text>
      </xsl:with-param>
      <xsl:with-param name="node" select="$values/*[local-name() = 'Stat']/*[local-name() = 'Name']" />
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="kontakt">
    <xsl:param name="values" />

    <xsl:if test="$values/*[local-name() = 'KontaktnaOsoba']">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Meno'" />
        <xsl:with-param name="node" select="$values/*[local-name() = 'KontaktnaOsoba']/*[local-name() = 'Meno']" />
      </xsl:call-template>
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Priezvisko'" />
        <xsl:with-param name="node" select="$values/*[local-name() = 'KontaktnaOsoba']/*[local-name() = 'Priezvisko']" />
      </xsl:call-template>
    </xsl:if>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="'E-mail'" />
      <xsl:with-param name="node" select="$values/*[local-name() = 'Email']" />
    </xsl:call-template>

    <xsl:if test="$values/*[local-name() = 'TelefonneCisloCele']">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Telefónne číslo'" />
        <xsl:with-param name="node" select="$values/*[local-name() = 'TelefonneCisloCele']" />
      </xsl:call-template>
    </xsl:if>
    <xsl:if test="$values/*[local-name() = 'TelefonneCislo']">
      <xsl:call-template name="base_labeled_field">
        <xsl:with-param name="text" select="'Telefónne číslo'" />
        <xsl:with-param name="node" select="concat($values/*[local-name() = 'TelefonneCislo']/*[local-name() = 'MedzinarodneVolacieCislo'], ' ', $values/*[local-name() = 'TelefonneCislo']/*[local-name() = 'Predvolba'], ' ', $values/*[local-name() = 'TelefonneCislo']/*[local-name() = 'Cislo'])" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <!-- ########################## -->
  <!-- ALL templates below, prefixed with "base_", are format-specific and should not be modified. -->
  <!-- ########################## -->

  <xsl:template name="base_eform">
    <xsl:value-of select="concat(z:Meta/z:Name, '&#10;')" />
    <xsl:call-template name="body" />
  </xsl:template>

  <xsl:template name="base_block_with_title">
    <xsl:param name="template_name" />
    <xsl:param name="values" />
    <xsl:param name="title" />

    <xsl:if test="$title">
      <xsl:call-template name="base_title">
        <xsl:with-param name="title" select="$title" />
      </xsl:call-template>
    </xsl:if>

    <xsl:call-template name="base_block">
      <xsl:with-param name="template_name" select="$template_name" />
      <xsl:with-param name="values" select="$values" />
    </xsl:call-template>
  </xsl:template>

  <!-- todo you cannot actually wrap text inside block, so the spacing is off in the result -->
  <xsl:template name="base_block">
    <xsl:param name="template_name" />
    <xsl:param name="values" />

    <xsl:call-template name="map">
      <xsl:with-param name="template" select="$template_name" />
      <xsl:with-param name="values" select="$values"/>
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="base_format_telefonne_cislo">
    <xsl:param name="node" />

    <xsl:value-of select="concat($node/*[local-name() = 'MedzinarodneVolacieCislo'], ' ')" />
    <xsl:value-of select="concat($node/*[local-name() = 'Predvolba'], ' ')" />
    <xsl:value-of select="$node/*[local-name() = 'Cislo']" />
  </xsl:template>

  <xsl:template name="base_boolean">
    <xsl:param name="bool" />

    <xsl:choose>
      <xsl:when test="$bool = 'true'">
        <xsl:text>Áno</xsl:text>
      </xsl:when>
      <xsl:when test="$bool = 'false'">
        <xsl:text>Nie</xsl:text>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="base_format_date">
    <xsl:param name="instr"/>
    <!-- YYYY-MM-DD -->
    <xsl:variable name="yyyy">
      <xsl:value-of select="substring($instr,1,4)"/>
    </xsl:variable>
    <xsl:variable name="mm">
      <xsl:value-of select="substring($instr,6,2)"/>
    </xsl:variable>
    <xsl:variable name="dd">
      <xsl:value-of select="substring($instr,9,2)"/>
    </xsl:variable>

    <xsl:value-of select="concat($dd,'.',$mm,'.',$yyyy)"/>
  </xsl:template>

  <xsl:template name="base_format_datetime">
    <xsl:param name="dateTime"/>
    <xsl:variable name="dateTimeString" select="string($dateTime)"/>
    <xsl:choose>
      <xsl:when
              test="$dateTimeString!= '' and string-length($dateTimeString)>18 and string(number(substring($dateTimeString, 1, 4))) != 'NaN' ">
        <xsl:value-of
                select="concat(substring($dateTimeString, 9, 2), '.', substring($dateTimeString, 6, 2), '.', substring($dateTimeString, 1, 4),' ', substring($dateTimeString, 12, 2),':', substring($dateTimeString, 15, 2))"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$dateTimeString"></xsl:value-of>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="base_title">
    <xsl:param name="title" />
    <xsl:value-of select="concat($title, '&#10;')" />
  </xsl:template>

  <xsl:template name="base_labeled_field">
    <xsl:param name="text" />
    <xsl:param name="node" />
    <xsl:choose>
      <xsl:when test="$node">
        <xsl:value-of select="concat('&#09;', $text, ': ', $node, '&#10;')" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="concat('&#09;', $text, '&#10;')" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="base_labeled_textarea">
    <xsl:param name="text" />
    <xsl:param name="node" />

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="$text" />
      <xsl:with-param name="node" select="$node" />
    </xsl:call-template>
  </xsl:template>
</xsl:stylesheet>