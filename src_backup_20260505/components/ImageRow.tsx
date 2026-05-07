import React from 'react';

type Props = { images: string[] };

const ImageRow: React.FC<Props> = ({ images }) => {
  const items = images.slice(0, 3);
  return (
    <div className="grid grid-cols-3 gap-4 my-6">
      {items.map((src, i) => (
        <div key={i} className="h-28 md:h-40 overflow-hidden rounded shadow-sm">
          <img src={src} alt={`gallery-${i}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default ImageRow;
