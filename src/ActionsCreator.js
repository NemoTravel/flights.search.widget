export default class ActionsCreator {
	static get TOGGLE_BLOCK() {
		return 'TOGGLE_BLOCK';
	}
	
	static toggleBlock(blockName) {
		return { 
			type: ActionsCreator.TOGGLE_BLOCK, 
			blockName 
		}
	}
}