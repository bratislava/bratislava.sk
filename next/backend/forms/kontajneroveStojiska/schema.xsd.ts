export default `<?xml version="1.0" encoding="utf-8"?>
<xs:schema elementFormDefault="qualified" xmlns="http://schemas.gov.sk/doc/eform/form/0.1" xmlns:xs="http://www.w3.org/2001/XMLSchema" targetNamespace="http://schemas.gov.sk/doc/eform/form/0.1">
  <xs:element name="E-form">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="Meta" type="E-formMetaType"/>
        <xs:element name="Body" type="E-formBodyType">
          
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <xs:complexType name="E-formMetaType">
    <xs:annotation>
      <xs:documentation>Metaúdaje elektronického formulára</xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element name="ID" type="xs:string"/>
      <xs:element name="Name" type="xs:string"/>
      <xs:element name="Description" type="xs:string" minOccurs="0"/>
      <xs:element name="Gestor" type="xs:string"/>
      <xs:element name="RecipientId" type="xs:string"/>
      <xs:element name="Version" type="xs:string"/>
      <xs:element name="ZepRequired" type="xs:boolean"/>
      <xs:element name="EformUuid" type="xs:string"/>
      <xs:element name="SenderID" type="xs:string" default="mailto:"/>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="EnumerationType">
    <xs:annotation>
      <xs:documentation>Položka číselníka</xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element name="Code" type="xs:string">
        <xs:annotation>
          <xs:documentation>Kód</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="Name" type="xs:string">
        <xs:annotation>
          <xs:documentation>Názov</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="WsEnumCode" type="xs:string">
        <xs:annotation>
          <xs:documentation>Kod ciselnika WS sluzby</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="PrilohaType">
    <xs:annotation>
      <xs:documentation>Priložená príloha</xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element name="Nazov" type="xs:string">
        <xs:annotation>
          <xs:documentation>Názov</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="Prilozena" type="xs:boolean">
        <xs:annotation>
          <xs:documentation>Indikátor či bola príloha priložená</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
  </xs:complexType>

<xs:complexType name="ZiadatelType"><xs:sequence><xs:element name="ZiatetelTyp" type="xs:boolean" minOccurs="1" maxOccurs="1"/><xs:element name="Splnomocnenie" type="PrilohaType" minOccurs="0" maxOccurs="unbounded"/></xs:sequence></xs:complexType><xs:simpleType name="TelefonType"><xs:restriction base="xs:string"><xs:pattern value="((([+][1-9])|([+][1-9][0-9]{1,8}))|((00[1-9])|(00[1-9][0-9]{1,7})))"/></xs:restriction></xs:simpleType><xs:complexType name="ZiadatelUdajeType"><xs:sequence><xs:element name="Nazov" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="Sidlo" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="Mesto" type="EnumerationType" minOccurs="1" maxOccurs="1"/><xs:element name="Psc" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="Ico" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="Banka" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="Iban" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="MenoPriezvisko" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="Email" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="Telefon" type="TelefonType" minOccurs="1" maxOccurs="1"/></xs:sequence></xs:complexType><xs:simpleType name="TypStanovistaUpresnenieType"><xs:restriction base="xs:string"><xs:enumeration value="Nové"/><xs:enumeration value="Rekonštrukcia existujúceho stanovišťa"/><xs:enumeration value="Nahradenie existujúceho stanovišťa"/></xs:restriction></xs:simpleType><xs:complexType name="TypStanovistaType"><xs:sequence><xs:element name="TypStanovistaUpresnenie" type="TypStanovistaUpresnenieType" minOccurs="1" maxOccurs="1"/></xs:sequence></xs:complexType><xs:complexType name="StanovisteInformacieType"><xs:sequence><xs:element name="MestomPonukanaDokumentacia" type="xs:boolean" minOccurs="1" maxOccurs="1"/><xs:element name="PopisZbernychNadob" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="VegetacnaStrecha" type="xs:boolean" minOccurs="1" maxOccurs="1"/><xs:element name="VegetacnaStena" type="xs:boolean" minOccurs="1" maxOccurs="1"/><xs:element name="SadoveUpravy" type="xs:boolean" minOccurs="1" maxOccurs="1"/></xs:sequence></xs:complexType><xs:complexType name="MiestoUmiestneniaType"><xs:sequence><xs:element name="Kataster" type="xs:string" minOccurs="1" maxOccurs="unbounded"/><xs:element name="Parcela" type="EnumerationType" minOccurs="1" maxOccurs="1"/><xs:element name="AdresaUmiestnenia" type="xs:string" minOccurs="1" maxOccurs="unbounded"/><xs:element name="Velkost" type="xs:integer" minOccurs="1" maxOccurs="1"/></xs:sequence></xs:complexType><xs:simpleType name="ZaujemType"><xs:restriction base="xs:string"><xs:enumeration value="Dotáciu na kontajnerové stojisko"/><xs:enumeration value="Nájom mestského pozemku pod stojiskom"/><xs:enumeration value="Nájom aj dotáciu zároveň"/></xs:restriction></xs:simpleType><xs:complexType name="DovodZiadostiType"><xs:sequence><xs:element name="Zaujem" type="ZaujemType" minOccurs="1" maxOccurs="1"/></xs:sequence></xs:complexType><xs:complexType name="TechnickyVykresType"><xs:sequence><xs:element name="TechnickyVykresPrilohy" type="PrilohaType" minOccurs="0" maxOccurs="unbounded"/><xs:element name="TechnickyVykresText" type="xs:string" minOccurs="0" maxOccurs="1"/></xs:sequence></xs:complexType><xs:complexType name="RozpocetType"><xs:sequence><xs:element name="RozpocetPrilohy" type="PrilohaType" minOccurs="0" maxOccurs="unbounded"/><xs:element name="RozpocetText" type="xs:string" minOccurs="0" maxOccurs="1"/></xs:sequence></xs:complexType><xs:complexType name="E-formBodyType"><xs:sequence><xs:element name="Ziadatel" type="ZiadatelType" minOccurs="1" maxOccurs="1"/><xs:element name="ZiadatelUdaje" type="ZiadatelUdajeType" minOccurs="1" maxOccurs="1"/><xs:element name="TypStanovista" type="TypStanovistaType" minOccurs="1" maxOccurs="1"/><xs:element name="StanovisteInformacie" type="StanovisteInformacieType" minOccurs="1" maxOccurs="1"/><xs:element name="MiestoUmiestnenia" type="MiestoUmiestneniaType" minOccurs="1" maxOccurs="1"/><xs:element name="DovodZiadosti" type="DovodZiadostiType" minOccurs="1" maxOccurs="1"/><xs:element name="Zmluva" type="PrilohaType" minOccurs="1" maxOccurs="unbounded"/><xs:element name="Stanovisko" type="PrilohaType" minOccurs="0" maxOccurs="unbounded"/><xs:element name="Doklad" type="PrilohaType" minOccurs="0" maxOccurs="unbounded"/><xs:element name="ListVlastnictva" type="PrilohaType" minOccurs="0" maxOccurs="unbounded"/><xs:element name="SnimkaZMapy" type="PrilohaType" minOccurs="1" maxOccurs="unbounded"/><xs:element name="PodorysStanovista" type="PrilohaType" minOccurs="1" maxOccurs="unbounded"/><xs:element name="VizualStanovista" type="PrilohaType" minOccurs="1" maxOccurs="unbounded"/><xs:element name="TechnickyVykres" type="TechnickyVykresType" minOccurs="1" maxOccurs="1"/><xs:element name="StavebnaDokumentacia" type="PrilohaType" minOccurs="1" maxOccurs="unbounded"/><xs:element name="Rozpocet" type="RozpocetType" minOccurs="1" maxOccurs="1"/><xs:element name="InePrilohy" type="PrilohaType" minOccurs="0" maxOccurs="unbounded"/></xs:sequence></xs:complexType></xs:schema>`
