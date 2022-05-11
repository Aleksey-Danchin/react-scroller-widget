import { useCallback, useEffect } from "react";

const useSelectDisable = (ref: Element | null) => {
	const handler = useCallback((e: Event) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	useEffect(() => {
		if (ref) {
			ref.addEventListener("selectstart", handler);

			return () => ref.removeEventListener("selectstart", handler);
		}
	}, [ref, handler]);
};

export default useSelectDisable;
