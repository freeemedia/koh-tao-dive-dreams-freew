import TaskManagement from '../../admin/components/TaskManagement';

import React, { useState } from 'react';

interface Task {
	id: string;
	title: string;
	assignedTo: string;
	status: 'To Do' | 'In Progress' | 'Done';
}

const defaultUsers = [
	{ id: '1', name: 'Alice' },
	{ id: '2', name: 'Bob' },
	{ id: '3', name: 'Charlie' },
];

function getInitialTasks(): Task[] {
	const saved = localStorage.getItem('projectManagerTasks');
	return saved ? JSON.parse(saved) : [];
}

export default function AdminProjectManager() {
	const [tasks, setTasks] = useState<Task[]>(getInitialTasks());
	const [newTask, setNewTask] = useState('');
	const [assignedTo, setAssignedTo] = useState(defaultUsers[0].id);

	function saveTasks(updated: Task[]) {
		setTasks(updated);
		localStorage.setItem('projectManagerTasks', JSON.stringify(updated));
	}

	function addTask(e: React.FormEvent) {
		e.preventDefault();
		if (!newTask.trim()) return;
		const task: Task = {
			id: Date.now().toString(),
			title: newTask,
			assignedTo,
			status: 'To Do',
		};
		saveTasks([...tasks, task]);
		setNewTask('');
	}

	function updateTask(id: string, changes: Partial<Task>) {
		const updated = tasks.map(t => t.id === id ? { ...t, ...changes } : t);
		saveTasks(updated);
	}

	function deleteTask(id: string) {
		saveTasks(tasks.filter(t => t.id !== id));
	}

	return (
		<div className="p-6 max-w-2xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Project Manager</h1>
			<form onSubmit={addTask} className="flex gap-2 mb-4">
				<input
					className="border rounded px-2 py-1 flex-1"
					value={newTask}
					onChange={e => setNewTask(e.target.value)}
					placeholder="New task..."
				/>
				<select
					className="border rounded px-2 py-1"
					value={assignedTo}
					onChange={e => setAssignedTo(e.target.value)}
				>
					{defaultUsers.map(u => (
						<option key={u.id} value={u.id}>{u.name}</option>
					))}
				</select>
				<button className="bg-blue-600 text-white px-4 py-1 rounded" type="submit">Add</button>
			</form>
			<table className="w-full text-left">
				<thead>
					<tr>
						<th>Task</th>
						<th>Assigned To</th>
						<th>Status</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{tasks.map(task => (
						<tr key={task.id} className="border-t">
							<td>{task.title}</td>
							<td>
								<select
									value={task.assignedTo}
									onChange={e => updateTask(task.id, { assignedTo: e.target.value })}
									className="border rounded px-2 py-1"
								>
									{defaultUsers.map(u => (
										<option key={u.id} value={u.id}>{u.name}</option>
									))}
								</select>
							</td>
							<td>
								<select
									value={task.status}
									onChange={e => updateTask(task.id, { status: e.target.value as Task['status'] })}
									className="border rounded px-2 py-1"
								>
									<option>To Do</option>
									<option>In Progress</option>
									<option>Done</option>
								</select>
							</td>
							<td>
								<button className="text-red-600" onClick={() => deleteTask(task.id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

