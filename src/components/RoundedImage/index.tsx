
import './styles.css';

type Props = {
  src: string;
  alt: string;
  width?: number
}

const RoundedImage = ({ src, alt, width = undefined }: Props) => {
  return (
    <img src={src} alt={alt}
      className={`rounded_image ${width ? `px${width}` : ''}`}
    />
  )
}

export default RoundedImage;
