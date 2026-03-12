import { ginis } from '@/src/services/ginis/ginis'

export const getOfficialBoardFileStream = async (fileId: string) => {
  try {
    return await ginis.ude.nacistSouborStream({
      'Id-souboru': fileId,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)

    return null
  }
}
