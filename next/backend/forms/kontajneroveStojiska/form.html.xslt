
<?xml version="1.0" encoding="utf-8" standalone="yes"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:z="http://schemas.gov.sk/doc/eform/form/0.1" exclude-result-prefixes="z">

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
            <xsl:with-param name="template_name" select="'ziadatel_udaje'"/>
            <xsl:with-param name="title" select="'Žiadateľ (údaje)'"/>
            <xsl:with-param name="values" select="z:Body/z:ZiadatelUdaje"/>
          </xsl:call-template><xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'typ_stanovista'"/>
            <xsl:with-param name="title" select="'Typ stanovišťa'"/>
            <xsl:with-param name="values" select="z:Body/z:TypStanovista"/>
          </xsl:call-template><xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'stanoviste_informacie'"/>
            <xsl:with-param name="title" select="'Informácie o stanovišti'"/>
            <xsl:with-param name="values" select="z:Body/z:StanovisteInformacie"/>
          </xsl:call-template><xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'miesto_umiestnenia'"/>
            <xsl:with-param name="title" select="'Miesto umiestnenia'"/>
            <xsl:with-param name="values" select="z:Body/z:MiestoUmiestnenia"/>
          </xsl:call-template><xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'dovod_ziadosti'"/>
            <xsl:with-param name="title" select="'Dôvod žiadosti'"/>
            <xsl:with-param name="values" select="z:Body/z:DovodZiadosti"/>
          </xsl:call-template><xsl:call-template name="base_block_with_title">
        <xsl:with-param name="template_name" select="'wrapper'"/>
        <xsl:with-param name="title" select="'Ostatné'"/>
        <xsl:with-param name="values" select="z:Body"/>
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
          </xsl:when><xsl:when test="$template = 'ziadatel_udaje'">
            <xsl:call-template name="ziadatel_udaje">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when><xsl:when test="$template = 'typ_stanovista'">
            <xsl:call-template name="typ_stanovista">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when><xsl:when test="$template = 'stanoviste_informacie'">
            <xsl:call-template name="stanoviste_informacie">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when><xsl:when test="$template = 'miesto_umiestnenia'">
            <xsl:call-template name="miesto_umiestnenia">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when><xsl:when test="$template = 'dovod_ziadosti'">
            <xsl:call-template name="dovod_ziadosti">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when><xsl:when test="$template = 'wrapper'">
        <xsl:call-template name="wrapper">
          <xsl:with-param name="values" select="$values"/>
        </xsl:call-template>
      </xsl:when></xsl:choose>
  </xsl:template>

  <!-- ########################## -->
  <!-- ALL templates below, prefixed with "base_", are format-specific and should not be modified. -->
  <!-- ########################## -->

  <xsl:template name="base_eform">
    <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
    <html lang="sk-SK">
      <head>
        <title>
          <xsl:value-of select="z:Meta/z:Name"/>
        </title>
        <xsl:call-template name="base_default_css"/>

        <style type="text/css">
          <xsl:call-template name="base_custom_css"/>
        </style>

        <xsl:call-template name="base_default_js"/>
      </head>
      <body>
        <div class="layoutMain ui-widget-content">
          <div class="layoutRow ui-tabs ui-widget-content">
            <div class="caption ui-widget-header" onmousedown="collapse_section(this)">
              <div class="headercorrection">
                <xsl:value-of select="z:Meta/z:Name"/>
              </div>
              <span class="arrow ui-icon ui-icon-carat-1-n"/>
            </div>
            <div class="columns">
              <div class="column">
                <xsl:call-template name="body"/>
              </div>
            </div>
            <div class="clear"/>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>

  <xsl:template name="base_block_with_title">
    <xsl:param name="template_name"/>
    <xsl:param name="values"/>
    <xsl:param name="title"/>

    <div class="cell">
      <div class="layoutRow ui-tabs ui-widget-content">
        <xsl:if test="$title">
          <xsl:call-template name="base_title">
            <xsl:with-param name="title" select="$title"/>
          </xsl:call-template>
        </xsl:if>
        <xsl:call-template name="base_block">
          <xsl:with-param name="template_name" select="$template_name"/>
          <xsl:with-param name="values" select="$values"/>
        </xsl:call-template>
      </div>
    </div>
  </xsl:template>

  <xsl:template name="base_block">
    <xsl:param name="template_name"/>
    <xsl:param name="values"/>

    <div>
      <xsl:call-template name="map">
        <xsl:with-param name="template" select="$template_name"/>
        <xsl:with-param name="values" select="$values"/>
      </xsl:call-template>
    </div>
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
    <div class="caption ui-widget-header" onmousedown="collapse_section(this)">
      <div class="headercorrection">
        <xsl:value-of select="$title"/>
      </div>
      <span class="arrow ui-icon ui-icon-carat-1-n"/>
    </div>
  </xsl:template>

  <xsl:template name="base_labeled_field">
    <xsl:param name="text"/>
    <xsl:param name="node"/>

    <xsl:param name="width" select="500"/>

    <xsl:variable name="divStyle" select="concat('display: table-cell; vertical-align: middle; width: ', $width + 10, 'px;')"/>
    <xsl:variable name="inputStyle" select="concat('width: ', $width , 'px')"/>

    <div class="cell" style="margin: 0 10px 0 5px">
      <div style="display: table; width: 100%">
        <div style="display: table-cell">
          <label class="fieldLabel" style="float:left; width: 100%">
            <xsl:value-of select="$text"/>
          </label>
        </div>
        <div style="display: table-cell"/>
        <div>
          <xsl:attribute name="style">
            <xsl:value-of select="$divStyle"/>
          </xsl:attribute>
          <span class="fieldContent">
            <input title="" type="text" class="textBox" disabled="disabled">
              <xsl:attribute name="value">
                <xsl:value-of select="$node"/>
              </xsl:attribute>
              <xsl:attribute name="style">
                <xsl:value-of select="$inputStyle"/>
              </xsl:attribute>
            </input>
          </span>
        </div>
      </div>
    </div>
  </xsl:template>

  <xsl:template name="base_labeled_textarea">
    <xsl:param name="text"/>
    <xsl:param name="node"/>

    <div class="cell">
      <label class="fieldLabel" style="width: 100%">
        <xsl:value-of select="$text"/>
      </label>
      <span class="fieldContent" style="width: 100%">
        <div style="padding: 0 10px 0 0;">
          <textarea rows="6" class="textarea-color" disabled="disabled" style="resize: none; width: 100%; margin: 0; padding: 0;">
            <xsl:value-of select="$node"/>
          </textarea>
        </div>
      </span>
    </div>
  </xsl:template>

  <!-- more HTML specific -->

  <xsl:output method="html" version="5.0" encoding="utf-8" indent="no"/>

  <xsl:template name="base_custom_css">
    label.socialStatusLabel {
    display: inline-block;
    font-size: 0.75em;
    line-height: 25px;
    margin: 0px 18px 0px 0px;
    padding: 0;
    width: 250px;
    }
    label.checkboxLabel {
    font-size: 0.75em;
    margin: 0px;
    padding: 0;
    }
    div.checkbox {
    padding-left: 20px;
    }
    div.checkbox input[type="checkbox"] {
    margin: 0px 5px 0px -20px;
    vertical-align:middle;
    }
    div.radiobutton {
    padding-left: 20px;
    }
    div.radiobuttonHorizontal {
    padding-right: 20px;
    float: left;
    }
    div.radiobutton input[type="radio"] {
    margin: 0px 5px 0px -20px;
    vertical-align:middle;
    }
    input.iban {
    width:200px;
    }
    .col33 {
    width: 33%;
    }
    .col40 {
    width: 40%;
    }
    .col50 {
    width: 50%;
    }
    .col60 {
    width: 60%;
    }
    .col75 {
    width: 75%;
    }
    .cell {
    overflow: auto;
    }
    p {
    margin: 10px 10px 0px 10px;
    font-size: 0.75em;
    }
    table {
    border-collapse: collapse;
    }

    table, td, th {
    border: 1px solid #C7C7C5;
    font-size: 0.9em;
    padding: 3px;
    }
    ul {
    margin: 0px 0px 0px 0px;
    font-size: 0.75em;
    }
    li {
    margin: 0px 0px 0px 0px;

    }
    .table {
    width: 100%;
    }
    .textarea-color[disabled="disabled"] {
    color: rgb(112, 112, 112) !important;
    }
    <!-- *[disabled="disabled"] { color : black !important; } -->
  </xsl:template>

  <xsl:template name="base_default_css">
    <link href="https://www.slovensko.sk/static/eForm/Designer/2.0.1.12/Styles/jquery-ui.css" rel="stylesheet" type="text/css"/>
    <link href="https://www.slovensko.sk/static/eForm/Designer/2.0.1.12/Styles/base.css" rel="stylesheet" type="text/css"/>
    <link href="https://www.slovensko.sk/static/eForm/Designer/2.0.1.12/Styles/ego.css" rel="stylesheet" type="text/css"/>
    <link href="https://www.slovensko.sk/static/eForm/Designer/2.0.1.12/Styles/p_upvs.css" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400italic,bold,600&amp;subset=latin,latin-ext" rel="stylesheet" type="text/css"/>
  </xsl:template>

  <xsl:template name="base_default_js">
    <script type="text/javascript">
      function collapse_section(id) {
      var cl = id.lastElementChild.getAttribute('class');
      var state = cl.search('ui-icon-carat-1-n');
      if (state != -1)
      cl = cl.replace('ui-icon-carat-1-n', 'ui-icon-carat-1-s');
      else
      cl = cl.replace('ui-icon-carat-1-s', 'ui-icon-carat-1-n');
      id.lastElementChild.setAttribute('class', cl);

      var el = id.nextElementSibling;
      while (el != undefined) {
      el.style.display = (state != -1 ? 'none' : 'block');
      el = el.nextElementSibling;
      }
      }
    </script>
  </xsl:template>
