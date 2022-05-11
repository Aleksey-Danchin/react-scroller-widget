import { CSSProperties, FC, RefObject } from "react";
import ScrollerWidget from "./components/ScrollerWidget";

const data = Array(100)
	.fill(null)
	.map(() =>
		Array(100)
			.fill(null)
			.map((_, i) => `Content_${i}`)
	);

const style: CSSProperties = {
	width: "500px",
	height: "500px",
	overflow: "hidden",
};

const App: FC = () => {
	const table = (
		<table>
			<tbody>
				{data.map((row, y) => (
					<tr key={y}>
						{row.map((item, x) => (
							<td key={x}>{item}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);

	return (
		<ScrollerWidget>
			{(ref) => (
				<div style={style} ref={ref as RefObject<HTMLDivElement>}>
					{table}
				</div>
			)}
		</ScrollerWidget>
	);
};

export default App;
