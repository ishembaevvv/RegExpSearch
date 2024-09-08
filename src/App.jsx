import axios from "axios";
import { useEffect, useState } from "react";

function App() {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		axios
			.get(`https://jsonplaceholder.typicode.com/users`)
			.then(datas => setData(datas.data));
	}, []);

	function getOptions(e) {
		const regex = new RegExp(e, "gi");
		console.log(regex);

		return data.filter(s => s.name.match(regex));
	}

	return (
		<div>
			<input
				className="search"
				type="text"
				placeholder="search..."
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
			<ul className="options">
				{getOptions(search).map((el, id) => {
					return (
						<li key={id}>
							<span>{el.name}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default App;
