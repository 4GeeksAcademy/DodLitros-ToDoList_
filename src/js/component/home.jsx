import React, { useState } from "react";



//create your first component
const Home = () => {

	const [task, setTask] = useState("");
	const [saveTask, setSaveTask] = useState([]);

		function handleTask(event){
			setTask(event.target.value)
		}

		function handleTaskList (event){
			if (event.key == "Enter"){
				if (task.trim() !== ""){
					setSaveTask([...saveTask, task.trim()]);
					setTask("");	
				}
			}
			
		}
		function handleDelete (index) {
			let filterTask = saveTask.filter((_, indexFilter) => index !== indexFilter)
			setSaveTask(filterTask)
		}

	return (
		<div className="container d-flex flex-column justify-content-center">
			<div className="text-center">
				<div className="row justify-content-center">
					<input onChange={ handleTask }  value={ task } onKeyDown={ handleTaskList } type="text" className="w-100 rounded border-secondary" placeholder="Añadir Tarea"/>
				</div>
					<ul clas>
					{
						saveTask.map((item,index)=>{
							return(
								<li key={ index } className="border-bottom d-flex justify-content-between">
									 <span> { item } </span>  <i onClick={ ()=> handleDelete(index) }  className="fas fa-trash"></i>
								</li>
								)
							})
						}
					</ul>
			</div>
		</div>
	);
};

export default Home;
