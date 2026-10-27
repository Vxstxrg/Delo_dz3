import { useState, useEffect } from 'react'
import Header from './Header'
import '../index.css'
import TaskList from './TaskList';
import AddForm from './AddForm';
import { ThemeContext } from '../context/themeContext';


import { fetchTodos } from '../api/todoApi';
export type Task = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};


function App() {
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');


	const [tasks, setTasks] = useState<Task[]>(() => {
		const savedTasks = localStorage.getItem('todo_tasks');
		if (savedTasks) {
			try {
				return JSON.parse(savedTasks);
			} catch (error) {
				console.error("Ошибка парсинга задач из localStorage", error);
				return [];
			}
		}
		return [];
	});

	const [theme, setTheme] = useState<'light' | 'dark'>(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme === 'light' || savedTheme === 'dark') {
			return savedTheme;
		}
		return 'light';
	});

	useEffect(() => {
		localStorage.setItem('theme', theme);
	}, [theme]);


	useEffect(() => {
		if (tasks.length === 0) {
			async function load() {
				setStatus('loading');

				try {
					const items = await fetchTodos();
					setTasks(items);
					setStatus('success');
				} catch {
					setStatus('error');
				}
			}

			load();
		}
		else {
			setStatus('success');
		}
	}, []);





	useEffect(() => {
		if (status === 'success') {
			localStorage.setItem('todo_tasks', JSON.stringify(tasks));
		}
	}, [tasks]);

	const addTask = (title: string) => {
		if (!title.trim()) return;
		const newTask: Task = {
			userId: 1,
			id: Date.now(),
			title: title,
			completed: false
		}
		setTasks([...tasks, newTask])
	}

	const deleteTask = (id: string | number) => {
		const changedTasks = tasks.filter((task) => task.id !== id);
		setTasks(changedTasks);
	}



	const changeTask = (id: string | number) => {
		const changedTasks = tasks.map((task) => {
			if (task.id === id) {
				return { ...task, completed: !task.completed }
			}
			return task
		})
		setTasks(changedTasks)
	}

	return (
		<>
			<ThemeContext.Provider value={{ theme, setTheme, changeTask, deleteTask }}>
				<div className={`app-wrapper-${theme}`}
					style={{ minHeight: '100vh', cursor: 'pointer' }}  >
					<Header />
					{status === 'loading' && <div>Загрузка задач...</div>}
					{status === 'error' && <div>Произошла ошибка при загрузке</div>}
					<AddForm addTask={addTask} />
					<TaskList tasks={tasks} />
				</div>
			</ThemeContext.Provider>
		</>
	);
}

export default App
