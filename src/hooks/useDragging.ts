import { RefObject, useEffect, useState } from "react";
import useMouse from "./useMouse";

const useDragging = (ref: RefObject<Element>) => {
	const [state, setState] = useState({
		dragged: false,
		offsetX: 0,
		startX: 0,
	});

	const { dragged, offsetX } = state;

	const mouse = useMouse();

	useEffect(() => {
		if (ref.current && mouse.left && !mouse.pleft) {
			const element = document.elementFromPoint(mouse.x, mouse.y);

			if (element === ref.current) {
				const rect = ref.current.getBoundingClientRect();

				setState((state) => ({
					...state,
					dragged: true,
					startX: mouse.x - rect.left,
				}));
			}
		}
	}, [mouse.left, mouse.pleft, mouse.x, mouse.y, ref]);

	useEffect(() => {
		if (!mouse.left) {
			setState((state) => ({
				...state,
				dragged: false,
			}));
		}
	}, [mouse.left]);

	useEffect(() => {
		if (ref.current && dragged && mouse.dx | mouse.dy) {
			setState((state) => ({
				...state,
				offsetX: mouse.x - state.startX,
			}));
		}
	}, [dragged, mouse.dx, mouse.dy, mouse.x, ref]);

	return offsetX;
};

export default useDragging;
