'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { Trash } from 'lucide-react';

import { supabase } from '@/lib/supabase/client';

interface UploadFileProps {
  setImageUrlForm?: (url: string) => void;
}

export const Upload: React.FC<UploadFileProps> = ({ setImageUrlForm }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageUrl(URL.createObjectURL(file));
      await uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    const { data } = await supabase.storage.from('images').upload(`public/recipes/${file.name}`, file, {
      upsert: true
    });
    const { data: dataUrl } = supabase.storage.from('images').getPublicUrl(data?.path);

    setImageUrl(dataUrl.publicUrl);
    setImageUrlForm(dataUrl.publicUrl);
  };

  const handleClear = () => setImageUrl('');

  return (
    <div className='relative'>
      {imageUrl ? (
        <div className='w-full h-64'>
          <Image
            src={imageUrl}
            alt='Recipe'
            fill
            className='object-cover rounded-lg relative'
          />
          <Button
            className='absolute top-1 right-1 rounded-full h-6 w-6'
            variant='outline'
            size='icon'
            onClick={handleClear}>
            <Trash
              className='h-auto w-auto p-1'
              onClick={handleClear}
            />
          </Button>
        </div>
      ) : (
        <div className='grid gap-2'>
          <Label>Image</Label>
          <Input
            type='file'
            onChange={handleFileChange}
            accept='image/*'
          />
        </div>
      )}
    </div>
    // <div className='grid gap-2'>
    //   <Label>Image</Label>
    //   <Input
    //     type='file'
    //     onChange={handleFileChange}
    //   />
    //   <button onClick={handleUpload}>upload</button>
    //   {message}
    // </div>
  );
};
