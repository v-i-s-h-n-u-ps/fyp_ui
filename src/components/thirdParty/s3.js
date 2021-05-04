
import React, { useRef } from 'react';
import { uploadFile } from 'react-s3';

import { config } from "@config";
import Input from '@common/Input';

const S3Upload = props => {

  const {
    multiple = false, onUpload, accept = "*", error, helperText
  } = props;

  const file = useRef(null)

  const s3config = {
    bucketName: config.AMAZON_S3_BUCKET,
    region: config.AMAZON_REGION,
    accessKeyId: config.AMAZON_ACCESS_KEY,
    secretAccessKey: config.AMAZON_SECRET_KEY,
    dirName: "resume"
  }

  const handleUpload = async (file) => {
    uploadFile(file, s3config)
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  const handleFileInput = ({ target }) => {
    let files = Array.from(target.files);
    for (let i = 0; i < files.length; i++) {
      handleUpload(files[i])
    }
  }

  return (
    <div onClick={() => file.current.click()}>
      <Input
        label="Resume"
        name="file"
        value={''}
        readOnly={true}
        error={error}
        helperText={helperText}
      />
      <input
        multiple={multiple}
        type="file"
        onChange={handleFileInput}
        accept={accept}
        ref={file}
        hidden
      />
    </div>
  )
}

export default S3Upload;
