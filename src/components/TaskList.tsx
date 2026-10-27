import { useContext } from "react"
import type { Task } from "./App"
import TaskItem from "./TaskItem"
import { ThemeContext } from "../context/themeContext"

type TaskListProps = {
	tasks: Task[],
}

function TaskList({ tasks }: TaskListProps) {


	const { theme } = useContext(ThemeContext)

	return (
		<div className={`todo-list todo-list-${theme}`}>
			{tasks.map((task) => (
				<TaskItem
					key={task.id}
					id={task.id}
					title={task.title}
					done={task.completed}
					userId={task.userId}

				/>
			))}
		</div>
	)
}

export default TaskList
