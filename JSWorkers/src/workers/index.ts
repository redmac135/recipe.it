import generateCompleteRecipeWorker from "./generateCompleteRecipe";
import generatePartialRecipeWorker from "./generatePartialRecipe";
import generateGrocerySuggestionsWorker from "./generateGrocerySuggestions";
import parseReceiptTextWorker from "./parseReceiptText";

const workers = [
  generateCompleteRecipeWorker,
  generatePartialRecipeWorker,
  generateGrocerySuggestionsWorker,
  parseReceiptTextWorker,
];

export default workers;
