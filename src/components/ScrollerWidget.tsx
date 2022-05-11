import {
	createRef,
	FC,
	ReactNode,
	RefObject,
	useEffect,
	useMemo,
	useRef,
} from "react";
import useDragging from "../hooks/useDragging";
import useElementSizes from "../hooks/useElementSizes";
import useSelectDisable from "../hooks/useSelectDisable";

interface ScrollerWidgetProps {
	innerRef?: RefObject<Element>;
	children: (ref: RefObject<Element>) => ReactNode;
}

const ScrollerWidget: FC<ScrollerWidgetProps> = ({ innerRef, children }) => {
	const ref = useMemo(() => innerRef || createRef<Element>(), [innerRef]);

	const scrollerRef = useRef<HTMLDivElement>(null);
	useSelectDisable(scrollerRef.current);

	const { clientWidth, scrollWidth } = useElementSizes(ref);
	const widthScroll = useDragging(scrollerRef);
	const widthScale = clientWidth / scrollWidth || 1;
	const marginLeft = Math.max(
		0,
		Math.min(clientWidth - clientWidth * widthScale, widthScroll)
	);

	useEffect(() => {
		if (ref.current) {
			const { current } = ref;
			const percent = marginLeft / clientWidth;
			current.scrollTo(scrollWidth * percent, 0);
		}
	}, [clientWidth, marginLeft, ref, scrollWidth, widthScale, widthScroll]);

	if (clientWidth >= scrollWidth) {
		return <>{children(ref)}</>;
	}

	return (
		<div>
			{children(ref)}
			<div
				ref={scrollerRef}
				style={{
					width: clientWidth * widthScale,
					height: 25,
					background: "gray",
					marginLeft: marginLeft,
				}}
			></div>
		</div>
	);
};

export default ScrollerWidget;
