import { FC, useState, useEffect } from 'react';

type ThumbProps = {
  file: File | null;
};

export const Thumb: FC<ThumbProps> = ({ file }) => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [thumb, setThumb] = useState<string>();

  useEffect(() => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setThumb(reader.result as string);
      };
      setLoading(false);
    }
  }, [file]);

  if (!file) {
    return null;
  }

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <img
      src={thumb}
      alt={file.name}
      className="img-thumbnail mt-2"
      height={500}
      width={500}
    />
  );
};
