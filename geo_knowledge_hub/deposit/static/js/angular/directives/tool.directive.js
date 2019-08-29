class ToolsController {
  constructor($scope) {
    this.$scope = $scope;
  }

  validate() {
    const { tool_type, tool_title, tool_doi } = this.item;

    return !!tool_type && !!tool_title && !!tool_doi;
  }
}

ToolsController.$inject = ['$scope']

const toolLink = (scope, element, attr, ctrls) => {
  const [ listItemCtrl, toolCtrl ] = ctrls;

  // Inserting the validator form inside parent controller
  // Keeping the current caller (this)
  listItemCtrl.validators.push(toolCtrl.validate.bind(toolCtrl));
}

/**
 * Angular Directive for tool
 *
 * @example
 * <tool></tool>
 */
export const toolDirective = () => ({
  restrict: 'EA',
  require: ['^^listItem', 'tool'],
  controller: ToolsController,
  scope: {
    item: '=',
  },
  controllerAs: '$ctrl',
  link: toolLink,
  bindToController: true,
  template: `
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <file-uploader bucket=""></file-uploader>
        </div>
      </div>

      <div class="col-md-12">
        <doi id="tools-{{ $ctrl.item.id }}-tool" model="$ctrl.item.tool_doi"></doi>
      </div>

      <div class="col-md-6">
        <div class="form-group schema-form-text has-feedback">
          <label class="control-label " for="tools-{{ $ctrl.item.id }}-tool_type">Type of the Tool</label>
          <input type="text" step="any" placeholder="" class="form-control"
                id="tools-{{ $ctrl.item.id }}-tool_type"
                ng-model="$ctrl.item.tool_type" name="tools-{{ $ctrl.item.id }}-tool_type">
        </div>
      </div>

      <div class="col-md-12">
        <div class="form-group schema-form-text has-feedback">
          <label class="control-label " for="tools-{{ $ctrl.item.id }}-tool_title">Title of the Tool</label>
          <input type="text" step="any" placeholder="" class="form-control"
                id="tools-{{ $ctrl.item.id }}-tool_title"
                ng-model="$ctrl.item.tool_title" name="tools-{{ $ctrl.item.id }}-tool_title">
        </div>
      </div>

      <div class="col-md-12">
        <div class="form-group schema-form-text has-feedback">
          <label class="control-label " for="tools-{{ $ctrl.item.id }}-tool_abstract">Abstract of the Tool	</label>
          <textarea placeholder="" class="form-control"
                    id="tools-{{ $ctrl.item.id }}-tool_abstract"
                    ng-model="$ctrl.item.tool_abstract"
                    name="tools-{{ $ctrl.item.id }}-tool_abstract">
          </textarea>
        </div>
      </div>

      <div class="col-md-12">
        <div class="form-group schema-form-text has-feedback">
          <label class="control-label " for="tools-{{ $ctrl.item.id }}-tool_link">Link to the Tool</label>
          <input type="text" step="any" placeholder="" class="form-control"
                id="tools-{{ $ctrl.item.id }}-tool_link"
                ng-model="$ctrl.item.tool_link" name="tools-{{ $ctrl.item.id }}-tool_link">
        </div>
      </div>
    </div>
  `
})
