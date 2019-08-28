import angular from 'angular';
// Directives
import { dataSetDirective } from './directives/dataset.directive';
import { listItemDirective } from './directives/list-item.directive';
import { outputDirective } from './directives/output.directive';
import { publicationDirective } from './directives/publication.directive';
import { toolDirective } from './directives/tool.directive';
// Components
import { doiComponent } from './components/doi.component';
// Services
import DOIService from './services/doi.service';


// Register Angular Application
angular
  .module('knowledge_hub.directives', [])
  .component('doi', doiComponent)
  .directive('listItem', listItemDirective)
  .directive('output', outputDirective)
  .directive('publication', publicationDirective)
  .directive('dataset', dataSetDirective)
  .directive('tool', toolDirective)
  .service('DOIService', DOIService);
