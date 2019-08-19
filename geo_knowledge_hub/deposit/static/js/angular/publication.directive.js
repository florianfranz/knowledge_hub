class PublicationController {
  constructor($scope) {
    this.$scope = $scope;

    console.log('scope', $scope);
  }

  validate() {
    const { publication_title, publication_authors, publication_doi } = this.item;

    console.log(this);

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
    item: '='
  },
  controllerAs: '$ctrl',
  link: publicationLink,
  bindToController: true,
  template: `
    <div>
      <div class="form-group schema-form-text has-feedback">
        <label class="control-label " for="publications-{{ $ctrl.item.id }}-publication_doi">DOI</label>
        <input type="text" step="any" placeholder="" class="form-control"
               id="publications-{{ $ctrl.item.id }}-publication_doi"
               ng-model="$ctrl.item.publication_doi" name="publications-{{ $ctrl.item.id }}-publication_doi">
          <span ng-if="form.feedback !== false" class="form-control-feedback glyphicon"
                aria-hidden="true"></span>

      </div>

      <div class="form-group schema-form-text has-feedback">
        <label class="control-label " for="publications-{{ $ctrl.item.id }}-publication_title">Title</label>
        <input type="text" step="any" placeholder="" class="form-control"
               id="publications-{{ $ctrl.item.id }}-publication_title"
               ng-model="$ctrl.item.publication_title" name="publications-{{ $ctrl.item.id }}-publication_title">
          <span ng-if="form.feedback !== false" class="form-control-feedback glyphicon"
                aria-hidden="true"></span>
      </div>

      <div class="form-group schema-form-text has-feedback">
        <label class="control-label " for="publications-{{ $ctrl.item.id }}-publication_authors">Authors</label>
        <input type="text" step="any" placeholder="" class="form-control"
               id="publications-{{ $ctrl.item.id }}-publication_authors"
               ng-model="$ctrl.item.publication_authors" name="publications-{{ $ctrl.item.id }}-publication_authors">
          <span ng-if="form.feedback !== false" class="form-control-feedback glyphicon"
                aria-hidden="true"></span>
      </div>

      <div class="form-group schema-form-text has-feedback">
        <label class="control-label " for="publications-{{ $ctrl.item.id }}-publication_abstrac">Abstract</label>
        <textarea placeholder="" class="form-control"
                  id="publications-{{ $ctrl.item.id }}-publication_abstract"
                  ng-model="$ctrl.item.publication_abstract" name="publications-{{ $ctrl.item.id }}-publication_abstract">
      </div>
    </div>
  `
})
