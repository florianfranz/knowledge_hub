class PublicationController {
  constructor($scope) {
    this.$scope = $scope;
  }

  validate() {
    const { publication_title, publication_authors, publication_doi } = this.item;

    console.log("Validating publication", this);

    return !!publication_title && !!publication_authors && !!publication_doi;
  }
}

PublicationController.$inject = ['$scope']

const publicationLink = (scope, element, attr, ctrls) => {
  const [ listItemCtrl, publicationCtrl ] = ctrls;

  // Inserting the validator form inside parent controller
  // Keeping the current caller (this)
  listItemCtrl.validators.push(publicationCtrl.validate.bind(publicationCtrl));
}

/**
 * Angular Directive for Publication
 *
 * @example
 * <publication></publication>
 */
export const publicationDirective = () => ({
  restrict: 'EA',
  require: ['^^listItem', 'publication'],
  controller: PublicationController,
  scope: {
    id: '<',
    item: '=',
  },
  controllerAs: '$ctrl',
  link: publicationLink,
  bindToController: true,
  template: `
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <file-uploader bucket=""></file-uploader>
        </div>
      </div>

      <div class="col-md-12">
        <doi id="publications-{{ $ctrl.id }}-publication" model="$ctrl.item.publication_doi"></doi>
      </div>

      <div class="col-md-12">
        <div class="form-group schema-form-text has-feedback">
          <label class="control-label " for="publications-{{ $ctrl.id }}-publication_title">Title</label>
          <input type="text" step="any" placeholder="" class="form-control"
                id="publications-{{ $ctrl.id }}-publication_title"
                ng-model="$ctrl.item.publication_title" name="publications-{{ $ctrl.id }}-publication_title">
        </div>
      </div>

      <div class="col-md-12">
        <author id="publications-{{ $ctrl.id }}-publication_authors" model="$ctrl.item.publication_authors"></author>
      </div>

      <div class="col-md-12">
        <div class="form-group schema-form-text has-feedback">
          <label class="control-label " for="publications-{{ $ctrl.id }}-publication_abstract">Abstract</label>
          <textarea placeholder="" class="form-control"
                    id="publications-{{ $ctrl.id }}-publication_abstract"
                    ng-model="$ctrl.item.publication_abstract"
                    name="publications-{{ $ctrl.id }}-publication_abstract">
          </textarea>
        </div>
      </div>
    </div>
  `
})
