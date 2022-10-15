"use strict";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */function e(e,t,n,o){return new(n||(n=Promise))((function(i,a){function c(e){try{f(o.next(e))}catch(e){a(e)}}function r(e){try{f(o.throw(e))}catch(e){a(e)}}function f(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,r)}f((o=o.apply(e,t||[])).next())}))}figma.showUI(__html__,{themeColors:!0,width:200,height:128}),console.clear(),figma.currentPage.selection.length<1?figma.ui.postMessage("select-frame"):(figma.ui.postMessage("frame-selected"),figma.currentPage.selection.forEach(e=>{const t=e.findAll(e=>"TEXT"===e.type);return console.log(t.length),t})),figma.ui.onmessage=t=>{if("replace-text"===t.type){figma.currentPage.selection.forEach(n=>e(void 0,void 0,void 0,(function*(){n.findAll(e=>"TEXT"===e.type&&e.characters===t.searchtText).forEach(n=>e(void 0,void 0,void 0,(function*(){yield figma.loadFontAsync(n.fontName),n.characters=t.newText}))),figma.notify("Text replaced")})))}};
