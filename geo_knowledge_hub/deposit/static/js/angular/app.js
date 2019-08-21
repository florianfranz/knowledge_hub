import angular from 'angular';

import { dataSetDirective } from './dataset.directive';
import { listItemDirective } from './list-item.directive';
import { outputDirective } from './output.directive';
import { publicationDirective } from './publication.directive';
import { toolDirective } from './tool.directive';


// Register Angular Application
angular
  .module('knowledge_hub.directives', [])
  .directive('listItem', listItemDirective)
  .directive('output', outputDirective)
  .directive('publication', publicationDirective)
  .directive('dataset', dataSetDirective)
  .directive('tool', toolDirective)