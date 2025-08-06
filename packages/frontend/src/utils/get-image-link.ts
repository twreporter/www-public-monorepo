type InstanceWithImage = {
  imageFile: { url: string }
}

export function getImageLink(item: InstanceWithImage) {
  const selfHostImage = item.imageFile.url
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_HOST}${selfHostImage}`
  return imageUrl
}
