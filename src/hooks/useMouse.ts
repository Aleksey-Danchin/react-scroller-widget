import { useCallback, useEffect, useState } from "react";

const useMouse = () => {
	const [mouse, setMouse] = useState({
		e: {} as MouseEvent,
		left: false,
		pleft: false,
		x: 0,
		y: 0,
		dx: 0,
		dy: 0,
	});

	const mousemoveHandler = useCallback((e: MouseEvent) => {
		setMouse((mouse) => ({
			...mouse,
			event: e,
			x: e.clientX,
			y: e.clientY,
			dx: e.clientX - mouse.x,
			dy: e.clientY - mouse.y,
			pleft: mouse.left,
		}));
	}, []);

	const mousedownHandler = useCallback((e: MouseEvent) => {
		if (e.button === 0) {
			setMouse((mouse) => ({
				...mouse,
				event: e,
				dx: 0,
				dy: 0,
				left: true,
				pleft: mouse.pleft,
			}));
		}
	}, []);

	const mouseupHandler = useCallback((e: MouseEvent) => {
		if (e.button === 0) {
			setMouse((mouse) => ({
				...mouse,
				event: e,
				dx: 0,
				dy: 0,
				left: false,
				pleft: mouse.pleft,
			}));
		}
	}, []);

	useEffect(() => {
		window.addEventListener("mousedown", mousedownHandler);
		window.addEventListener("mouseup", mouseupHandler);
		window.addEventListener("mousemove", mousemoveHandler);

		return () => {
			window.removeEventListener("mousedown", mousedownHandler);
			window.removeEventListener("mouseup", mouseupHandler);
			window.removeEventListener("mousemove", mousemoveHandler);
		};
	}, [mousedownHandler, mousemoveHandler, mouseupHandler]);

	return mouse;
};

export default useMouse;
