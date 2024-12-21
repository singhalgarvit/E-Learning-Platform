import AWS from "aws-sdk";
import S3 from "aws-sdk/clients/s3";
import {getS3URL} from "../utils/getS3URL";
import {errorToast} from "../utils";
import {LoadingContext} from "../context/loadingContext";
import {useContext} from "react";

export const useS3 = () => {
  const {loading, setLoading} = useContext(LoadingContext);

  const uploadToS3 = async (img) => {
    setLoading(true);
    const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
    const REGION = process.env.REACT_APP_REGION;
    const {URL, filename} = getS3URL(img);

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_accessKeyId,
      secretAccessKey: process.env.REACT_APP_secretAccessKey,
    });

    const s3 = new S3({
      params: {Bucket: S3_BUCKET},
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
      errorToast("Error uploading file: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {uploadToS3};
};
