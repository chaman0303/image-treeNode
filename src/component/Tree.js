import React ,{useState}from 'react'


function Tree({handleParentDel:handleDel,child_id}) {
    const [input_string, setinput_string] = useState(child_id)
    const [editMode, setEditMode] = useState(false);
    console.log('child_id',child_id)
    const handleInputChange = (e) =>{
      setinput_string(e.target.value)
    }
    
    console.log('input_string',input_string)
    const [childs, setChilds] = useState([])
    console.log('childs',childs)

    const handleAddClick = () => {
        setChilds([...childs, { id: Math.random() }]);
      };
      const handleDeleteThisAndChild = () => {
        setChilds([])
        handleDel(child_id)   
      };

      const handleParentDel= (id)=>{
        console.log('id in delete',id)
        setChilds(childs.filter(item=> item.id !== id))

      }

      const handleEditClick = () => {
        setEditMode(true); // Activate edit mode when edit button is clicked
      };
      

  return (
    <>
    <div className="box">
            <input
              name={child_id}
              id={child_id}
              placeholder="Enter Name"
              value={input_string}
              onChange={handleInputChange}
              readOnly={!editMode}
              style={{padding:10}}
            />
            <div className="btn-box" style={{ marginTop: 20, marginBottom: 20}}>
              <button onClick={handleAddClick} style={{ marginRight: 10}}><i className="material-icons">add</i> &nbsp;</button>
              <button onClick={handleEditClick} style={{ marginRight: 10}}><i className="material-icons">edit</i> &nbsp;</button>
              <button onClick={() => handleDeleteThisAndChild()}> <i className="material-icons">delete</i>&nbsp;</button>
            </div>
          </div>
          {
            childs.map((item)=>{
                return(
                <Tree handleParentDel={handleParentDel} child_id={item.id} key={item.id}/>
                );
            })
          }

          </>     
  )
}

export default Tree