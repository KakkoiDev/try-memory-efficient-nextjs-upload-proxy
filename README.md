# Try Memory Efficient NextJS Upload Proxy

Their is a memory leak when trying to upload a file through the proxy, the file is loaded in memory and released only when the server is shutdown.

![demo](demo.gif)

## Setup

`npm i`

`npm run dev`

## Test

In the `.env.local` file you can comment/uncomment the `NEXT_PUBLIC_UPLOAD_URL` to choose if you want to pass through the middleware or not.

Files are uploaded in the `files` directory.

⚠️ Since this project is using TUS, empty your localstorage if you want to upload the same file twice.

## Resources

TUS: resumable upload: https://tus.io/
