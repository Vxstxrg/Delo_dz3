// src/api/todoApi.ts


type Task = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};


export async function fetchTodos(): Promise<Task[]> {
	const response = await fetch(
		'https://jsonplaceholder.typicode.com/todos?userId=1'
	);

	if (!response.ok) {
		throw new Error(`Ошибка сети: HTTP ${response.status}`);
	}

	// Приводим результат к нашему типу Task[] перед возвратом
	return (await response.json()) as Task[];
}
