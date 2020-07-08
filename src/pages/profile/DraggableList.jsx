import React  from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DehazeIcon from '@material-ui/icons/Dehaze';
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


const DraggableList = ({items, setItems,updateItems,educationList=false}) => {

    const onDragEnd = (result)=> {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const reorderedItems = reorder(
            items,
            result.source.index,
            result.destination.index,
        );

        setItems(reorderedItems);
        updateItems(reorderedItems);
    };

    const onSelectElement = (index) => {
        const newItem = Array.from(items);
        newItem.map(item => {
            if(item.id === index){
                item.isSelected = true;
            }
        });
        setItems(newItem)
    };

    const onDeselectElement = (index) => {
        const newItem = Array.from(items);
        newItem.map(item => {
            if(item.id === index){
                item.isSelected = false;
            }
        });
        setItems(newItem)
    };

    const deleteItem = (id) => {
        const newItem = items.filter(item=>{
            return item.id !== id;
        });
        setItems(newItem);
        updateItems(newItem);
    };


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div
                        className="ProfileContentList"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index} >
                                {(provided) => (
                                    <div
                                        className="ProfileListItem"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onMouseEnter={()=>onSelectElement(item.id)}
                                        onMouseDown={()=>onSelectElement(item.id)}
                                        onMouseLeave={()=>onDeselectElement(item.id)}
                                    >
                                        {!educationList&&<QuestionAnswerItems setItems={setItems} items={items} item={item} deleteItem={deleteItem} updateItems={updateItems}/>}
                                        {educationList&&<EducationItems item={item} deleteItem={deleteItem}/>}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
};

const QuestionAnswerItems = ({items,setItems,item,updateItems,deleteItem}) => {
    const clickEdit = (id) => {

        setItems(items.map(item=>{
            if(item.id === id){
                return {...item, editMode:true,unEditedQuestion:item.question,unEditedAnswer:item.answer};
            }
            return item;
        }))
    };

    const changeQuestion = (id,question) => {
        setItems(items.map(item=>{
            if(item.id === id){
                return {...item,question};
            }
            return item;
        }))
    };
    const changeAnswer = (id,answer) => {
        setItems(items.map(item=>{
            if(item.id === id){
                return {...item,answer};
            }
            return item;
        }))
    };
    const saveEdit = (id) => {
        const newItems = items.map(item=>{
            if(item.id === id){
                return {...item, editMode:false};
            }
            return item;
        });
        setItems(newItems);
        updateItems(newItems);
    };

    const cancelEdit = (id) => {
        const newItems = items.map(item=>{
            if(item.id === id){
                return {...item, editMode:false,question:item.unEditedQuestion,answer:item.unEditedAnswer};
            }
            return item;
        });
        setItems(newItems);

    };

    return (
        <div style={{height:"100%",width:"100%"}}>
            <div style={{visibility:true}} className="DragLabel">
                <DehazeIcon/>
            </div>
            <div className="DragContent">
                <div className="dragQuestion">
                    {!item.editMode &&<h1>{item.question}</h1>}
                    {item.editMode && <input onChange={(e)=>changeQuestion(item.id,e.target.value)} value={item.question}/>}
                </div>
                <div  className="dragAnswer">
                    {!item.editMode && <p>{item.answer}</p>}
                    {item.editMode &&<input value={item.answer} onChange={(e)=>changeAnswer(item.id,e.target.value)}/>}
                </div>
            </div>
            <div style={{visibility:item.isSelected?"visible":"hidden"}} className="ListItemEditLabel">
                {!item.editMode &&<p onClick={()=>{clickEdit(item.id)}}>Edit</p>}
                {item.editMode &&<p onClick={()=>{saveEdit(item.id)}}>Save</p>}
                {!item.editMode && <p onClick={()=>{deleteItem(item.id)}}>Delete</p>}
                {item.editMode && <p onClick={()=>{cancelEdit(item.id)}}>Cancel</p>}

            </div>
        </div>
    )
};

export const EducationItems = ({item,deleteItem}) =>{
    return (
        <div style={{height:"100%",width:"100%"}}>
            <div style={{visibility:true}} className="DragLabel">
                <DehazeIcon/>
            </div>
            <div className="DragContent">
                <div className="dragEducationIntro">
                    <h1>{item.school}</h1>
                    <h2>{item.degree}</h2>
                </div>
                <div  className="dragEducationYear">
                    <h1>{item.from}-{item.to}</h1>
                </div>
            </div>
            <div style={{visibility:item.isSelected?"visible":"hidden"}} className="ListItemEditLabel">

                <p onClick={()=>{deleteItem(item.id)}} style={{top:"15px"}}>Delete</p>

            </div>
        </div>
    )
};

export default DraggableList;