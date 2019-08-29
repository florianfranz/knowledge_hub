class DOIController {
  constructor(DOIService) {
    this.DOIService = DOIService;

    this.disabled = false;

    this.id = this.id || 'default';
  }

  reserveDOI() {
    this.disabled = true;
    this.model = this.DOIService.reserve();
  }

  searchDOI() {
    const { model } = this;

    const doiResult = this.DOIService.search(model);

    console.log(`DOI Search Result ${doiResult}`);
  }
}

DOIController.$inject = ['DOIService']

/**
 * Angular Directive for DOI
 *
 * It allows the user to inform a value and search for the
 * DOI on ....
 * You can also generate and reserve a DOI.
 *
 * @example
 * <doi></doi>
 */
export const doiComponent = {
  bindings: {
    id: '@',
    model: '='
  },
  controller: DOIController,
  template: `
    <div class="row">
      <div class="col-md-5">
        <div class="form-group">
          <div class="input-group">
            <label class="control-label" for="{{ $ctrl.id }}_doi">DOI of the Output</label>
            <input type="text" step="any" placeholder="" class="form-control"
                  id="{{ $ctrl.id }}_doi"
                  ng-model="$ctrl.model" name="{{ $ctrl.id }}_doi" ng-disabled="$ctrl.disabled">

            <div class="input-group-btn" style="padding-top: 24px;">
              <button class="btn btn-default" type="button" ng-click="$ctrl.searchDOI()">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-1">
        <div class="form-group">
          <div style="height: 25px;"></div>
          <button type="button" class="btn btn-default">
            <i class="fa fa-lock"></i> Reserve
          </button>
        </div>
      </div>
    </div>
  `
};
