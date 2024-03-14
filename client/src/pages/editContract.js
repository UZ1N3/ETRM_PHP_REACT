import React, { useState } from 'react';
import '../editContract.css';
import axios from 'axios';


const EditContract = () => {

    
   
const [searchResults, setSearchResults] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [counterPartyName, setCounterPartyName] = useState('');
const [cargoDescription, setCargoDescription] = useState('');
const [contractFrom, setContractFrom] = useState('');
const [contractTo, setContractTo] = useState('');
const [quantity, setQuantity] = useState('');



  // Function to handle form submission and edit the db data

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };


// handle search for cp names

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost/search.php?searchQuery=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    
  };

 // handle result click to change form data

  const handleResultClick = (result) => {
    setCounterPartyName(result.counterpartyName);
    setCargoDescription(result.cargoDescription);
    setContractFrom(result.termContractFrom);
    setContractTo(result.termContractTo);
    setQuantity(result.Quantity);
  };

  return (
    <div className="form-container" style={{ paddingLeft: '20px' }}>
      
      <h2>Term Contract</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter search query"
      />
      <button onClick={handleSearch}>Search</button>

      <div className="search-results-box">
        {searchResults.map((result, index) => (
          <div key={index} className="search-result-box">
            <div className="search-result-tile" onClick={() => handleResultClick(result)}>
              <h3>{result.counterpartyName}</h3>
              <p>{result.cargoDescription}</p>
              <p>{result.termContractFrom} - {result.termContractTo}</p>
              <p>Quantity: {result.Quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <hr /> 
    </div>
          <label htmlFor="counterPartyName">CounterParty Name:</label>
          <input
            type="text"
            id="counterPartyName"
            value={counterPartyName}
            onChange={(e) => setCounterPartyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cargoDescription">Cargo Description:</label>
          <input
            type="text"
            id="cargoDescription"
            value={cargoDescription}
            onChange={(e) => setCargoDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contractFrom">Contract From:</label>
          <input
            type="date"
            id="contractFrom"
            value={contractFrom}
            onChange={(e) => setContractFrom(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contractTo">Contract To:</label>
          <input
            type="date"
            id="contractTo"
            value={contractTo}
            onChange={(e) => setContractTo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditContract;