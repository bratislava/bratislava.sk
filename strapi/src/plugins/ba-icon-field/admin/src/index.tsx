import { prefixPluginTranslations } from '@strapi/helper-plugin'

import pluginPkg from '../../package.json'
import pluginId from './pluginId'
import Initializer from './components/Initializer'
import PluginIcon from './components/PluginIcon'

const name = pluginPkg.strapi.name

export default {
  register(app: any) {
    app.customFields.register({
      name: 'icon-field',
      pluginId: 'ba-icon-field',
      type: 'string',
      intlLabel: {
        id: 'ba-icon-field.icon-field.label',
        defaultMessage: 'Icon',
      },
      intlDescription: {
        id: 'ba-icon-field.icon-field.description',
        defaultMessage: 'Icon from Bratislava Design System',
      },
      icon: PluginIcon,
      components: {
        Input: async () => import(/* webpackChunkName: "input-component" */ './components/Input'),
      },
      options: {},
    })
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    }

    app.registerPlugin(plugin)
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            }
          })
          .catch(() => {
            return {
              data: {},
              locale,
            }
          })
      })
    )

    return Promise.resolve(importedTrads)
  },
}
