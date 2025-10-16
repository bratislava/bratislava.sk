import type { StrapiApp } from '@strapi/strapi/admin'
import InternalJobsRunActions from './extensions/InternalJobsRunActions'

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

        'content-manager.actions.clone.error': 'Počas duplikovania došlo k chybe.',
        'content-manager.actions.clone.label': 'Duplikovať',
        'content-manager.actions.delete.dialog.body':
          'Ste si istý, že chceš túto položku vymazať? Táto akcia je nezvratná.',
        'content-manager.actions.delete.error': 'Počas vymazávania dokumentu došlo k chybe.',
        'content-manager.actions.delete.label':
          'Vymazať záznam{isLocalized, select, true { (všetky jazyky)} other {}}',
        'content-manager.actions.discard.label': 'Zahodiť zmeny',
        'content-manager.actions.discard.dialog.body':
          'Ste si istý, že chcete zahodiť zmeny? Táto akcia je nezvratná.',
        'content-manager.actions.edit.error': 'Počas úpravy dokumentu došlo k chybe.',
        'content-manager.actions.edit.label': 'Upraviť',
        'content-manager.actions.unpublish.error': 'Počas odpublikovania dokumentu došlo k chybe.',
        'content-manager.actions.unpublish.dialog.body':
          'Ste si istý, že chcete odpublikovať tento dokument?',
        'content-manager.actions.unpublish.dialog.option.keep-draft':
          'Odpublikovať a ponechať posledný návrh',
        'content-manager.actions.unpublish.dialog.option.replace-draft':
          'Odpublikovať a nahradiť posledný návrh',
        'content-manager.containers.edit.tabs.draft': 'návrh',
        'content-manager.containers.edit.tabs.published': 'publikované',
        'content-manager.containers.List.modified': 'Upravené',
        'content-manager.containers.edit.panels.default.title': 'Záznam',

        'content-manager.containers.edit.information.last-published.label': 'Publikované',
        'content-manager.containers.edit.information.last-published.value':
          '{time}{isAnonymous, select, true {} other { ({author})}}',
        'content-manager.containers.edit.information.last-draft.label': 'Upravené',
        'content-manager.containers.edit.information.last-draft.value':
          '{time}{isAnonymous, select, true {} other { ({author})}}',
        'content-manager.containers.edit.information.document.label': 'Vytvorené',
        'content-manager.containers.edit.information.document.value':
          '{time}{isAnonymous, select, true {} other { ({author})}}',

        // icons in left menu
        'global.home': 'Domov',
        'content-manager.plugin.name': 'Správca obsahu',

        // dashboard
        'content-manager.widget.chart-entries.title': 'Záznamy',
        'content-manager.widget.chart-entries.tooltip': '{count} {label}',
        'content-manager.widget.last-edited.title': 'Naposledy upravené záznamy',
        'content-manager.widget.last-edited.single-type': 'Single-Type',
        'content-manager.widget.last-edited.no-data': 'Žiadne upravené záznamy',
        'content-manager.widget.last-published.title': 'Naposledy publikované záznamy',
        'content-manager.widget.last-published.no-data': 'Žiadne publikované záznamy',
        'HomePage.head.title': 'Homepage',
        'HomePage.header.title': 'Ahoj {name}',
        'HomePage.header.subtitle': 'Vitaj v administračnom rozhraní Strapi!',

        'global.profile': 'Profil',
        'global.profile.settings': 'Nastavenia profilu',

        'i18n.actions.delete.label': 'Vymazať záznam ({locale})',
        'i18n.CMEditViewLocalePicker.locale.create': 'Vytvoriť <bold>{locale}</bold> záznam',
        'i18n.CMEditViewBulkLocale.publish-title': 'Publikovať viaceré jazyky',
        'i18n.CMEditViewBulkLocale.unpublish-title': 'Odpublikovať viaceré jazyky',

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
  bootstrap(app: StrapiApp) {
    app.getPlugin("content-manager").injectComponent("listView", "actions", {
      name: "InternalJobsRunAction",
      Component: InternalJobsRunActions,
    })
  },
}
