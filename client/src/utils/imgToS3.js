import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import { getS3ImgURL } from './getS3ImgURL';

const imgToS3 = async(img) => {
    const S3_BUCKET = process.env.REACT_APP_S3_BUCKET; 
    const REGION = process.env.REACT_APP_REGION; 
    const {URL, filename} = getS3ImgURL(img);

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_accessKeyId,
      secretAccessKey: process.env.REACT_APP_secretAccessKey,
    });

    const s3 = new S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: filename,
      Body: img,
    };

    try {
      const upload = await s3.putObject(params).promise();
      console.log(upload);
      return URL;
    } catch (error) {
      console.error(error);
      alert("Error uploading file: " + error.message); 
    }
  };

export default imgToS3;