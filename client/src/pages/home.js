import React, { useState, useEffect } from 'react';
import '../Homepage.css'; // Importing CSS for styling
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';



const HomePage = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the desired page
    navigate('/editContract');
  };

  useEffect(() => {
    fetchNames();
    fetchDesc();
},[]);

  const [selectedName, setSelectedName] = useState('');
  const [selectedDesc, setSelectedDesc] = useState('');

  const [cpName, setCpName] = useState('');
  const [cpLocation, setCpLocation] = useState('');
  const [cargoDesc, setcargoDesc] = useState('');


  const [contractFrom, setContractFrom] = useState('');
  const [contractTo, setContractTo] = useState('');
  const [quantity, setQuantity] = useState('');

  const [names, setNames] = useState([]);
  const[desc, setDesc] = useState([]);


 

  useEffect(() => {
    fetchNames();
    fetchDesc();
},[]);



//handle cp details  submission

async function  handleSubmitCounterparty  (event) {
  event.preventDefault();
  console.log('Submitting counterparty data...');

  await fetch('http://localhost/add_CPdata.php', {
    method: 'POST',
   
    body: JSON.stringify({
      cp_name: cpName,
      cp_location: cpLocation
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Handle success
    alert('Coounterparty DataSubmitted Successfully')
    console.log('Data posted successfully');

  })
  .catch(error => {
    // Handle error
    console.error('There was a problem posting the data:', error);
  });
  
};

//handle cargo description details submission

async function handleSubmitCargoDescription (event) {
  event.preventDefault();
  console.log('Submitting cargodesc data...');
  await fetch ('http://localhost/add_CargoDesc.php', {
    method : 'POST',

    body: JSON.stringify({
      cargo_desc: cargoDesc,
      
    })

  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Handle success
    alert('Cargo Description data submitted successfully')
    console.log('Data posted successfully');

  })
  .catch(error => {
    // Handle error
    console.error('There was a problem posting the data:', error);
  });
};



//fetch cp names dropdown items

  const fetchNames = async () => {
        try {
            const response = await fetch('http://localhost/fetch_cpNames.php');
            const data = await response.json();
            console.log('Fetched data:', data); // Log the fetched data
            setNames(data.result.map(item => ({ label: item.cp_name, value: item.cp_name }))); // Extract names from 'result' array
        } catch (error) {
            console.error('Error fetching names:', error);
        }
    };


 //fetch cargo description dropdown items

   const fetchDesc = async () => {
    try {
      const response = await fetch('http://localhost/fetch_cargoDesc.php');
      const data = await response.json();
      console.log('fetched data',data);
      setDesc(data.result.map(item => ({label :item.cargo_desc, value : item.cargo_desc})));
    }catch(error){
      console.error('Error fetching desc:', error);
    }
   }
  

// Update selectedName

const handleSelectChange = (selectedOption) => {
    setSelectedName(selectedOption ? selectedOption.value : ''); 
};





//update selected description

const handleSelectDescChange = (selectedOption) => {
  setSelectedDesc(selectedOption ? selectedOption.value: '');
}










  //handle termcontract submission

  async function handleSubmitTermContract (event)  {
    event.preventDefault();
    console.log('Submitting term contractdata...');
    await fetch('http://localhost/create_termContract.php',{
     method: 'POST',

     body: JSON.stringify({
      cp_name: selectedName,
      cargo_desc: selectedDesc,
      contract_from: contractFrom,
      contract_to:contractTo,
      quantity: quantity
     })

    }).then(response => {

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Handle success
    alert('New Term Contract created successfully')
    console.log('Data posted successfully');

  })
  .catch(error => {
    // Handle error
    console.error('There was a problem posting the data:', error);
  });

  }





  

  return (
    <div className="homepage-container">
       <div className="header">
        <h1>Welcome to Skarvi Systems</h1>
        <button className="top-right-button" type='submit' onClick={handleClick}>Edit Contract</button>
      </div>
      
      
      <p>Please enter the Counterparty details below</p>
      <form onSubmit={handleSubmitCounterparty}>
        <div className="form-group">
          <label htmlFor="counterpartyName">Counterparty Name:</label>
         
          <input type="text" id="counterpartyName" name="counterpartyName" required  value ={cpName}
          onChange={(e) => setCpName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="counterpartyLocation">Counterparty Location:</label>
          
          <input type="text" id="counterpartyLocation" name="counterpartyLocation" required  value = {cpLocation}
          onChange = {(e) => setCpLocation(e.target.value)}
/>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>Please enter CargoDescription details below</p>
      <form onSubmit={handleSubmitCargoDescription}>
      <div className="form-group">
      
          <label htmlFor="cargoDescriptionText">Cargo Description:</label>
          

          <input type="text" id="cargoDescriptionText" name="cargoDescriptionText" required  value ={cargoDesc}
          onChange = {(e) => setcargoDesc(e.target.value)}/>
        </div>
       
        <button type="submit">Submit</button>

       

      </form>

      <p>Please enter TermContract details below</p>

      <form onSubmit={handleSubmitTermContract}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="CounterPartyName">Counterparty Name:</label>
            {
      
      <Select
      value={selectedName ? { label: selectedName, value: selectedName } : null}
      onChange={handleSelectChange}
      // onInputChange={handleInputChange} // Handle input change
      options={names}
      isClearable={true}
      placeholder="Search or Select a name"
  />
            }
          </div>
          <div className="form-group">
            <label htmlFor="CargoDescription">Cargo Description:</label>
            <Select
            value={selectedDesc ? {label : selectedDesc, value : selectedDesc}:null}
            onChange={handleSelectDescChange}
            // onInputChange={handleDescInputChange}
            options ={desc}
              
             
              isClearable ={true}
              placeholder="Search  or select a Cargo Description"
            />
          </div>
        </div>

      <div className="form-column">
          <div className="form-group">
            <label htmlFor="termContractFrom">Term Contract From:</label>
            <input type="date" id="termContractFrom" name="termContractFrom" required value= {contractFrom} onChange = {(e) => setContractFrom(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="termContractTo">Term Contract To:</label>
            <input type="date" id="termContractTo" name="termContractTo" required value= {contractTo} onChange = {(e) => setContractTo(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" required value= {quantity} onChange = {(e) => setQuantity(e.target.value)}/>
            
          </div>
          <button type="submit">Submit</button>

        </div>
        </form>

    </div>
  );
};

export default HomePage;
