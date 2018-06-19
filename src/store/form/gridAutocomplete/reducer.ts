import { GridAutocompleteState } from "../../../state";
import { SET_GRID_AUTOCOMPLETE } from "../../actions";
import { GridAction } from "./actions";

export default (state: GridAutocompleteState = {}, action: GridAction): GridAutocompleteState => {
	if (action.type === SET_GRID_AUTOCOMPLETE) {
		return {
			...state,
			[action.IATA]: action.suggestions
		};
	}

	return state;
};
