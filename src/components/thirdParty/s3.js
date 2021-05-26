
import React, { useRef, useState } from 'react';
import { uploadFile } from 'react-s3';
import dayjs from "dayjs";

import { config } from "@config";
import Input from '@common/Input';

const S3Upload = props => {

  const {
    multiple = false, onUpload, accept = "*", error, helperText,
    label = "Upload Resume", value, disabled = false, directory = "resume",
    fileName, showChildren = false, children
  } = props;

  const [uploading, setUploading] = useState(false);

  const file = useRef(null)

  const s3config = {
    bucketName: config.AMAZON_S3_BUCKET,
    region: config.AMAZON_REGION,
    accessKeyId: process.env.AMAZON_ACCESS_KEY,
    secretAccessKey: process.env.AMAZON_SECRET_KEY,
    dirName: directory
  }

  const handleUpload = async (file) => {
    setUploading(true);
    uploadFile(file, s3config)
      .then(data => {
        setUploading(false);
        onUpload(data);
      })
      .catch(err => {
        setUploading(false);
        console.error(err)
      })
  }

  const handleFileInput = ({ target }) => {
    let files = Array.from(target.files);
    for (let i = 0; i < files.length; i++) {
      const name = fileName ? `${fileName}.${files[i].name.split(".")[1]}` : files[i].name;
      const new_file = new File([files[i]], name);
      handleUpload(new_file)
    }
  }

  return (
    <div onClick={() => file.current.click()}>
      {showChildren
        ? children
        : <Input
          label={label}
          name="file"
          value={!!value ? value : (uploading ? 'uploading...' : '')}
          readOnly={true}
          error={error}
          helperText={helperText}
          disabled={disabled}
        />
      }
      <input
        multiple={multiple}
        type="file"
        onChange={handleFileInput}
        accept={accept}
        ref={file}
        disabled={uploading || disabled}
        hidden
      />
    </div>
  )
}

export default S3Upload;
