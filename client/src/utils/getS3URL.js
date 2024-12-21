export const getS3URL = (img) =>{
    const time = Date.now();
    const fileExtension = img.name.split('.').pop();
    const filename = `shiksha_setu_image_s3_${time}.${fileExtension}`
    const URL = `${process.env.REACT_APP_S3_URL}${filename}`
    return {URL,filename};
}