import superagent from 'superagent';
import sha1 from 'sha1';

const upload = (data) => {
  const cloudName = 'hellobookz';
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  const timestamp = Date.now() / 1000;
  const uploadPreset = 'iatwiohn';
  const paramsStr = `timestamp=\
${timestamp}&upload_preset=${uploadPreset}V9wVd_HdjhVrnZYCYyGo3mNszNE`;
  const signature = sha1(paramsStr);
  const params = {
    api_key: 471689873521792,
    timestamp,
    upload_preset: uploadPreset,
    signature,
  };
  const uploadRequest = superagent.post(url);
  uploadRequest.attach('file', data);
  Object.keys(params).forEach((key) => {
    uploadRequest.field(key, params[key]);
  });
  return uploadRequest;
};

const uploader = (data, uploadType) => {
  return new Promise((resolve, reject) => {
    return upload(data).end((error, response) => {
      if (error) {
        return reject({ error, uploadType });
      }
      return resolve({ response, uploadType });
    });
  });
};
export default uploader;