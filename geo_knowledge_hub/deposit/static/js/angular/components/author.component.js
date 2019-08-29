class AuthorController {
  $onInit() {
    this.model = [];
    this.error = null;
  }

  addAuthor() {
    this.model.push(this.author);
    this.author = "";
  }

  removeAuthor(index) {
    console.log(this, index);
    if (this.model.length >= index) {
      return;
    }
    this.model.splice(index, 1);
  }
}
AuthorController.$inject = [];


export const authorComponent = {
  bindings: {
    id: '@',
    model: '='
  },
  controller: AuthorController,
  template: `
    <div class="row">
      <div class="col-md-12">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Author" ng-model="$ctrl.author">

          <span class="help-block" ng-if="!!$ctrl.error" ng-bind="$ctrl.error"></span>

          <span class="input-group-btn">
            <button class="btn btn-default" type="button" ng-click="$ctrl.addAuthor()">Add!</button>
          </span>
        </div><!-- /input-group -->
      </div><!-- /.col-md-12 -->

      <div class="col-md-12">
        <div class="author-list">
          <div class="form-group" ng-repeat="author in $ctrl.model track by $index">
            <div class="input-group">
              <label for="{{ $ctrl.id }}-{{ $index + 1 }}">Authors: </label>

              <span class="input-group-addon">Author {{ $index+1 }}</span>
              <input type="text" class="form-control""
                      placeholder="" aria-describedby="basic-addon{{ $index + 1 }}"
                      ng-model="$ctrl.model[$index]"
                      name="{{ $ctrl.id }}-{{ $index + 1 }}">
              <div class="input-group-btn">
                <button type="button" class="btn btn-danger" ng-click="$ctrl.removeAuthor($index)">
                  <i class="fa fa-trash"></i>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div><!-- /.row -->
  `
}
