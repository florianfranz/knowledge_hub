import $ from 'jquery';


async function doRequest(url, method, options) {
  return $.ajax({
      method,
      url,
      dataType: 'json',
      ...options
    });
}


export async function listFilesFromBucket(bucket) {
  const url = 'https://127.0.0.1:5000/api/files/' + bucket;

  let files = [];
  try {
    const response = await doRequest(url, 'GET');

    if (response.contents) {
      files = response.contents.map(meta => ({ name: meta.key, url: meta.links.self }));
    }
  } catch (err) {
    console.warn(`No files in bucket ${bucket}`)
  } finally {
    return files;
  }
}
