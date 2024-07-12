import {useState} from 'react';
import './ToDo.css'
import { v4 as uuidv4 } from 'uuid';

function ToDo_Comp() { 
    const [ todolist , setTodolist ] = useState( [ { task : '' , isDone : false , key : 0 } ]  );
    const [ ip_val , setIp_val ] = useState( '' );

    console.log("Component re-rendered ");
    console.log( todolist );
    return (
        <div id="outer">
             <h2> TO-DO LIST </h2>

             <div id="control">
                <input type="text" onChange={updateInputValue} value={ip_val} placeholder='Enter your task..'/>
                <button onClick={addTask} > ADD TASK </button>
             </div>

             <ul id='list_'>
                  {
                      todolist.map( 
                        ( task_obj )=>{ 
                            let text_decoration_val = 'none';
                            let background_col_val = 'aliceblue';
                            let col_val = 'rgb(6, 23, 150)';
                            let font_weight_val = 'bolder';

                            if( task_obj.task.trim() != '' ) {
                                if( task_obj.isDone==true ){
                                    text_decoration_val = 'line-through';
                                    background_col_val = 'lavender';
                                    col_val = 'brown';
                                    font_weight_val = 'normal';
                                }
                                return (
                                    <li key={task_obj.key} onDoubleClick={ ()=>{ markAsDone(task_obj.key) } } style={ { textDecoration : text_decoration_val , backgroundColor : background_col_val  } }>
                                        <div style={ { display : 'flex' , justifyContent : 'space-between' , alignItems : 'center'  } }>
                                            <div style={ { fontWeight : font_weight_val , minWidth : '130px' ,  margin : '5px' , color : col_val , overflowX : 'scroll' , scrollbarWidth : 'none' } }> {task_obj.task} </div>
                                            <div style={ { minWidth : '235px'} }>
                                                <button  onClick={ ()=>{ deleteTask(task_obj.key) } } style={ { margin : '5px' } }> Remove </button>
                                                <button  onClick={ ()=>{ updateTask(task_obj.key) } } style={ { margin : '5px' } }> Update </button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        }
                      )
                  }
             </ul>
        </div>
    )

    function updateInputValue( event ) {
        setIp_val( event.target.value );
    }

    function addTask(){
        if( ip_val.trim()!='' ){
            setTodolist( (curlist)=>{ return [...curlist , { task : ip_val.trim() , isDone : false , key : uuidv4() } ]; }  );
            setIp_val( '' );
        }
        else{
            alert("No Task is entered !!");
        }
    }

    function deleteTask( key ) {
        let new_list = todolist.filter( (task_obj)=>(task_obj.key!=key) );
        console.log( new_list );
        setTodolist( new_list );
    }

    function updateTask( key ) {
        todolist.map((task_obj)=>{
            if( task_obj.key==key ) {
                let updated = prompt("Enter the updated value of your task !!");
                if( updated.trim()!='' ) {
                    task_obj.task = updated;
                }
                else {
                    alert('New task value not entered !!');
                }
            }
        });

        setTodolist( [...todolist] );
    }

    function markAsDone( key ) {
        console.log("Marker As Done Working")
        let new_todolist = todolist.map( (task_obj)=>{
            if( task_obj.key==key ) {
                task_obj.isDone = task_obj.isDone ? false : true;
            }
            return {...task_obj}
        } )

        setTodolist( new_todolist );
    }
}

export default ToDo_Comp;