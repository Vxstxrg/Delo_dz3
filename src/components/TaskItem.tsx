import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"


type TaskItemProps = {
	userId: string | number,
	id: string | number,
	title: string,
	done: boolean,


}

function TaskItem({ userId, id, title, done }: TaskItemProps) {
	const { theme, changeTask, deleteTask } = useContext(ThemeContext)

	const deleteHandle = (event: any) => {
		event.stopPropagation()
		deleteTask(id)
	}

	const chandgeHandle = () => {
		changeTask(id)
	}

	return (
		<div onClick={chandgeHandle} className={`todo-item todo-item-${theme}`} style={{ backgroundColor: done ? 'green' : 'red' }}>
			<h3>{title}</h3>
			<button onClick={deleteHandle}>X</button>
		</div>
	)
}


export default TaskItem
