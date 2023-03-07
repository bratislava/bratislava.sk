export default `<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xml:lang="en" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:z="http://schemas.gov.sk/doc/eform/form/0.1" version="1.0" xmlns:Xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/z:E-form">
    <xsl:call-template name="base_eform"/>
  </xsl:template>

  <!-- this is the template which gets called inside the FO structure -->
  <xsl:template name="body">
    
  <xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'ziadatel'"/>
            <xsl:with-param name="title" select="'Žiadateľ'"/>
            <xsl:with-param name="values" select="z:Body/z:Ziadatel"/>
          </xsl:call-template><xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'podujatie_informacie'"/>
            <xsl:with-param name="title" select="'Informácie o podujatí'"/>
            <xsl:with-param name="values" select="z:Body/z:PodujatieInformacie"/>
          </xsl:call-template><xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'podujatie_vyznam'"/>
            <xsl:with-param name="title" select="'Spoločenský význam podujatia'"/>
            <xsl:with-param name="values" select="z:Body/z:PodujatieVyznam"/>
          </xsl:call-template><xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'podujatie_spolupraca_mesto'"/>
            <xsl:with-param name="title" select="'Spolupráca s hlavným mestom'"/>
            <xsl:with-param name="values" select="z:Body/z:PodujatieSpolupracaMesto"/>
          </xsl:call-template><xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'podujatie_spolupraca_organizacie'"/>
            <xsl:with-param name="title" select="'Spolupráca s mestskými organizáciami a inými partnermi'"/>
            <xsl:with-param name="values" select="z:Body/z:PodujatieSpolupracaOrganizacie"/>
          </xsl:call-template></xsl:template>

  <!-- XSL cannot dynamically "yield" template, so here is simple mapping for each template based on name -->
  <!-- TODO better way to do this? -->
  <xsl:template name="map">
    <xsl:param name="template"/>
    <xsl:param name="values"/>

    <xsl:choose>
      
    <xsl:when test="$template = 'ziadatel'">
            <xsl:call-template name="ziadatel">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when><xsl:when test="$template = 'podujatie_informacie'">
            <xsl:call-template name="podujatie_informacie">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when><xsl:when test="$template = 'podujatie_vyznam'">
            <xsl:call-template name="podujatie_vyznam">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when><xsl:when test="$template = 'podujatie_spolupraca_mesto'">
            <xsl:call-template name="podujatie_spolupraca_mesto">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when><xsl:when test="$template = 'podujatie_spolupraca_organizacie'">
            <xsl:call-template name="podujatie_spolupraca_organizacie">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when></xsl:choose>
  </xsl:template>

  <!-- ########################## -->
  <!-- ALL templates below, prefixed with "base_", are format-specific and should not be modified. -->
  <!-- ########################## -->

  <xsl:template name="base_eform">
    <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
      <fo:layout-master-set>
        <fo:simple-page-master master-name="A4" page-height="842px" page-width="595px" margin-top="10px" margin-bottom="10px" margin-left="10px" margin-right="10px">
          <fo:region-body margin-bottom="20mm"/>
          <fo:region-after region-name="footer" extent="10mm"/>
        </fo:simple-page-master>
        <fo:page-sequence-master master-name="document">
          <fo:repeatable-page-master-alternatives>
            <fo:conditional-page-master-reference master-reference="A4"/>
          </fo:repeatable-page-master-alternatives>
        </fo:page-sequence-master>
      </fo:layout-master-set>
      <fo:page-sequence master-reference="document" font-family="Arial">
        <fo:static-content flow-name="footer">
          <fo:block text-align="end"><fo:page-number/></fo:block>
        </fo:static-content>
        <fo:flow flow-name="xsl-region-body">
          <fo:block font-size="20pt" text-align="center">
            <xsl:value-of select="z:Meta/z:Name"/>
          </fo:block>
          <fo:block color="white">|</fo:block>
          <fo:block/>

          <xsl:call-template name="body"/>

        </fo:flow>
      </fo:page-sequence>
    </fo:root>
  </xsl:template>

  <xsl:template name="base_block_with_title">
    <xsl:param name="template_name"/>
    <xsl:param name="values"/>
    <xsl:param name="title"/>

    <xsl:if test="$title">
      <xsl:call-template name="base_title">
        <xsl:with-param name="title" select="$title"/>
      </xsl:call-template>
    </xsl:if>

    <xsl:call-template name="base_block">
      <xsl:with-param name="template_name" select="$template_name"/>
      <xsl:with-param name="values" select="$values"/>
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="base_block">
    <xsl:param name="template_name"/>
    <xsl:param name="values"/>

    <fo:block margin-left="5mm">
      <xsl:call-template name="map">
        <xsl:with-param name="template" select="$template_name"/>
        <xsl:with-param name="values" select="$values"/>
      </xsl:call-template>
    </fo:block>
  </xsl:template>

  <xsl:template name="base_format_telefonne_cislo">
    <xsl:param name="node"/>

    <xsl:value-of select="concat($node/*[local-name() = 'MedzinarodneVolacieCislo'], ' ')"/>
    <xsl:value-of select="concat($node/*[local-name() = 'Predvolba'], ' ')"/>
    <xsl:value-of select="$node/*[local-name() = 'Cislo']"/>
  </xsl:template>

  <xsl:template name="base_boolean">
    <xsl:param name="bool"/>

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
      <xsl:when test="$dateTimeString!= '' and string-length($dateTimeString)>18 and string(number(substring($dateTimeString, 1, 4))) != 'NaN' ">
        <xsl:value-of select="concat(substring($dateTimeString, 9, 2), '.', substring($dateTimeString, 6, 2), '.', substring($dateTimeString, 1, 4),' ', substring($dateTimeString, 12, 2),':', substring($dateTimeString, 15, 2))"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$dateTimeString"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="base_title">
    <xsl:param name="title"/>

    <fo:block margin-left="5mm" margin-top="2mm">
      <fo:block padding-left="2mm">
        <xsl:value-of select="$title"/>
      </fo:block>
    </fo:block>
  </xsl:template>

  <xsl:template name="base_labeled_field">
    <xsl:param name="text"/>
    <xsl:param name="node"/>

    <fo:table space-before="2mm">
      <fo:table-column/>
      <fo:table-column column-width="300px"/>
      <fo:table-body>
        <fo:table-row>
          <fo:table-cell>
            <fo:block>
              <xsl:value-of select="$text"/>
            </fo:block>
          </fo:table-cell>
          <xsl:choose>
            <xsl:when test="$node">
              <fo:table-cell border-width="0.6pt" border-style="solid" background-color="white" padding="1pt">
                <fo:block>
                  <xsl:value-of select="$node"/>
                  <fo:inline color="white">___</fo:inline>
                </fo:block>
              </fo:table-cell>
            </xsl:when>
            <xsl:otherwise>
              <fo:table-cell>
                <fo:block/>
              </fo:table-cell>
            </xsl:otherwise>
          </xsl:choose>
        </fo:table-row>
      </fo:table-body>
    </fo:table>
  </xsl:template>

  <xsl:template name="base_labeled_textarea">
    <xsl:param name="text"/>
    <xsl:param name="node"/>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="$text"/>
      <xsl:with-param name="node" select="$node"/>
    </xsl:call-template>
  </xsl:template>
<xsl:template name="ziadatel"><xsl:param name="values"/><xsl:if test="$values/z:ZiatetelTyp"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Žiadate ako'"/>
              <xsl:with-param name="node" select="$values/z:ZiatetelTyp"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelMenoPriezvisko"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Meno a priezvisko'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelMenoPriezvisko"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelObchodneMeno"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Obchodné meno'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelObchodneMeno"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelIco"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'IČO'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelIco"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelAdresaPobytu"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Adresa trvalého pobytu'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelAdresaPobytu"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelMiestoPodnikania"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Miesto podnikania'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelMiestoPodnikania"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelAdresaSidla"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Adresa sídla'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelAdresaSidla"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelMesto"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Mesto'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelMesto/z:Name"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelPsc"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'PSČ'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelPsc"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelKontaktnaOsoba"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Kontaktná osoba'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelKontaktnaOsoba"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelEmail"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'E-mail'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelEmail"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelTelefon"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Telefónne číslo (v tvare +421...)'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelTelefon"/>
            </xsl:call-template></xsl:if></xsl:template><xsl:template name="podujatie_informacie"><xsl:param name="values"/><xsl:if test="$values/z:PodujatieTyp"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Typ podujatia'"/>
              <xsl:with-param name="node" select="$values/z:PodujatieTyp"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:FilmNazov"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Názov filmu'"/>
              <xsl:with-param name="node" select="$values/z:FilmNazov"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:FilmZaciatokNatacaniaDatum"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Začiatok natáčania filmu'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_format_date"><xsl:with-param name="instr" select="$values/z:FilmZaciatokNatacaniaDatum"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:FilmZaciatokNatacaniaCas"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Začiatok natáčania filmu'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_format_datetime"><xsl:with-param name="dateTime" select="$values/z:FilmZaciatokNatacaniaCas"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:FilmKoniecNatacaniaDatum"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Koniec natáčania filmu'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_format_date"><xsl:with-param name="instr" select="$values/z:FilmKoniecNatacaniaDatum"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:FilmKoniecNatacaniaCas"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Koniec natáčania filmu'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_format_datetime"><xsl:with-param name="dateTime" select="$values/z:FilmKoniecNatacaniaCas"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:FilmMiestoNatacania"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Miesto natáčania filmu'"/>
              <xsl:with-param name="node" select="$values/z:FilmMiestoNatacania"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:FilmStab"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Predpokladaný počet členov filmového štábu'"/>
              <xsl:with-param name="node" select="$values/z:FilmStab"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:FilmProgram"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Stručný program podujatia'"/>
              <xsl:with-param name="node" select="$values/z:FilmProgram"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:PodujatieNazov"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Názov podujatia'"/>
              <xsl:with-param name="node" select="$values/z:PodujatieNazov"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:PodujatieZaciatokDatum"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Začiatok podujatia'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_format_date"><xsl:with-param name="instr" select="$values/z:PodujatieZaciatokDatum"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:PodujatieZaciatokCas"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Začiatok podujatia'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_format_datetime"><xsl:with-param name="dateTime" select="$values/z:PodujatieZaciatokCas"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:PodujatieKoniecDatum"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Koniec podujatia'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_format_date"><xsl:with-param name="instr" select="$values/z:PodujatieKoniecDatum"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:PodujatieKoniecCas"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Koniec podujatia'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_format_datetime"><xsl:with-param name="dateTime" select="$values/z:PodujatieKoniecCas"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:PodujatieMiesto"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Miesto natáčania filmu'"/>
              <xsl:with-param name="node" select="$values/z:PodujatieMiesto"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:PodujatiePocetNavstevnikov"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Predpokladaný počet návštevníkov'"/>
              <xsl:with-param name="node" select="$values/z:PodujatiePocetNavstevnikov"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:PodujatieProgram"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Stručný program podujatia'"/>
              <xsl:with-param name="node" select="$values/z:PodujatieProgram"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:PodujatieVstupne"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Plánujete na podujatie vyberať vstupné?'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_boolean"><xsl:with-param name="bool" select="$values/z:PodujatieVstupne"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:PodujatieCharita"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Budete časť vstupného venovať na charitatívne účely?'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_boolean"><xsl:with-param name="bool" select="$values/z:PodujatieCharita"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:PodujatieCharitaUpresnenie"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Prosím, upresnite na aké účely'"/>
              <xsl:with-param name="node" select="$values/z:PodujatieCharitaUpresnenie"/>
            </xsl:call-template></xsl:if></xsl:template><xsl:template name="podujatie_vyznam"><xsl:param name="values"/><xsl:if test="$values/z:PodujatieVyznamUpresnenie"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Spoločenský význam podujatia'"/>
              <xsl:with-param name="node" select="$values/z:PodujatieVyznamUpresnenie"/>
            </xsl:call-template></xsl:if></xsl:template><xsl:template name="podujatie_spolupraca_mesto"><xsl:param name="values"/><xsl:if test="$values/z:ZastitaPrimatora"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Bola Vášmu podujatiu v minulosti udelená záštita primátora?'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_boolean"><xsl:with-param name="bool" select="$values/z:ZastitaPrimatora"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:UcastPrimatora"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Požadujete účasť primátora?'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_boolean"><xsl:with-param name="bool" select="$values/z:UcastPrimatora"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:UcastPrimatoraDatum"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Termín účasti zástupcu hlavného mesta'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_format_date"><xsl:with-param name="instr" select="$values/z:UcastPrimatoraDatum"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:UcastPrimatoraCas"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Termín účasti zástupcu hlavného mesta'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_format_datetime"><xsl:with-param name="dateTime" select="$values/z:UcastPrimatoraCas"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:UcastPrimatoraTyp"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'O aký vstup sa jedná'"/>
              <xsl:with-param name="node" select="$values/z:UcastPrimatoraTyp"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:PropagaciaMesto"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Máte záujem o propagáciu podujatia hlavným mestom?'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_boolean"><xsl:with-param name="bool" select="$values/z:PropagaciaMesto"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:PropagaciaMestoUpresnenie"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'O aké komunikačné kanály máte záujem?'"/>
              <xsl:with-param name="node" select="$values/z:PropagaciaMestoUpresnenie"/>
            </xsl:call-template></xsl:if></xsl:template><xsl:template name="podujatie_spolupraca_organizacie"><xsl:param name="values"/><xsl:if test="$values/z:ZiadostPodporaOrganizacie"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Žiadali ste o podporu pre tento ročník podujatia niektorý z mestských podnikov / inštitúcií?'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_boolean"><xsl:with-param name="bool" select="$values/z:ZiadostPodporaOrganizacie"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadostPodporaOrganizacieUpresnenie"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Vyberte, ktoré z inštitúcií:'"/>
              <xsl:with-param name="node" select="$values/z:ZiadostPodporaOrganizacieUpresnenie"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadostPodporaMesto"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Žiadali ste o podporu pre tento ročník podujatia niektorý z mestských podnikov / inštitúcií?'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_boolean"><xsl:with-param name="bool" select="$values/z:ZiadostPodporaMesto"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadostPodporaPartneri"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Máte iných partnerov podujatia?'"/>
              <xsl:with-param name="node" select="$values/z:ZiadostPodporaPartneri"/>
            </xsl:call-template></xsl:if></xsl:template></xsl:stylesheet>`
