class OutputController {
  validate() {
    const { output_type, output_title, output_doi } = this.item;

    return !!output_type && !!output_title && !!output_doi;
  }
}

OutputController.$inject = ['$scope']

const outputLink = (scope, element, attr, ctrls) => {
  const [ listItemCtrl, outputCtrl ] = ctrls;

  // Inserting the validator form inside parent controller
  // Keeping the current caller (this)
  listItemCtrl.validators.push(outputCtrl.validate.bind(outputCtrl));
}

/**
 * Angular Directive for output
 *
 * @example
 * <output></output>
 */
export const outputDirective = () => ({
  restrict: 'EA',
  require: ['^^listItem', 'output'],
  controller: OutputController,
  scope: {
    item: '=',
  },
  controllerAs: '$ctrl',
  link: outputLink,
  bindToController: true,
  template: `
    <div class="row">
      <div class="col-md-12">
        <doi id="tools-{{ $ctrl.item.id }}-output" model="$ctrl.item.output_doi"></doi>
      </div>

      <div class="col-md-6">
        <div class="form-group schema-form-text has-feedback">
          <label class="control-label " for="tools-{{ $ctrl.item.id }}-output_type">Type of the Output</label>
          <input type="text" step="any" placeholder="" class="form-control"
                id="tools-{{ $ctrl.item.id }}-output_type"
                ng-model="$ctrl.item.output_type" name="tools-{{ $ctrl.item.id }}-output_type">
        </div>
      </div>

      <div class="col-md-12">
        <div class="form-group schema-form-text has-feedback">
          <label class="control-label " for="tools-{{ $ctrl.item.id }}-output_title">Title of the Output</label>
          <input type="text" step="any" placeholder="" class="form-control"
                id="tools-{{ $ctrl.item.id }}-output_title"
                ng-model="$ctrl.item.output_title" name="tools-{{ $ctrl.item.id }}-output_title">
        </div>
      </div>

      <div class="col-md-12">
        <div class="form-group schema-form-text has-feedback">
          <label class="control-label " for="tools-{{ $ctrl.item.id }}-output_abstract">Abstract of the Output	</label>
          <textarea placeholder="" class="form-control"
                    id="tools-{{ $ctrl.item.id }}-output_abstract"
                    ng-model="$ctrl.item.output_abstract"
                    name="tools-{{ $ctrl.item.id }}-output_abstract">
          </textarea>
        </div>
      </div>

      <div class="col-md-12">
        <div class="form-group schema-form-text has-feedback">
          <label class="control-label " for="tools-{{ $ctrl.item.id }}-output_link">Link to the Output</label>
          <input type="text" step="any" placeholder="" class="form-control"
                id="tools-{{ $ctrl.item.id }}-output_link"
                ng-model="$ctrl.item.output_link" name="tools-{{ $ctrl.item.id }}-output_link">
        </div>
      </div>
    </div>
  `
})
