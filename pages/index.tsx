import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  const onFileChanged = event => {
    const file = event.target.files[0];

    const uploadFile = async () => {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/classify-image", {
        method: "POST",
        body: formData
      });

      console.log('response', response);
    }

    uploadFile();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Image Classifier</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
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
      </main>
    </div>
  )
}

export default Home
