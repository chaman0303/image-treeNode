import React, {useState} from 'react';
import './App.css';
import ImageUpload from './component/ImageUpload';
import Tree from './component/Tree';

function App() {
  const [showTree, setShowTree] = useState(true);

  const handleParentDel = () => {
    setShowTree(false);
  }
  return (
    <div className="App">
      <h2>task2</h2>
      <br></br>
      <ImageUpload />
      <br></br>
      <hr></hr>
   <h2>Task1</h2>
      <div>
      {
        showTree && (
          <Tree handleParentDel={handleParentDel} child_id={"company"}/>
        )
      }
     </div>
    </div>
  );
}

export default App;
