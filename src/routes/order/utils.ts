import type { OrderLineData, PizzaSize, PizzaTopping } from '$lib/supabase/types_extended';
import { roundToDecimalPlaces } from '$lib/utils';
import type { SelectedToppings } from '../../components/topping_selector/types';

interface ConvertSelectionToLineOrderProps {
	lineTotal: number;
	pizzaSize: PizzaSize;
	selectedToppings: SelectedToppings;
	allToppings: PizzaTopping[];
}

/// One customer selection is converted into a OrderLine and added to the cart.
export const convertSelectionToOrderData = ({
	lineTotal,
	pizzaSize,
	selectedToppings,
	allToppings
}: ConvertSelectionToLineOrderProps): OrderLineData => {
	return {
		line_total: lineTotal,
		pizza_size_id: pizzaSize.id,
		toppings: Object.entries(selectedToppings)
			.filter(([, v]) => v > 0)
			.reduce((acum, [toppingId, quantity]) => {
				const toppingName = allToppings.find((t) => t.id === parseInt(toppingId))!.name;
				acum[toppingName] = quantity;
				return acum;
			}, {} as Record<string, number>)
	};
};

export const calculateOrderTotal = (orderLines: OrderLineData[]) => {
	return roundToDecimalPlaces(
		orderLines.reduce((acum, next) => acum + next.line_total, 0),
		2
	);
};
