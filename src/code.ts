figma.showUI(__html__, {themeColors: true, width: 200, height: 200});

console.clear()

if (figma.currentPage.selection.length === 0) { 
	figma.ui.postMessage("select-frame")
} else {
	figma.ui.postMessage("frame-selected")
	figma.currentPage.selection.forEach(node => {
		const textNodes = node.findAll(node => { return node.type === "TEXT" })
		console.log(textNodes.length) // 3x textNodes found
		return textNodes
	})
}

figma.ui.onmessage = msg => {
	if (msg.type === 'replace-text') {
		let selectedFrame = figma.currentPage.selection;
		selectedFrame.forEach(async node => {
			let textNodes = node.findAll(node => node.type === "TEXT" && node.characters === msg.search)
			textNodes.forEach(async node => {
				await figma.loadFontAsync(node.fontName)
				node.characters = msg.newText
			})
			// let selection = figma.currentPage.selection = textNodes
			// figma.viewport.scrollAndZoomIntoView(selection);
			figma.notify("Text replaced")
		})
	}

	if (msg.type === 'cancel') {
		figma.closePlugin();
	}
	
};
