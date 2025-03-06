import Table from "@/components/Table";

export default function Home() {

	return (
		<main>
			<h1>Lead Management App</h1>
			<table>
				<thead>
					<tr>
						<th><input type="checkbox" /></th>
						<th>Name</th>
						<th>Email</th>
						<th>Status</th>
						<th>Created At</th>
					</tr>
				</thead>
				<Table />
			</table>
		</main>
	);
}
