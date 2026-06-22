export type SlideShowSlide = {
  url: string
  caption: string
}

export type SlideShowAddCommandPayload = {
  slides: SlideShowSlide[]
}
