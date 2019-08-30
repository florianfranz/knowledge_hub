class AuthorController {
  /** Initialize Author component variables */
  $onInit() {
    this.model = [];
    this.error = null;
  }

  /** Add a new Author to the stack */
  addAuthor() {
    if (!this.author)
      return;

    this.model.push(this.author);
    this.author = "";
  }

  /**
   * Remove an author from cached list
   *
   * @param {number} index Author index to remove
   */
  removeAuthor(index) {
    if (index >= 0 && index < this.model.length) {
      this.model.splice(index, 1);
    }
  }
}
// Angular injectors
AuthorController.$inject = [];

/**
 * Defines an Brazil Data Cube Author component.
 *
 * The model consists in a list of string.
 *
 * @example
 *
 * <author id="myCustomId" model="$ctrl.authors"></author>
 */
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
          <label for="{{ $ctrl.id }}">Authors: </label>

          <input type="text" id="{{ $ctrl.id }}"
                 class="form-control" placeholder="Author" ng-model="$ctrl.author">

          <span class="help-block" ng-if="!!$ctrl.error" ng-bind="$ctrl.error"></span>

          <span class="input-group-btn">
            <button class="btn btn-success" style="margin-top: 24px" type="button" ng-click="$ctrl.addAuthor()">
              <i class="fa fa-plus"></i>
            </button>
          </span>
        </div><!-- /input-group -->
      </div><!-- /.col-md-12 -->

      <div class="col-md-12">
        <div class="author-list">
          <div class="form-group" ng-repeat="author in $ctrl.model track by $index">
            <div class="input-group">
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