<xsl:template name="ziadatel"><xsl:param name="values"/><xsl:if test="$values/z:ZiatetelTyp"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Žiada o splnomocnenie?'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_boolean"><xsl:with-param name="bool" select="$values/z:ZiatetelTyp"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:for-each select="$values/z:Splnomocnenie">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Splnomocnenie na zastupovanie'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each></xsl:template><xsl:template name="ziadatel_udaje"><xsl:param name="values"/><xsl:if test="$values/z:Nazov"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Názov spoločenstva alebo obchodné meno správcu'"/>
              <xsl:with-param name="node" select="$values/z:Nazov"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:Sidlo"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Sídlo spoločenstva alebo správcu'"/>
              <xsl:with-param name="node" select="$values/z:Sidlo"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:Mesto"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Mesto'"/>
              <xsl:with-param name="node" select="$values/z:Mesto/z:Name"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:Psc"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'PSČ'"/>
              <xsl:with-param name="node" select="$values/z:Psc"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:Ico"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'IČO'"/>
              <xsl:with-param name="node" select="$values/z:Ico"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:Banka"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Banka'"/>
              <xsl:with-param name="node" select="$values/z:Banka"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:Iban"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'IBAN'"/>
              <xsl:with-param name="node" select="$values/z:Iban"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:MenoPriezvisko"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Meno a priezvisko zodpovednej osoby'"/>
              <xsl:with-param name="node" select="$values/z:MenoPriezvisko"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:Email"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'E-mail'"/>
              <xsl:with-param name="node" select="$values/z:Email"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:Telefon"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Telefónne číslo (v tvare +421...)'"/>
              <xsl:with-param name="node" select="$values/z:Telefon"/>
            </xsl:call-template></xsl:if></xsl:template><xsl:template name="typ_stanovista"><xsl:param name="values"/><xsl:if test="$values/z:TypStanovistaUpresnenie"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Upresnite o aký typ stanovišťa sa jedná'"/>
              <xsl:with-param name="node" select="$values/z:TypStanovistaUpresnenie"/>
            </xsl:call-template></xsl:if></xsl:template><xsl:template name="stanoviste_informacie"><xsl:param name="values"/><xsl:if test="$values/z:MestomPonukanaDokumentacia"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Použijete niektorú z mestom ponúkaných projektových dokumentácií?'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_boolean"><xsl:with-param name="bool" select="$values/z:MestomPonukanaDokumentacia"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:PopisZbernychNadob"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Popíšte počet a typ jednotlivých zberných nádob a ich objemy'"/>
              <xsl:with-param name="node" select="$values/z:PopisZbernychNadob"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:VegetacnaStrecha"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Plánujete vybudovať / máte vegetačnú strechu?'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_boolean"><xsl:with-param name="bool" select="$values/z:VegetacnaStrecha"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:VegetacnaStena"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Plánujete vybudovať / máte vegetačnú stenu kontajnerového stanovišťa?'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_boolean"><xsl:with-param name="bool" select="$values/z:VegetacnaStena"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:SadoveUpravy"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Plánujete / urobili ste sadové úpravy bezprostredného okolia?'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_boolean"><xsl:with-param name="bool" select="$values/z:SadoveUpravy"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if></xsl:template><xsl:template name="miesto_umiestnenia"><xsl:param name="values"/><xsl:for-each select="$values/z:Kataster">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Katasttrálne územie pozemku'"/>
                <xsl:with-param name="node" select="."/>
              </xsl:call-template>
            </xsl:for-each><xsl:if test="$values/z:Parcela"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Parcelné číslo pozemku'"/>
              <xsl:with-param name="node" select="$values/z:Parcela/z:Name"/>
            </xsl:call-template></xsl:if><xsl:for-each select="$values/z:AdresaUmiestnenia">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Adresa bytových domov, ktorým bude stanovište slúžiť'"/>
                <xsl:with-param name="node" select="."/>
              </xsl:call-template>
            </xsl:for-each><xsl:if test="$values/z:Velkost"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Veľkosť plochy (v m2)'"/>
              <xsl:with-param name="node" select="$values/z:Velkost"/>
            </xsl:call-template></xsl:if></xsl:template><xsl:template name="dovod_ziadosti"><xsl:param name="values"/><xsl:if test="$values/z:Zaujem"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Mám záujem o'"/>
              <xsl:with-param name="node" select="$values/z:Zaujem"/>
            </xsl:call-template></xsl:if></xsl:template><xsl:template name="technicky_vykres"><xsl:param name="values"/><xsl:for-each select="$values/z:TechnickyVykresPrilohy">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Prílohy'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:if test="$values/z:TechnickyVykresText"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Text'"/>
              <xsl:with-param name="node" select="$values/z:TechnickyVykresText"/>
            </xsl:call-template></xsl:if></xsl:template><xsl:template name="rozpocet"><xsl:param name="values"/><xsl:for-each select="$values/z:RozpocetPrilohy">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Prílohy'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:if test="$values/z:RozpocetText"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Text'"/>
              <xsl:with-param name="node" select="$values/z:RozpocetText"/>
            </xsl:call-template></xsl:if></xsl:template><xsl:template name="wrapper"><xsl:param name="values"/><xsl:for-each select="$values/z:Zmluva">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Zmluva o výkone správy / Zmluva o bytovom spoločenstve'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:for-each select="$values/z:SnimkaZMapy">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Snímka z katastrálnej mapy so zakresleným kontajnerovým stanovišťom'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:for-each select="$values/z:PodorysStanovista">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Pôdorys kontajnerového stanovišťa so zakreslením rozmiestnenia zberných nádob'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:for-each select="$values/z:VizualStanovista">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Vizuál kontajnerového stanovišťa - ilustračná alebo reálna fotografia / vizualizácia'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:call-template name="technicky_vykres">
              <xsl:with-param name="values" select="$values/*[local-name() = 'TechnickyVykres']"/>
            </xsl:call-template><xsl:for-each select="$values/z:StavebnaDokumentacia">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Stavebná dokumentácia kontajnerového stanovišťa alebo výber z poskytnutých stavebných dokumentácií'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:call-template name="rozpocet">
              <xsl:with-param name="values" select="$values/*[local-name() = 'Rozpocet']"/>
            </xsl:call-template><xsl:for-each select="$values/z:InePrilohy">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Iné'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:for-each select="$values/z:Stanovisko">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Stanovisko OLO'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:for-each select="$values/z:Doklad">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Relevantný doklad potvrdzujúci súčasný odvoz'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:for-each select="$values/z:ListVlastnictva">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Zmluva o nájme pozemku / List vlastníctva / Zmluva o zriadení vecného bremena'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each></xsl:template></xsl:stylesheet>
