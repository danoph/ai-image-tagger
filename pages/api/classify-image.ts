import type { NextApiRequest, NextApiResponse } from 'next'
import { RekognitionClient, DetectLabelsCommand } from "@aws-sdk/client-rekognition";
import { IncomingForm } from 'formidable';
import { readFileSync } from 'fs';

// we need to disable the default body parser since this endpoint is not accepting JSON
export const config = {
  api: {
    bodyParser: false,
  }
};

const client = new RekognitionClient({});

const getImageLabels = async (base64EncodedImage: Uint8Array) => {
  const response = await client.send(
    new DetectLabelsCommand({
      Image: {
        Bytes: base64EncodedImage
      }
    })
  );

  return response.Labels;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const imageBuffer = await (
    new Promise((resolve, reject) => {
      new IncomingForm().parse(req, (err, fields, files) => {
        resolve(readFileSync(files.file.filepath));
      });
    })
  );

  const labels = await getImageLabels(imageBuffer);

  res.status(200).json(labels);
}
