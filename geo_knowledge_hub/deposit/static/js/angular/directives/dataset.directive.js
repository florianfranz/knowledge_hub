class DataSetController {
  constructor($scope) {
    this.$scope = $scope;

    console.log('Create dataset', $scope, this);
  }

  validate() {
    const { dataset_creator, dataset_type, dataset_doi } = this.item;

    console.log("Validating dataset", this);

    return !!dataset_creator && !!dataset_type && !!dataset_doi;
  }
}

DataSetController.$inject = ['$scope']

const dataSetLink = (scope, element, attr, ctrls) => {
  const [ listItemCtrl, dataSetCtrl ] = ctrls;

  // Inserting the validator form inside parent controller
  // Keeping the current caller (this)
  listItemCtrl.validators.push(dataSetCtrl.validate.bind(dataSetCtrl));
}

/**
 * Angular Directive for dataset
 *
 * @example
 * <dataset></dataset>
 */
export const dataSetDirective = () => ({
  restrict: 'EA',
  require: ['^^listItem', 'dataset'],
  controller: DataSetController,
  scope: {
    id: '<',
    item: '='
  },
  controllerAs: '$ctrl',
  link: dataSetLink,
  bindToController: true,
  template: `
    <div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <file-uploader bucket=""></file-uploader>
          </div>
        </div>

        <div class="col-md-12">
          <doi id="datasets-{{ $ctrl.id }}-dataset" model="$ctrl.item.dataset_doi"></doi>
        </div>

        <div class="col-md-6">
          <div class="form-group schema-form-text has-feedback">
            <label class="control-label " for="datasets-{{ $ctrl.id }}-dataset_creator">Creator</label>
            <input type="text" step="any" placeholder="" class="form-control"
                   id="datasets-{{ $ctrl.id }}-dataset_creator"
                   ng-model="$ctrl.item.dataset_creator" name="datasets-{{ $ctrl.id }}-dataset_creator">
              <span ng-if="form.feedback !== false" class="form-control-feedback glyphicon"
                    aria-hidden="true"></span>
          </div>
        </div> <!-- end col-md-6 -->

        <div class="col-md-6">
          <div class="form-group schema-form-text has-feedback">
            <label class="control-label " for="datasets-{{ $ctrl.id }}-dataset_type">Type</label>
            <input type="text" step="any" placeholder="" class="form-control"
                   id="datasets-{{ $ctrl.id }}-dataset_type"
                   ng-model="$ctrl.item.dataset_type" name="datasets-{{ $ctrl.id }}-dataset_type">
              <span ng-if="form.feedback !== false" class="form-control-feedback glyphicon"
                    aria-hidden="true"></span>
          </div>
        </div> <!-- end col-md-6 -->

        <div class="col-md-6">
          <div class="form-group schema-form-text has-feedback">
            <label class="control-label " for="datasets-{{ $ctrl.id }}-dataset_link">Link</label>
            <input type="text" step="any" placeholder="" class="form-control"
                  id="datasets-{{ $ctrl.id }}-dataset_link"
                  ng-model="$ctrl.item.dataset_link" name="datasets-{{ $ctrl.id }}-dataset_link">
              <span ng-if="form.feedback !== false" class="form-control-feedback glyphicon"
                    aria-hidden="true"></span>
          </div> <!-- end col-md-6 -->
        </div>

        <div class="col-md-12">
          <div class="form-group schema-form-text has-feedback">
            <label class="control-label " for="datasets-{{ $ctrl.id }}-dataset_title">Title</label>
            <input type="text" step="any" placeholder="" class="form-control"
                  id="datasets-{{ $ctrl.id }}-dataset_title"
                  ng-model="$ctrl.item.dataset_title" name="datasets-{{ $ctrl.id }}-dataset_title">
              <span ng-if="form.feedback !== false" class="form-control-feedback glyphicon"
                    aria-hidden="true"></span>
          </div>
        </div> <!-- end col-md-6 -->

        <div class="col-md-12">
          <div class="form-group schema-form-text has-feedback">
            <label class="control-label " for="datasets-{{ $ctrl.id }}-dataset_abstract">Abstract</label>
            <textarea placeholder="" class="form-control"
                      id="datasets-{{ $ctrl.id }}-dataset_abstract"
                      ng-model="$ctrl.item.dataset_abstract" name="datasets-{{ $ctrl.id }}-dataset_abstract">
            </textarea>
          </div>
        </div>
      </div>
    </div>
  `
})
