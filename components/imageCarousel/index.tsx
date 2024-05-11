import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselImage {
  src: string;
  alt?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<CarouselImage>(
    images.length > 0 ? images[0] : { src: '', alt: 'No image selected' },
  );

  // This effect will set the first image when images prop changes and is not empty
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (images.length === 0) {
    return <div>No images available</div>;
  }

  const aspectRatio = 16 / 9;
  const width = 400; // You can adjust this width as needed
  const height = width / aspectRatio;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: `${width}px`,
          height: `${height}px`, // Updated height for 16:9 aspect ratio
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid #ccc',
          marginBottom: '10px',
        }}
      >
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt || 'Selected image'}
          layout='fill'
          objectFit='contain'
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '10px',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              width: '50px',
              marginRight: '5px',
              cursor: 'pointer',
              border:
                selectedImage.src === image.src ? '2px solid blue' : 'none',
            }}
            onClick={() => {
              setSelectedImage(image);
            }}
          >
            <Image
              src={image.src}
              alt={image.alt || 'Thumbnail'}
              width={50}
              height={50}
              objectFit='cover'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
