import React, { useEffect, useState } from 'react';
import './App.css';
import ReactMonthPicker from 'react-month-picker';
import "react-month-picker/css/month-picker.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function TopPart (){

  const [seeMore, changeView] = useState(false);

  function seeMoreAction(){
    changeView(true);
  }

  function seeLessAction(){
    changeView(false);
  }

  if (seeMore) {
    return (
      <div>
        <header>
            <h1>Water storage in California reservoirs</h1>
        </header>

        <main>

          <div id="main-container">

            <div id="main-text">
              <p> California's reservoirs are part of a <a target="_blank" rel="noreferrer noopener" href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. </p>
              <p> California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.</p>
              <input id="viewChange" type="button" value="See less" onClick={seeLessAction}/>
            </div>

            <div id="image-container">
              <img id="lake-image" src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg"/>
              <p id="lake-image-caption">Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.</p>
            </div>

          </div>

          <BottomPart/>

        </main>
      </div>
    )
  }

  else {
    return (
      <div>
          <header>
              <h1>Water storage in California reservoirs</h1>
          </header>

          <main>

            <div id="main-container">

              <div id="main-text">
                <p> California's reservoirs are part of a <a target="_blank" rel="noreferrer noopener" href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. </p>
                <p> California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.</p>
                <input id="viewChange" type="button" value="See more" onClick={seeMoreAction}/>
              </div>

              <div id="image-container">
                <img id="lake-image" src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg"/>
                <p id="lake-image-caption">Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.</p>
              </div>

            </div>

          </main>
        </div>
    );
  }
}

async function getChartData(startDate, endDate){

  let reqObj = {};
  reqObj.startDate = startDate; // the api seems to answer fine for just the month and year as well
  reqObj.endDate = endDate;

  console.log("reqObj:", reqObj);

  let params = {
    method: "POST",
    headers: 
      {
        'Content-Type': 'application/json'
      }, 
    body: JSON.stringify(reqObj)
  }

  let response = await fetch('/api/getChartData', params);
  response = await response.json();
  console.log(response);

  let valuesArray = [];
  for (let i = 0; i < response.length; i++){
    valuesArray.push(response[i].value);
  }

  console.log(valuesArray);

  return valuesArray;

}


function BottomPart(){

  const [chartData, setChartData] = useState([]);
  const [isVisible, setVisibility] = useState(false);
  const [monthYear, setMonthYear] = useState({year: 2022, month: 4});

  const showMonthPicker = event => {
    setVisibility(true);
    event.preventDefault();
  };

  let months = ["FillerMonth", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleOnDismiss = () => {
    setVisibility(false);
  };

  const handleOnChange = (year, month) => {
    setMonthYear({ year, month });
    setVisibility(false);
    console.log("Month changed!!!");

    // the api seems to answer fine for just the month and year as well
  
    getChartData(`${year}-${month}`, `${year}-${month}`)
      .then((chart)=>{
        setChartData(chart);
      })
      .catch((err)=>{
        console.log("An Error Occurred:", err);
      });
  };

  const getMonthValue = () => {
    const month = monthYear && monthYear.month ? monthYear.month : 0;
    const year = monthYear && monthYear.year ? monthYear.year : 0;

    return month && year ? `${months[month]} ${year}` : "Select Month";
  };

  useEffect(function () { // not using this 'useEffect' thingy causes my fetch calls to be made twice for some reason
    getChartData("2022-4", "2022-4") // cuz initially it is hardcoded to be April 2022
      .then((chart)=>{
        setChartData(chart);
      })
      .catch((err)=>{
        console.log("An Error Occurred:", err);
      });
  }, []);

  const range = {
    min: { year: 2010, month: 1 },
    max: { year: 2022, month: 6 }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "'top' as const",
      },
      title: {
        display: false, // NOTE THAT DISPLAY IS SET TO FALSE
        text: 'Chart.js Bar Chart',
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };

  const labels = ['Shasta', 'Oroville', 'Trinity Lake', 'New Melones', 'San Luis', 'Don Pedro', 'Berryessa'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Reservoir Water Storage Data',
        data: chartData,
        backgroundColor: 'rgb(66,145,152)',
      }
    ],
  };

  return (
    <div id="special-container">

      <div id="graph-div">
        <Bar options={options} data={data} />
      </div>

      <div id="special-text">
        <p>Here's a quick look at some of the data on reservoirs from the <a target="_blank" rel="noreferrer noopener" href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.</p>
        <p id="change-month">Change Month:</p>

        <input type="text" placeholder="April 2022" value={getMonthValue()} onClick={showMonthPicker} readOnly/>

        <ReactMonthPicker
          show={isVisible}
          lang={[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]}
          years={range}
          value={monthYear}
          onChange={handleOnChange}
          onDismiss={handleOnDismiss}
        />
      </div>

    </div>
  )
}


function App() {
  
  async function apiCall(){
    let response = await fetch('/api/reply_frontend');
    response = await response.json();
    console.log(response);
  }

  useEffect(function () {
    apiCall()
      .catch((err)=>{
        console.log("An Error Occurred:", err);
      });
  }, []);
  

  return (
    <TopPart/>
  )
}

export default App;