import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../paperTrade.css';

const PaperTrade = () => {

  const [selectedRef, setSelectedRef] = useState('');
  const [refs, setRefs] = useState([]);
  const [selectedBS, setSelectedBS] = useState('');
  const [selectedCP, setSelectedCP] = useState('');
  const [selectedCPdesc, setSelectedCPdesc] = useState('');
  const [selectedPricingQuot, setSelectedPricingQuot] = useState('');
  const [selectedBrokerName, setSelectedBrokerName] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedBrokerCharges, setSelectedBrokerCharges] = useState('');
  const [selectedTraderName, setSelectedTraderName] = useState('');

  const [CpOptions, setCP] = useState([]);
  const [traderNames, setTraderNames] = useState([]);

  const [CpDesc, setCPdesc] = useState([]);
  const [pricingQuot, setPricingQuot] = useState([]);
  const [brokerNames, setBrokerName] = useState([]);

  const [BBL, setBBL] = useState('');
  const [MT, setMT] = useState('');
  const [fixedPrice, setFP] = useState('');
  const [pricingPdFrom, setPricingFrom] = useState('');
  const [pricingPdTo, setPricingTo] = useState('');
  const [dueDays, setDue] = useState('');

  const bsOptions = [
    { label: "Bought", value: "bought" },
    { label: "Sold", value: "sold" }
  ];

  const unitOptions = [
    { label: "USD/MT", value: "USD/MT" },
    { label: "USD/BBL", value: "USD/BBL" }
  ];

  const [brokerMTMap, setBrokerMTMap] = useState(new Map());
  const [brokerBBLMap, setBrokerBBLMap] = useState(new Map());


  const additionalOption = { label: "Inventory", value: "inventory" };
  const optionsWithInventory = [additionalOption, ...refs];
  

  useEffect(() => {
    fetchRefs();
    fetchNames();
    fetchDesc();
    fetchBrokerDetails();
    fetchQuot();
    fetchTraderNames();
  }, []);

  useEffect(() => {
    // Call calculateBrokerCharges whenever relevant state values change
    calculateBrokerCharges();
  }, [selectedBrokerName, selectedUnit, MT, BBL]);

  // Fetch reference IDs
  const fetchRefs = async () => {
    try {
      const response = await fetch('http://localhost/fetch_transferReference.php');
      const data = await response.json();
      setRefs(data.result.map(item => ({ label: item.transfer_reference, value: item.transfer_reference })));
    } catch (error) {
      console.error('Error fetching refs:', error);
    }
  };

  // Handle reference change
  const handleSelectRefChange = (selectedOption) => {
    setSelectedRef(selectedOption ? selectedOption.value : '');
  };

  // Fetch CP names
  const fetchNames = async () => {
    try {
      const response = await fetch('http://localhost/fetch_cpNames.php');
      const data = await response.json();
      setCP(data.result.map(item => ({ label: item.cp_name, value: item.cp_name })));
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  };

  // Handle CP name change
  const handleSelectCPChange = (selectedOption) => {
    setSelectedCP(selectedOption ? selectedOption.value : '');
  };

  const handleSelectBSChange = (selectedOPtion) => {
    setSelectedBS(selectedOPtion? selectedOPtion.value:'');
  }

  // Fetch CP description
  const fetchDesc = async () => {
    try {
      const response = await fetch('http://localhost/fetch_cargoDesc.php');
      const data = await response.json();
      setCPdesc(data.result.map(item => ({ label: item.cargo_desc, value: item.cargo_desc })));
    } catch (error) {
      console.error('Error fetching desc:', error);
    }
  };

  // Fetch pricing quotations
  const fetchQuot = async () => {
    try {
      const response = await fetch('http://localhost/fetch_pricingQuot.php');
      const data = await response.json();
      setPricingQuot(data.result.map(item => ({ label: item.quotation, value: item.quotation })));
    } catch (error) {
      console.error('Error fetching quotation:', error);
    }
  };

  // Fetch broker names and their rates
  const fetchBrokerDetails = async () => {
    try {
      const response = await fetch('http://localhost/fetch_brokerDetails.php');
      const data = await response.json();
      setBrokerName(data.result.map(item => ({ label: item.broker_name, value: item.broker_name })));
  
      // Create maps for broker rates
      const brokerMTMap = new Map(data.result.map(item => [item.broker_name, parseFloat(item["usd/MT"])]));
      const brokerBBLMap = new Map(data.result.map(item => [item.broker_name, parseFloat(item["usd/BBL"])]));
  
      // Set the state with the maps
      setBrokerMTMap(brokerMTMap);
      setBrokerBBLMap(brokerBBLMap);
  
      // No need to handle event listeners here, they can be set directly in the JSX
    } catch (error) {
      console.error('Error fetching details:', error);
    }
    
  };

  // Calculate broker charges based on prices and quantities
  const calculateBrokerCharges = () => {
    console.log("Selected Broker Name:", selectedBrokerName);
    console.log("Selected Unit:", selectedUnit);
    console.log("MT:", MT);
    console.log("BBL:", BBL);
  
    const qtyMt = parseFloat(MT) || 0;
    const qtyBbl = parseFloat(BBL) || 0;
    const brokerName = selectedBrokerName;
  
    if (brokerName && selectedUnit) {
      let brokerCharges = 0;
  
      if (selectedUnit === 'USD/MT') {
        const usdMtValue = parseFloat(brokerMTMap.get(brokerName));
        console.log("USD/MT Value:", usdMtValue);
        brokerCharges = usdMtValue ? (usdMtValue * qtyMt).toFixed(2) : 0;
      } else if (selectedUnit === 'USD/BBL') {
        const usdBBLvalue = parseFloat(brokerBBLMap.get(brokerName));
        console.log("USD/BBL Value:", usdBBLvalue);
        brokerCharges = usdBBLvalue ? (usdBBLvalue * qtyBbl).toFixed(2) : 0;
      }
  
      console.log("Broker Charges:", brokerCharges);
      setSelectedBrokerCharges(brokerCharges.toString()); // Convert to string
    } else {
      setSelectedBrokerCharges('');
    }
    
  };

  const fetchTraderNames = async () => {
    try {
      const response = await fetch('http://localhost/fetch_traderNames.php');
      const data = await response.json();
      setTraderNames(data.result.map(item => ({ label: item.trader_name, value: item.trader_name })));
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  };

  

  // Handle CP description change
  const handleSelectCPdescChange = (selectedOption) => {
    setSelectedCPdesc(selectedOption ? selectedOption.value : '');
  };

  // Handle quotation change
  const handleSelectQuotationChange = (selectedOption) => {
    setSelectedPricingQuot(selectedOption ? selectedOption.value : '');
  };

  // Handle selected broker change
  const handleSelectBrokerChange = (selectedOption) => {
    setSelectedBrokerName(selectedOption ? selectedOption.value : '');
  };

  // Handle unit change
  const handleSelectUnitChange = (selectedOption) => {
    setSelectedUnit(selectedOption ? selectedOption.value : '');
  };

  const handleSelectTraderChange = (selectedOption) => {
    setSelectedTraderName(selectedOption ? selectedOption.value : '');
  };

 

 
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="outer-container">
    <header className="header">
      <h1>Skarvi Systems</h1>
    </header>
    {/* <h3 className="subtitle">Please fill the details mentioned below</h3> */}
    <div className="form-container">
      <h2 className="heading">Paper Trade Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="grid-container">
        <div className="grid-item">
        <label htmlFor="transRef">Transaction Ref.</label>
        {
          <Select
          value={selectedRef ? { label: selectedRef, value: selectedRef } : null}
          onChange={handleSelectRefChange}
          // onInputChange={handleInputChange} // Handle input change
          options={optionsWithInventory}
          isClearable={true}
          placeholder="Search or select a ref."
      />
        }
        
      </div>

      <div className="grid-item">
        <label htmlFor="Status">Bought/Sold</label>
        {
          <Select
          value={selectedBS ? { label: selectedBS, value: selectedBS } : null}
          onChange={handleSelectBSChange}
          // onInputChange={handleInputChange} // Handle input change
          options={bsOptions}
          isClearable={false}
          placeholder="Select an option"
      />
        }
        
      </div>

      <div className="grid-item">
        <label htmlFor="CounterParty">Counterparty</label>
        {
          <Select
          value={selectedCP ? { label: selectedCP, value: selectedCP } : null}
          onChange={handleSelectCPChange}
          // onInputChange={handleInputChange} // Handle input change
          options={CpOptions}
          isClearable={true}
          placeholder="Select Counterparty"
      />
        }
        
      </div>

      <div className="grid-item">
        <label htmlFor="Cargo description">Cargo description</label>
        {
          <Select
          value={selectedCPdesc ? { label: selectedCPdesc, value: selectedCPdesc } : null}
          onChange={handleSelectCPdescChange}
          
          options={CpDesc}
          isClearable={true}
          placeholder="Select Cargo Description"
      />
        }
        
      </div>
      <div className="grid-item">
        <label htmlFor="PricingQuot">Pricing Quotation</label>
        {
          <Select
          value={selectedPricingQuot ? { label: selectedPricingQuot, value: selectedPricingQuot } : null}
          onChange={handleSelectQuotationChange}
          
          options={pricingQuot}
          isClearable={true}
          placeholder="Select pricing quot."
      />
        }
        
      </div>
      <div className="grid-item">
        <label htmlFor="BBL">QTY. BBL:</label>
        <input type="text" id="QTY.BBL" name="QTY.BBL" required  value ={BBL}
      onChange={(e) => setBBL(e.target.value)} />
      </div>
      <div className="grid-item">
        <label htmlFor="MT">QTY. MT:</label>
        <input type="text" id="QTY.MT" name="QTY.MT>" required  value ={MT}
      onChange={(e) => setMT(e.target.value)} />
      </div>
      <div className="grid-item">
        <label htmlFor="FIXEDPRICE">Fixed Price:</label>
        <input type="text" id="FIXEDPRICE" name="FIXEDPRICE>" required  value ={fixedPrice}
      onChange={(e) => setFP(e.target.value)} />
      </div>
      <div className="grid-item">
      <label htmlFor="pricingPeriodFrom">Pricing pd. From:</label>
        <input type="date" id="pricingPeriodFrom" name="pricingPeriodFrom" required value= {pricingPdFrom} onChange = {(e) => setPricingFrom(e.target.value)}/>
      </div>
      <div className="grid-item">
      <label htmlFor="pricingPeriodTo">Pricing pd. To:</label>
        <input type="date" id="pricingPeriodTo" name="pricingPeriodTo" required value= {pricingPdTo} onChange = {(e) => setPricingTo(e.target.value)}/>
      </div>
      <div className="grid-item">
        <label htmlFor="DUE DAYS ">Due Days:</label>
        <input type="text" id="DUE DAYS " name="DUE DAYS " required  value ={dueDays}
      onChange={(e) => setDue(e.target.value)} />
      </div>
      <div className="grid-item">
        <label htmlFor="Brokername">Broker Name</label>
        {
          <Select
          id='Brokername'
          value={selectedBrokerName ? { label: selectedBrokerName, value: selectedBrokerName } : null}
          onChange={handleSelectBrokerChange}
          
          options={brokerNames}
          isClearable={true}
          placeholder="Select Broker"
      />
        }
        
      </div>

      <div className="grid-item">
        <label htmlFor="unit">Broker Charges unit</label>
        {
          <Select id='BrokerChargesUnit'
          value={selectedUnit ? { label: selectedUnit, value: selectedUnit } : null}
          onChange={handleSelectUnitChange}
          // onInputChange={handleInputChange} // Handle input change
          options={unitOptions}
          isClearable={false}
          placeholder="Select an option"
      />
        }
        
      </div>
      <div className="grid-item">
        <label htmlFor="BrokerCharges">Broker Charges:</label>
        <input type="text" id="BrokerCharges" name="Broker Charges" readOnly value={selectedBrokerCharges}/>
      </div>
      <div className="grid-item">
        <label htmlFor="traderName">Traded By</label>
        {
          <Select
          id='traderName'
          value={selectedTraderName ? { label: selectedTraderName, value: selectedTraderName } : null}
          onChange={handleSelectTraderChange}
          
          options={traderNames}
          isClearable={true}
          placeholder="Select Trader"
      />
        }
        
      </div>


        </div>
        {/* <button  onClick={calculateBrokerCharges}>calculate Broker Charges </button> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
);
}


export default PaperTrade;
