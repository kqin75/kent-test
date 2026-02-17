import { resolveImageUrl } from '../../utils/resolveImage'

interface QuestionImageProps {
  image: string
}

export default function QuestionImage({ image }: QuestionImageProps) {
  if (image.startsWith('<svg')) {
    return (
      <div
        className="flex justify-center my-4 [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:max-h-64"
        dangerouslySetInnerHTML={{ __html: image }}
      />
    )
  }

  return (
    <img
      src={resolveImageUrl(image)}
      alt="Question diagram"
      className="w-full rounded-lg border border-gray-200"
    />
  )
}
