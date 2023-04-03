module.exports = {
  async beforeUpdate(result, params) {
    console.log(result)
    // const data = result.result
    // if (data.coverImage && result.coverImage !== data.coverImage) {
    // get cover image buffer
    const axios = require('axios')
    const coverImageResponse = await axios.get(
      'https://fastly.picsum.photos/id/58/200/300.jpg?hmac=qRT-eFOBMZ3y8sE79s2DVAruVf-Hzv_4x_vmXaqUIMk',
      {
        responseType: 'arraybuffer',
      }
    )
    const coverImageBuffer = Buffer.from(coverImageResponse.data)
    // resize image
    const sharp = require('sharp')
    const coverImageResizedBuffer = await sharp(coverImageBuffer).resize(678).toBuffer()
    // upload resized image
    const coverImageResizedFile = new File([coverImageResizedBuffer], 'coverImageResized.jpg', {
      type: data.pageBackgroundImage.mime,
    })
    const coverImageResizedUpload = await strapi.plugins.upload.services.upload.upload({
      data: {},
      files: coverImageResizedFile,
    })

    // update entity
    console.log(coverImageResizedUpload)
    // }
  },
}
