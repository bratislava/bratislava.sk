import type { Ginis } from '@/ginis-sdk'
import { GinisError } from '@/ginis-sdk'
import { getGRestHeader, GRestHeader, makeAxiosRequest } from '@/ginis-sdk/utils/api'

export type DetailElPodaniRequest = {
  'Id-zpravy'?: string
  'Id-el-podani'?: string
  'Id-esu'?: string
  'Id-eu'?: string
  'Zaradit-navazane'?: string
}

export type DetailElPodaniXrg = {
  DetailElPodani: {
    DatumPrijeti: string
    StavZpracovani: string
    DuvodOdmitnuti?: string
    StavPodaniKod: string
    StavPodaniText?: string
    StavOdpovediKod: string
    StavOdpovediText?: string
    IdDokumentu: string
    Vec?: string
    SpisZnacka?: string
    Znacka?: string
  }[]
  NavazanyDokument?: {
    IdDokumentu: string
    Vec?: string
    SpisZnacka?: string
    Znacka?: string
  }
}

export type DetailElPodaniResponse = {
  GRestHeader: GRestHeader
  Xrg: DetailElPodaniXrg
}

export async function detailElPodani(
  this: Ginis,
  bodyObj: DetailElPodaniRequest,
): Promise<DetailElPodaniXrg> {
  const url = this.config.urls.pod
  if (!url) throw new GinisError('GINIS SDK Error: Missing POD url in GINIS config')
  const response = await makeAxiosRequest<DetailElPodaniResponse>(
    undefined,
    `${url}/json/Detail-el-podani`,
    {
      GRestHeader: getGRestHeader(
        this.config,
        'http://www.gordic.cz/xrg/pod/detail-el-podani/request/v_1.0.0.0',
      ),
      Xrg: { 'Detail-el-podani': bodyObj },
    },
    this.config.debug,
  )
  return response.data.Xrg
}
