import Button from './Button';
import { useState } from 'react';
export default function NewTask({ onAdd }) {
	const [enteredTask, setEnteredTask] = useState('');

	function handleTaskEntry(event) {
		setEnteredTask(event.target.value);
	}

	function handleAddTaskClick() {
		//forward entered value to app component
		if (enteredTask.trim() === '') {
			return;
		}
		onAdd(enteredTask);
		setEnteredTask('');

	}

	/* className="text-stone-700 hover:text-stone-800" */
	return <div className="flex items-center gap-4">
		<input type="text" className="w-64 h-[2.5rem] px-2 py-1 rounded-sm bg-stone-200" onChange={handleTaskEntry}
			value={enteredTask} />
		<Button name='Add Task' onClick={handleAddTaskClick }> </Button>
		
	</div>
}