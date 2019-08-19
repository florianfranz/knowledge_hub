import angular from 'angular';

import { dataSetDirective } from './dataset.directive';
import { listItemDirective } from './list-item.directive';
import { publicationDirective } from './publication.directive';


// Register Angular Application
angular
  .module('knowledge_hub.directives', [])
  .directive('listItem', listItemDirective)
  .directive('publication', publicationDirective)
  .directive('dataset', dataSetDirective)