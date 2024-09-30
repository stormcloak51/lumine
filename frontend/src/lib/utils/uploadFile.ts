// utils/uploadToB2.ts
import b2 from './b2conf';

export const uploadFile = async (file: File) => {
  try {
		console.log(process.env.B2_BUCKET_NAME, 'thj')
    await b2.authorize(

		);

    const { data: { uploadUrl, authorizationToken } } = await b2.getUploadUrl({
      bucketId: process.env.B2_BUCKET_ID!,
    });

    const fileName = `${Date.now()}-${file.name}`;
    const fileContent = await file.arrayBuffer();

    const { data } = await b2.uploadFile({
      uploadUrl: uploadUrl,
      uploadAuthToken: authorizationToken,
      fileName: fileName,
      data: fileContent,
      contentType: file.type,
    });

    const fileUrl = `https://f002.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${fileName}`;
    return fileUrl;
  } catch (error) {
    console.error('Error uploading file to B2:', error);
    throw error;
  }
};