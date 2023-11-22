import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(id: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(td => td.id !== id)});
    }

    function addTask(title: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(tl=>tl.id === taskId ? {...tl, isDone: isDone} : tl)});
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(td => td.id === todolistId ? {...td, filter: value} : td));
    }


    return (
        <div className="App">
            {todolists.map(td => {
                let tasksForTodolist = tasks[td.id];

                if (td.filter === "active") {
                    tasksForTodolist = tasks[td.id].filter(t => t.isDone === false);
                }
                if (td.filter === "completed") {
                    tasksForTodolist = tasks[td.id].filter(t => t.isDone === true);
                }
                return <Todolist
                    key={td.id}
                    id={td.id}
                    title={td.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={td.filter}
                />

            })}

        </div>
    );
}

export default App;
