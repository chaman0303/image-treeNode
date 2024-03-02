import React, { useState, useEffect, useRef } from 'react';

function ImageUpload() {
  const [file, setFile] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [storedValue, setStoredValue] = useState([]);
  const fileInputRef = useRef(null); // Create a ref

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!file) {
      alert('Please select an image before uploading.');
      return; // Don't proceed further
    }
  
    console.log('handle uploading-', file);
  
    let name = file.name;
    let dates = file.lastModifiedDate.toLocaleString();
    let types = file.type;
    const newImageData = { fileName: name, date: dates, type: types };
  
    setData((prev) => [...prev, newImageData]);
    setStoredValue((prev) => [...prev, newImageData]); // Update storedValue immediately
    localStorage.setItem('images', JSON.stringify(data));
  
    // Reset the input field
    setFile('');
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input field using the ref
    }
    // Reset the image preview
    setImagePreview('');
  
    alert('Image uploaded successfully');
  };

  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    let dataNew = JSON.parse(localStorage.getItem('images'));
    console.log(dataNew, 'new images');

    if (dataNew) {
      setStoredValue(dataNew);
    }
  }, [data]);

  const handleImageChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type.includes('image')) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setFile(selectedFile);
        setImagePreview(reader.result);
        setError('');
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setError('Please select a valid image file.');
    }
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    localStorage.setItem('images', JSON.stringify(newData));
  };

  return (
    <>
      <div className="previewComponent">
        <form onSubmit={handleSubmit}>
        <input
            className="fileInput"
            type="file"
            accept="image/*" // select only image file 
            onChange={handleImageChange}
            ref={fileInputRef} // Assign the ref to the input field
          />
          <button className="submitButton" type="submit" onClick={handleSubmit}>
            Upload Image
          </button>
        </form>
        {error && <div className="error">{error}</div>}
        <div className="imgPreview">
          {imagePreview && <img src={imagePreview} alt="Preview" />}
          {!imagePreview && <div className="previewText">Please select an Image for Preview</div>}
        </div>
      </div>

      <div className="container">
        <h1 className="title">Image Details </h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date/Time</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {storedValue.map((image, index) => (
              <tr key={index}>
                <td>{image.fileName}</td>
                <td>{image.date}</td>
                <td>{image.type}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>
                    <i className="material-icons">delete</i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ImageUpload;