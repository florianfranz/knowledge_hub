import $ from 'jquery';
import { listFilesFromBucket } from './utils'


export async function createComponentListDownloads(bucket) {
  const ulComponent = document.createElement('ul');

  const files = await listFilesFromBucket(bucket);

  for(const file of files) {
    $(ulComponent).append(
      `<li>
        <a href="${file.url}">${file.name}</a>
        <button type="button" class="close" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </li>`);
  }

  $(ulComponent, 'button').on('click', () => {
    // Delete
    alert("TODO: delete");
  })

  return ulComponent;
}
