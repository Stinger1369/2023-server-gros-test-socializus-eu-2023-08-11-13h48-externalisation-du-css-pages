import { PixelCrop } from 'react-image-crop'

const TO_RADIANS = Math.PI / 180

export async function canvasPreview(
  image,
  canvas,
  crop,
  scale = 1,
  rotate = 0,
  fileSizeInMb,
  profilePicture
) {
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  //const pixelRatio = window.devicePixelRatio
  // const pixelRatio = 1
  //(Fr) Definir la valeur pixelRatio à 0.3 permettant de reduire la taille de l'image ainsi que sa taille de stockage
  //interet : La taille de l'image à été réduite à 30% car la plupart des portables propose des images qui sont extrement volumineuse et sans intéret sur un téléphone 
  //Ne pas reduire la taille de l'image si la taille du fichier est inférieur à 400ko, car cela rend les images illisibles
  var pixelRatio;
  if(fileSizeInMb > 0.4 && profilePicture === true){
    pixelRatio = 0.3;
  }
  if(fileSizeInMb > 0.4 && profilePicture === false){
    pixelRatio = 0.5;
  }
  if(fileSizeInMb <= 0.4){
    pixelRatio = 1;
  }

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const rotateRads = rotate * TO_RADIANS
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY)
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY)
  // 3) Rotate around the origin
  ctx.rotate(rotateRads)
  // 2) Scale the image
  ctx.scale(scale, scale)
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  )

  ctx.restore()
}
