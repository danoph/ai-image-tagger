import type { NextApiRequest, NextApiResponse } from 'next'
import { RekognitionClient, DetectLabelsCommand } from "@aws-sdk/client-rekognition";

// NOTE: these are named differently than the normal AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
// because Vercel does not allow you to set those environment variables for a deployment
const client = new RekognitionClient({});

const getImageLabels = async (base64EncodedImage: Uint8Array) => {
  const response = await client.send(
    new DetectLabelsCommand({
      Image: {
        Bytes: base64EncodedImage
      }
    })
  );

  console.log('response', JSON.stringify(response, null, 2));

  return response.Labels;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //console.log('req.body', req.body);
  console.log('req', req);

  //const labels = await getImageLabels(key);

  const labels = {};

  res.status(200).json(labels);
}
