import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageLabels, setImageLabels] = useState([]);

  const onFileChanged = event => {
    const file = event.target.files[0];

    setPreviewUrl(URL.createObjectURL(file));

    const uploadFile = async () => {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/classify-image", {
        method: "POST",
        body: formData
      });

      setImageLabels(await response.json());
    }

    uploadFile();
  };

  return (
    <div className="flex min-h-screen flex-col items-center py-2">
      <Head>
        <title>Image Classifier</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center px-20">
        <h1 className="text-6xl font-bold text-center">
          Image Labeler
        </h1>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <input
            id="file-upload"
            name="files"
            type="file"
            onChange={onFileChanged}
            accept="image/*"
          />
        </div>

        {previewUrl && (
          <div className="mt-6 h-96 aspect-w-10 aspect-h-7 block w-full overflow-hidden relative">
            <Image
              alt="file uploader preview"
              src={previewUrl}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              quality={100}
              className="pointer-events-none object-contain"
            />
          </div>
        )}

        {imageLabels.length > 0 && (
          <ul role="list" className="mt-6 max-w-md sm:w-full">
            {imageLabels.map((label, index) => (
              <li key={index} className="py-2 flex items-center justify-between">
                <div>
                  {label.Name}
                </div>
                <div className="text-lg font-bold">
                  {Math.round(label.Confidence)}%
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default Home
