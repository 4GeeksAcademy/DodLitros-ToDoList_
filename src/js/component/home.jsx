import React, { useState } from "react";
import { useEffect } from "react";

//create your first component
const Home = () => {
	const url = "https://playground.4geeks.com/apis/fake/todos/user/dodlitros"
	const initialState = {label:"", done:false}
	const [task, setTask] = useState({label:"", done:false});
	const [saveTask, setSaveTask] = useState([]);

	const getTask = async () => {
		try {
			let response = await fetch(url)
			let data = await response.json()
			if (response.ok) {

				setSaveTask(data); // 
			}
			if (response.status ==404){
				createUser()
			}
		} 
		catch(error) {
			console.log(error)
		}
  
	}

	const createUser = async () =>{
		try {
			let response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			})
			if (response.ok){
				getTask()
			}
		} catch (error) {
			
		}
	}

	function handleTask(event){			//cuando se escribe (Hay un cambio) en el input (onChange={ handleTask })
		setTask({
			...task,
			label: event.target.value
		}) 	//task, se convierte en el value del input
	}

	const handleTaskList = async(event) =>{					//Guardar tareas en el imput
		if (event.key == "Enter"){						//cuando se presiona Enter
			if (task.label.trim() !== ""){
			
				try {
					let response = await fetch(url,{
						method: "PUT",
						headers:{
							"Content-Type":"application/json"
						},
						body: JSON.stringify([...saveTask, task])
					})
					if(response.ok){
						 getTask()
					}
					
				} catch (error) {
					console.log(error)
				}
			
			}
		}
		
	}
	const handleDelete = async (index) => {
		try {
			let newTasks = saveTask.filter((_, indexFilter) => index !== indexFilter);
			setSaveTask(newTasks);

			await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTasks),
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteAll = async () => {
		try {
			let response = await fetch(url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([]),
			});
			if (response.ok) {
				setSaveTask([]);
			}
		} catch (error) {
			console.log( error);
		}
	};

	useEffect(() => {getTask()}
	, [])
	

	return (
		<div className="container d-flex flex-column justify-content-center">
			<div className="text-center">
				<div className="row justify-content-center">
					<input 
						onChange={ handleTask }  //Cada cambio se refleja en el estado task
						value={ task.label } 			//Lo que está a dentro de el value es el task
						onKeyDown={ handleTaskList } //cuando se presiona enter (Esto guarda en saveTask)
						type="text" 
						className="w-100 rounded border-secondary" 
						placeholder="Añadir Tarea"
					/>
				</div>
					<ul clas>
					{
						saveTask.map((item,index)=>{
							return(
								<li key={ index } className="border-bottom d-flex justify-content-between">
									 <span> { item.label } </span>  <i onClick={ ()=> handleDelete(index) }  className="fas fa-trash"></i>
								</li>
								)
							})
						}
					</ul>
					<button onClick={handleDeleteAll}>
						Limpiar Lista
					</button>
			</div>
		</div>
	);
};

export default Home;
