import $ from 'jquery';
import 'bootstrap-fileinput/js/fileinput.min.js';
import { listFilesFromBucket } from './utils';


$(document).ready(function() {
  let bucket_id = $('form[data-bucket-id]').attr('data-bucket-id');

  const hiddenField = $('#bucket');

  if (!bucket_id) {
    bucket_id = localStorage.getItem('bucket_id');
  }

  getOrCreateBucket()

  function getOrCreateBucket() {
    let url = 'https://127.0.0.1:5000/deposit/create-bucket';

    if (bucket_id) {
        url = url + '/' + bucket_id;
    }

    $.ajax({
        method: 'POST',
        url
      })
      .then(async response => {
        console.log("deu bucket", response)
        bucket_id = response.bucket_id

        localStorage.setItem('bucket_id', bucket_id);

        // Setting bucket to the hidden field and send to invenio
        $(hiddenField).val(bucket_id);

        const filesInBucket = await listFilesFromBucket(bucket_id);

        const initialData = filesInBucket.map(fileMeta => (
          {
            caption: fileMeta.name,
            ...fileMeta
            //url: '/deposit/files/' + bucket_id
          }
        ))

        console.log(initialData);

        $("#document").fileinput({
          uploadUrl: "https://127.0.0.1:5000/deposit/buckets/" + bucket_id,
          uploadAsync: false,
          maxFilesNum: 10,
          browseOnZoneClick: true,
          overwriteInitial: false,
          deleteUrl: '/deposit/files-delete/' + bucket_id,
          initialPreviewAsData: false,
          initialPreviewConfig: initialData,
          required: false,
          minFileCount: 0,
        })
        .on('fileuploaded', function(e, params) {
          console.log(e, params)
        });
      })
      .catch(error => {
        console.error('Error', error)
      })
  }

  $('input[type=file]').on('change', (evt) => {
    console.log('Changed', evt.target.files);
  })

  $('a[id=fileUpload]').on('click', () => {
    const file = $('input[type=file]').prop('files')[0];

    const url = 'https://127.0.0.1:5000/deposit/buckets/' + bucket_id + '/' + file.name;

    const data = new FormData()

    data.append('file', file);

    console.log('form', data.get('file'));

    $.ajax({
        method: 'PUT',
        url: url,
        data: data,
        processData: false,
        dataType: 'json',
        deleteUrl: '/deposit/files-delete/' + bucket_id,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(response => {
        console.log("deu", response)
      })
      .catch(error => {
        console.error('Error', error)
      })

  })

})
