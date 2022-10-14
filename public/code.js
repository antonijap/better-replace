'use strict';

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
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

figma.showUI(__html__, { themeColors: true, width: 200, height: 200 });
console.clear();
if (figma.currentPage.selection.length === 0) {
    figma.ui.postMessage("select-frame");
}
else {
    figma.ui.postMessage("frame-selected");
    figma.currentPage.selection.forEach(node => {
        const textNodes = node.findAll(node => { return node.type === "TEXT"; });
        console.log(textNodes.length); // 3x textNodes found
        return textNodes;
    });
}
figma.ui.onmessage = msg => {
    if (msg.type === 'replace-text') {
        let selectedFrame = figma.currentPage.selection;
        selectedFrame.forEach((node) => __awaiter(void 0, void 0, void 0, function* () {
            let textNodes = node.findAll(node => node.type === "TEXT" && node.characters === msg.search);
            textNodes.forEach((node) => __awaiter(void 0, void 0, void 0, function* () {
                yield figma.loadFontAsync(node.fontName);
                node.characters = msg.newText;
            }));
            // let selection = figma.currentPage.selection = textNodes
            // figma.viewport.scrollAndZoomIntoView(selection);
            figma.notify("Text replaced");
        }));
    }
    if (msg.type === 'cancel') {
        figma.closePlugin();
    }
};
