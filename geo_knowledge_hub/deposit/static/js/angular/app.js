import angular from 'angular';

import { dataSetDirective } from './directives/dataset.directive';
import { listItemDirective } from './directives/list-item.directive';
import { outputDirective } from './directives/output.directive';
import { publicationDirective } from './directives/publication.directive';
import { toolDirective } from './directives/tool.directive';


// Register Angular Application
angular
  .module('knowledge_hub.directives', [])
  .directive('listItem', listItemDirective)
  .directive('output', outputDirective)
  .directive('publication', publicationDirective)
  .directive('dataset', dataSetDirective)
  .directive('tool', toolDirective)
