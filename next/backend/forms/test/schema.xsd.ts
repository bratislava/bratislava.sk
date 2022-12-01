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

<xs:complexType name="ZiadatelType"><xs:sequence><xs:element name="FirstName" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="LastName" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="BirthDate" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="NewTaxpayer" type="xs:boolean" minOccurs="0" maxOccurs="1"/><xs:element name="Address" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="PostalCode" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="City" type="xs:string" minOccurs="0" maxOccurs="1"/></xs:sequence></xs:complexType><xs:complexType name="E-formBodyType"><xs:sequence><xs:element name="Ziadatel" type="ZiadatelType" minOccurs="0" maxOccurs="1"/><xs:element name="Email" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="Phone" type="xs:string" minOccurs="0" maxOccurs="1"/></xs:sequence></xs:complexType></xs:schema>
`
