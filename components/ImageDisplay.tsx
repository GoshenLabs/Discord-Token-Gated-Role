// ImageDisplay.tsx
import { Image } from '@chakra-ui/react';

interface ImageDisplayProps {
  src: string;
  alt: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      boxSize="300px"
      maxHeight={300}
      maxWidth={300}
      objectFit="cover"
      borderRadius="md"
      boxShadow="lg"
    />
  );
};

export default ImageDisplay;

