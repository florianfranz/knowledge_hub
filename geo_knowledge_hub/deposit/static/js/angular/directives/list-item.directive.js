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
      title: '@',
      minItems: '=?'
    },
    bindToController: true,
    transclude: true,
    // template: '<ng-transclude></ng-transclude>',
    link: (scope, element, attrs, ctrl, transclude) => {

      if (attrs['title']) {
        ctrl.title = attrs.title;
      }

      ctrl.class_id = attrs.id;

      transclude(scope, clone => element.append(clone));
    }
  }

  /**
   * Controller handler to the directive "list-item"
   *
   * @param {angular.IScope} $scope
   */
  function ListItemController($scope) {
    if (!this.minItems) {
      this.minItems = 0;
    }

    this.items = [];

    for(let i = 0; i < this.minItems; ++i) {
      this.items.push({ id: i })
    }

    this.$scope = $scope;
    this.validators = [];

    this.addItem = (item) => {
//      if (!this.isValid()) {
//        return alert('Fill all required fields before insert new one');
//      }
      this.items.push(item);
    }

    this.removeItem = (index) => {
      if (this.items.length === this.minItems) {
        return alert(`At least ${this.minItems} item required.`)
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
