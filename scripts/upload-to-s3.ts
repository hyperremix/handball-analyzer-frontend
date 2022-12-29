import * as AWS from 'aws-sdk';
import dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const BUCKET_NAME = 'hyperremix-amplify-deployment';
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const S3_UPLOAD_FILENAME = process.env.S3_UPLOAD_FILENAME;

const s3bucket = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const uploadToS3 = (filename: string): Promise<any> => {
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !S3_UPLOAD_FILENAME || !BUCKET_NAME) {
    throw new Error('Missing environment variables');
  }

  const readStream = fs.createReadStream(`build/${filename}`);

  const params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: readStream,
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
      readStream.destroy();

      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
};

const run = async () => {
  try {
    const filename = `${S3_UPLOAD_FILENAME}.zip`;
    console.log(`Uploading ${filename} to S3 bucket ${BUCKET_NAME}...`);
    await uploadToS3(filename);
    console.log('Upload successful!');
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
};

run();
