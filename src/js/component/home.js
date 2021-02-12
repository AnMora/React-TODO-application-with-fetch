import React from "react";
import shortid from "shortid";
//include images into your bundle
//create your first component
export function Home() {
	const [tarea, setTarea] = React.useState("");
	const [arrayTareas, setArrayTareas] = React.useState([]);
	const agregarTarea = e => {
		e.preventDefault();
		//console.log(tarea);
		setArrayTareas([
			...arrayTareas,
			{
				id: shortid.generate(),
				nombreTarea: tarea
			}
		]);

		setTarea("");
	};

	fetch(
		"http://assets.breatheco.de/apis/fake/todos/user/<username>alesanchezr",
		{
			method: "PUT",
			body: JSON.stringify(arrayTareas),
			headers: {
				"Content-Type": "application/json"
			}
		}
	).then(resp => {
		console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
		console.log(resp.status); // el código de estado = 200 o código = 400 etc.
		console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
		return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
	});

	const borrarTarea = id => {
		//console.log(id);
		for (let i = 0; i < arrayTareas.length; i++) {
			if (arrayTareas[i].id === id) {
				arrayTareas.splice(i, 1);
				//console.log(arrayTareas);
				setArrayTareas([...arrayTareas]);
			}
		}
	};

	return (
		<div className="container">
			<h1 className="text-center">Tareas con ReactJs</h1>
			<div className="row">
				<div className="col-12">
					<h4 className="text-center">Lista de Tareas</h4>
					<ul className="list-group">
						<form onSubmit={agregarTarea}>
							<li className="list-group-item">
								<input
									type="text"
									className="form-control mb-2"
									placeholder="Ingrese Tarea"
									onChange={e => setTarea(e.target.value)}
									value={tarea}
								/>
							</li>
						</form>
						{arrayTareas.map(item => (
							<li className="list-group-item" key={item.id}>
								{/* <span className="lead">{item.nombreTarea}</span> */}
								<footer className="blockquote-footer">
									<cite title="Source Title">
										{item.nombreTarea}
									</cite>
									<button
										type="button"
										className="ml-2 mb-1 close"
										data-dismiss="toast"
										aria-label="Close"
										onClick={() => {
											borrarTarea(item.id);
										}}>
										<span aria-hidden="true">&times;</span>
									</button>
								</footer>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
