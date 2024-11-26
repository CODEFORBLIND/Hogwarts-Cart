import React, { useState, useEffect } from 'react'
import './App.css';

function App() {

  const [endPoint, setEndPoint] = useState('')
  const [container, setContainer] = useState([])
  const [finalPoint, setFinalPoint] = useState('')

  useEffect(() => {
    if (finalPoint.trim()) {  // Only fetch if finalPoint is not empty
      fetchMe();
    }
  }, [finalPoint]);

  // useEffect(() => {
  //   // Debounce the API call to wait until the user stops typing
  //   const delayDebounceFn = setTimeout(() => {
  //     if (endPoint.trim()) {  // Only fetch if endPoint is not empty
  //       fetchMe();
  //     } else {
  //       setContainer([]);  // Clear the container if input is empty
  //     }
  //   }, 200);  // Adjust delay as needed

  //   // Cleanup the timeout on endPoint change
  //   return () => clearTimeout(delayDebounceFn);
  // }, [endPoint]);

  const fetchMe =() =>{
    const apiUrl = `https://potterapi-fedeperin.vercel.app/es/characters?search=${finalPoint}`;
    console.log(`Fetching data from: ${apiUrl}`);

    fetch(apiUrl)
    .then(response => {
        // console.log(response.status)
        // console.log(response.ok)
        return response.json();
      })
    .then(data =>{
      console.log('Fetched data:', data);
      setContainer(data);
    })
    .catch(err =>{
      console.log(err);
    })
  }





  const onChangeHandler = (e) =>{
    setEndPoint(e.target.value)
  }

  const submitHandler = (e) =>{ //we made this because before this we were having our page re-rendered everytime we go and hit the submit button
    e.preventDefault()
    setFinalPoint(endPoint)
  }

  return (
    <div className="App">

      <form onSubmit={submitHandler} className='form-container'> 
        <input type="text" value={endPoint} onChange={onChangeHandler}/>
        <button type='submit'>Submit</button>
      </form>

    <div className="element">
      {
        container.map((item, index)=>{
          return (
            <div key={index} className="element-div">
              <img src={item.image}/>
              <p>{item.fullName}</p>
              <p>Nickname: {item.nickname}</p>
              <p>House: {item.hogwartsHouse}</p>
              <p>Actor: {item.interpretedBy}</p>
              <p>BirthDate: {item.birthdate}</p>
            </div>
          )
        })
      }
    </div>
    </div>
  );
}

export default App;


{/* <div key={item.index}>
<img src={item.image} alt={`${item.fullName}`} />
<p>{item.fullName}</p>
<p>Nickname: {item.nickname}</p>
<p>House: {item.hogwartsHouse}</p>
<p>Actor: {item.interpretedBy}</p>
<p>Birthdate: {item.birthdate}</p>
<p>Children: {item.children.join(", ") || "None"}</p>
</div> */}