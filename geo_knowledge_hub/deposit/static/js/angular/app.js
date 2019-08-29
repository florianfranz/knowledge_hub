import angular from 'angular';
import 'angular-file-upload/dist/angular-file-upload.min'

// Directives
import { dataSetDirective } from './directives/dataset.directive';
import { listItemDirective } from './directives/list-item.directive';
import { outputDirective } from './directives/output.directive';
import { publicationDirective } from './directives/publication.directive';
import { toolDirective } from './directives/tool.directive';
// Components
import { doiComponent } from './components/doi.component';
import { fileUploadComponent } from './components/file-upload.component';
// Services
import DOIService from './services/doi.service';


// Register Angular Application
angular
  .module('knowledge_hub.directives', ['angularFileUpload'])
  .component('doi', doiComponent)
  .component('fileUploader', fileUploadComponent)
  .directive('listItem', listItemDirective)
  .directive('output', outputDirective)
  .directive('publication', publicationDirective)
  .directive('dataset', dataSetDirective)
  .directive('tool', toolDirective)
  .service('DOIService', DOIService)
