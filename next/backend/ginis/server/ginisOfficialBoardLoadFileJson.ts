import { ginis } from '@backend/ginis/ginis'

import { NacistSouborResponseXrg } from '../../../ginis/api/json/ude/nacist-soubor'

export const getUDEDocumentFileJson = async (fileId: string) => {
  let loadedFile: NacistSouborResponseXrg['NacistSoubor']

  try {
    /**
     * The `bodyObj` uses same keys as the requests in Ginis docs, i.e. https://robot.gordic.cz/xrg/Default.html?c=OpenMethodDetail&moduleName=UDE&version=524&methodName=nacist-soubor&type=request#
     * It will throw an Axios error if the request fails.
     *
     * IMPORTANT: The order of the keys in the `bodyObj` is important, as it has to match the order in the Ginis docs.
     * Otherwise, it will throw 400 Bad Request error.
     */
    const dataXrg = await ginis.json.ude.nacistSoubor({
      'Id-souboru': fileId,
    })

    loadedFile = dataXrg.NacistSoubor

    if (Array.isArray(loadedFile)) {
      // do nothing
    } else if (typeof loadedFile === 'object') {
      loadedFile = [loadedFile]
    } else {
      loadedFile = []
    }

    return loadedFile
  } catch (error) {
    // TODO handle error
    console.log(error)
  }
}
