import { RefObject, useCallback, useEffect, useState } from "react";

const useElementSizes = (ref: RefObject<Element>) => {
	const [state, setState] = useState({
		clientWidth: 0,
		clientHeight: 0,
		scrollWidth: 0,
		scrollHeight: 0,
	});

	const resizeHandler = useCallback(() => {
		if (ref.current) {
			const { current } = ref;

			setState((state) => ({
				...state,
				clientWidth: current.clientWidth,
				clientHeight: current.clientHeight,
				scrollWidth: current.scrollWidth,
				scrollHeight: current.scrollHeight,
			}));
		}
	}, [ref]);

	useEffect(() => {
		resizeHandler();
		window.addEventListener("resize", resizeHandler);
		return () => window.removeEventListener("resize", resizeHandler);
	}, [resizeHandler]);

	return state;
};

export default useElementSizes;
