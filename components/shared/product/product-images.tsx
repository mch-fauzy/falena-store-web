'use client';
import {useState} from 'react'; // For using useState must have `use client`
import Image from 'next/image';

import {cn} from '@/lib/utils';

interface ProductImagesProps {
  images: string[];
  name: string;
}

const ProductImages = (props: ProductImagesProps) => {
  const {images, name} = props;

  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    /* Gets bounding box of the image container */
    const {left, top, width, height} = e.currentTarget.getBoundingClientRect();

    /* Calculates cursor position as a percentage */
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({x, y});
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    /* Only zoom on real mouse */
    if (e.pointerType === 'mouse') {
      setZoom(true);
    }
  };

  if (!images.length) return null;

  return (
    <div className="space-y-4">
      {/* Current image */}
      <div
        /* `overflow-hidden` Prevents the zoomed image from overflowing */
        className="overflow-hidden rounded-md"
        onPointerEnter={handlePointerEnter}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={images[current]}
          alt={`${name} Image ${current}`}
          width={1000}
          height={1000}
          priority // Ensures the main image loads fast for LCP
          className={cn(
            'min-h-[300px] object-cover object-center rounded-md',
            zoom ? 'scale-200' : 'scale-100',
          )}
          /* `transformOrigin` follows the cursor position */
          style={{
            transformOrigin: `${position.x}% ${position.y}%`,
          }}
        />
      </div>
      {/* Image selector */}
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => current !== index && setCurrent(index)} // Prevents unnecessary re-renders
            className={cn(
              'border-2 cursor-pointer hover:border-orange-600 rounded-md',
              current === index && 'border-orange-400',
            )}
          >
            <Image
              src={image}
              alt={`${name} Image Thumbnail ${index}`}
              width={100}
              height={100}
              className="rounded-sm"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export {ProductImages};
