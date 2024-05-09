"use client";

import { ChangeEvent } from "react";
import * as tus from "tus-js-client";

export default function Home() {
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    console.log("env", process.env.NEXT_PUBLIC_UPLOAD_API);

    // Create a new tus upload
    const upload = new tus.Upload(file, {
      // Endpoint is the upload creation URL from your tus server
      endpoint: process.env.NEXT_PUBLIC_UPLOAD_API,
      // Retry delays will enable tus-js-client to automatically retry on errors
      retryDelays: [0, 3000, 5000, 10000, 20000],
      // Attach additional meta data about the file for the server
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      // Callback for errors which cannot be fixed using retries
      onError: function (error) {
        console.log("Failed because: " + error);
      },
      // Callback for reporting upload progress
      onProgress: function (bytesUploaded, bytesTotal) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + "%");
      },
      // Callback for once the upload is completed
      onSuccess: function () {
        console.log(
          "Download %s from %s",
          (upload.file as File).name,
          upload.url
        );
      },
    });

    // Check if there are any previous uploads to continue.
    upload.findPreviousUploads().then(function (previousUploads) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      // Start the upload
      upload.start();
    });

    // reset
    event.target.value = "";
  };
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}
