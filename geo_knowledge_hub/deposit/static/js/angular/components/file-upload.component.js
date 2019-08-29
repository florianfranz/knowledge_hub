import $ from 'jquery';


class FileUploadController {
  constructor(FileUploader, $http) {
    this.$http = $http;

    this.uploader = new FileUploader({ })

    console.log(this.uploader)

    this.getOrCreateBucket()
      .then(() => {
        console.log('component bucket', this);
        const url = "https://127.0.0.1:5000/deposit/buckets/" + this.bucket;
        this.uploader.url = url
      })

  }

  async getOrCreateBucket() {
    const hiddenField = $('#bucket');

    let bucket_id = $('form[data-bucket-id]').attr('data-bucket-id');

    if (!bucket_id) {
      bucket_id = localStorage.getItem('bucket_id');
    }

    let url = 'https://127.0.0.1:5000/deposit/create-bucket';

    if (bucket_id) {
      url = url + '/' + bucket_id;
    }

    const response = await this.$http.post(url, {});

    this.bucket = response.data.bucket_id;

    localStorage.setItem('bucket_id', this.bucket);

    // Setting bucket to the hidden field and send to invenio
    $(hiddenField).val(this.bucket);

    return;
  }
}

FileUploadController.$inject = ['FileUploader', '$http'];

export const fileUploadComponent = {
  bindings: {
    bucket: '='
  },
  controller: FileUploadController,
  template: `
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="row">
          <div class="col-md-10">
            <table class="table">
              <thead>
                <tr>
                  <th width="50%">Name</th>
                  <th ng-show="$ctrl.uploader.isHTML5">Size</th>
                  <th ng-show="$ctrl.uploader.isHTML5">Progress</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr ng-repeat="item in $ctrl.uploader.queue">
                  <td><strong>{{ item.file.name }}</strong></td>
                  <td ng-show="$ctrl.uploader.isHTML5" nowrap>{{ item.file.size/1024/1024|number:2 }} MB</td>
                  <td ng-show="$ctrl.uploader.isHTML5">
                    <div class="progress" style="margin-bottom: 0;">
                      <div class="progress-bar" role="progressbar" ng-style="{ 'width': item.progress + '%' }"></div>
                    </div>
                  </td>
                  <td class="text-center">
                    <span ng-show="item.isSuccess"><i class="glyphicon glyphicon-ok"></i></span>
                    <span ng-show="item.isCancel"><i class="glyphicon glyphicon-ban-circle"></i></span>
                    <span ng-show="item.isError"><i class="glyphicon glyphicon-remove"></i></span>
                  </td>
                  <td nowrap>
                    <button type="button" class="btn btn-success btn-xs" ng-click="item.upload()" ng-disabled="item.isReady || item.isUploading || item.isSuccess">
                      <span class="glyphicon glyphicon-upload"></span> Upload
                    </button>
                    <button type="button" class="btn btn-warning btn-xs" ng-click="item.cancel()" ng-disabled="!item.isUploading">
                      <span class="glyphicon glyphicon-ban-circle"></span> Cancel
                    </button>
                    <button type="button" class="btn btn-danger btn-xs" ng-click="item.remove()">
                      <span class="glyphicon glyphicon-trash"></span> Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="col-md-2">
            <div style="margin-top: 10px">
              <button type="button" class="btn btn-success btn-xs btn-block" ng-click="$ctrl.uploader.uploadAll()" ng-disabled="!$ctrl.uploader.getNotUploadedItems().length">
                <span class="glyphicon glyphicon-upload"></span> Upload all
              </button>
              <button type="button" class="btn btn-warning btn-xs btn-block" ng-click="$ctrl.uploader.cancelAll()" ng-disabled="!$ctrl.uploader.isUploading">
                <span class="glyphicon glyphicon-ban-circle"></span> Cancel all
              </button>
              <button type="button" class="btn btn-danger btn-xs btn-block" ng-click="$ctrl.uploader.clearQueue()" ng-disabled="!$ctrl.uploader.queue.length">
                <span class="glyphicon glyphicon-trash"></span> Remove all
              </button>
            </div>
          </div>

          <div class="col-md-12">
            <input type="file" nv-file-select="" name="document[]" uploader="$ctrl.uploader" multiple  /><br/>
          </div>

        </div>
      </div>
    </div>
  `
}
