export default {
  config: {
    // Add slovak as option for strapi admin
    locales: ['sk'],

    // Disable video tutorials
    tutorials: false,

    // Disable notifications about new Strapi releases
    notifications: {
      releases: false,
    },

    translations: {
      sk: {
        'content-manager.components.LeftMenu.collection-types': 'Kolekcie',
        'content-manager.components.LeftMenu.single-types': 'Jednoduché typy',
        'content-manager.containers.Edit.information.lastUpdate': 'Aktualizované',
        'modal.upload-list.sub-header.add-folder': 'Pridať priečinok',
        'app.components.LeftMenu.general': 'Všeobecné',
        'Auth.form.username.placeholder': 'napr. jankohrasko',
        'Auth.form.email.placeholder': 'napr. janko.hrasko@bratislava.sk',
        'Settings.webhooks.trigger.test': 'Testovací beh',

        // Used in columns section
        'columnsSection.imageVariant.withCircleBackground': 'Piktogramy na kruhovom pozadí',
        'columnsSection.imageVariant.imageOriginalSize': 'Obrázky s vlastnou veľkosťou',
        'columnsSection.responsiveLayout.slider': 'Slider',
        'columnsSection.responsiveLayout.oneColumn': 'Pod sebou',
      },
      en: {
        // Used in columns section
        'columnsSection.imageVariant.withCircleBackground': 'Piktogramy na kruhovom pozadí',
        'columnsSection.imageVariant.imageOriginalSize': 'Obrázky s vlastnou veľkosťou',
        'columnsSection.responsiveLayout.slider': 'Slider',
        'columnsSection.responsiveLayout.oneColumn': 'Pod sebou',
      },
    },
  },
  bootstrap() {},
}
