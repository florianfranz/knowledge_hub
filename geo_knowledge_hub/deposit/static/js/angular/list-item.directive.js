/**
 * Creates angular directive for handling multiple insertion of generic items.
 *
 * This component consists in a kind of list, which you can insert new elements using "Add button".
 * Once add button clicked, it inserts a new element into internal data handling
 * and pass the instance element to the variable "$parent.item".
 *
 * The list-item directive calls "isValid" function to validates form elements. If you would like
 * to perform validation, you must insert a validator inside your component directive.
 * **Note** that you must insert only one validator, which may be one or multiple (array) validations.
 *
 * @example
 * angular.module('myApp', ['knowledge_hub.directives'])
 *   .directive('mydirective', () => ({
 *     restrict: 'EA',
 *     scope: {
 *       item: '='
 *     },
 *     require: ['^^listItem', 'mydirective'],
 *     controller: function() {
 *       this.validate = () => {
 *         // some validations
 *         return true;
 *       }
 *     },
 *     link: (scope, element, attrs, ctrls) => {
 *       const [ listItemCtrl, mydirectiveCtrl ] = ctrls;
 *
 *       // Inserting the validator form inside parent controller
 *       // Keeping the current caller (this)
 *       listItemCtrl.validators.push(mydirectiveCtrl.validate.bind(mydirectiveCtrl));
 *     }
 *   }))
 *
 * // In index.html
 * <list-item title="My Header" id="custom">
 *   <mydirective item="$parent.item"></mydirective>
 * </list-item>
 *
 * @returns {angular.IDirective}
 */
export function listItemDirective() {
  return {
    restrict: 'EA',
    controller: ['$scope', ListItemController],
    controllerAs: '$ctrl',
    scope: {
      title: '@'
    },
    bindToController: true,
    transclude: true,
    link: (scope, element, attrs, ctrl) => {

      if (attrs['title']) {
        ctrl.title = attrs.title;
      }

      ctrl.class_id = attrs.id;
    },
    template: `
      <div class="form-group">
        <h4 class=""><i class="icon-plus-sign-alt"></i> {{ $ctrl.title }}</h4>
        <hr>

        <div class="row">
          <div class="col-md-11">
            <div class="panel-group">
              <div class="panel panel-default" ng-repeat="item in $ctrl.items track by $index" >
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <a data-toggle="collapse" href="#collapse-{{$ctrl.class_id}}-{{$index}}">Item {{ $index + 1 }}</a>

                    <button ng-click="$ctrl.removeItem($index)"
                        style="position: relative; z-index: 20;"
                        type="button" class="close pull-right">
                      <span aria-hidden="true">×</span>
                      <span class="sr-only">Close</span>
                    </button>
                  </h4>
                </div>
                <div id="collapse-{{$ctrl.class_id}}-{{$index}}" class="panel-collapse collapse">
                  <div class="panel-body"><ng-transclude></ng-transclude></div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-1">
            <button type="button" ng-click="$ctrl.addItem()" class="btn btn-success pull-right">
              <i class="glyphicon glyphicon-plus"></i> New
            </button>
          </div>
        </div>
      </div>
    `,
  }

  /**
   * Controller handler to the directive "list-item"
   *
   * @param {angular.IScope} $scope
   */
  function ListItemController($scope) {
    this.items = [{ id: 1 }];
    this.$scope = $scope;
    this.validators = [];

    this.addItem = () => {
      if (!this.isValid()) {
        return alert('Fill all required fields before insert new one');
      }
//
//      const newItem = { id: ++this.items.length };
//
//      this.items.push(newItem);
    }

    this.removeItem = (index) => {
      if (this.items.length === 1) {
        return alert('At least one item required')
      }

      this.items.splice(index, 1);
      this.validators.splice(index, 1);
    }

    this.isValid = () => {
      if (this.validators.length === 0)
        return true;

      return this.validators.every(validators => {
        if (!Array.isArray(validators)) {
          validators = [validators]
        }

        return validators.every(fn => fn())
      });
    }
  }
}
