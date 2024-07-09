import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './App.css';

const cities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
  'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai',
  'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
  'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna',
  'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut',
  'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar', 'Varanasi', 'Srinagar', 'Aurangabad',
  'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah',
  'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai',
  'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubballi-Dharwad',
  'Mysore', 'Tiruchirappalli', 'Bareilly', 'Aligarh', 'Tiruppur', 'Moradabad',
  'Jalandhar', 'Bhubaneswar', 'Salem', 'Warangal', 'Guntur', 'Bhiwandi',
  'Saharanpur', 'Gorakhpur', 'Bikaner', 'Amravati', 'Noida', 'Jamshedpur',
  'Bhilai', 'Cuttack', 'Firozabad', 'Kochi', 'Bhavnagar', 'Dehradun', 'Durgapur',
  'Asansol', 'Nanded', 'Kolhapur', 'Ajmer', 'Gulbarga', 'Jamnagar', 'Ujjain',
  'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar', 'Nellore', 'Jammu', 'Sangli-Miraj & Kupwad',
  'Belgaum', 'Mangalore', 'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya', 'Jalgaon',
  'Udaipur', 'Maheshtala', 'Davanagere', 'Kozhikode', 'Akola', 'Kurnool',
  'Rajpur Sonarpur', 'Bokaro', 'South Dumdum', 'Bellary', 'Patiala', 'Gopalpur',
  'Agartala', 'Bhagalpur', 'Muzaffarnagar', 'Bhatpara', 'Panihati', 'Latur',
  'Dhule', 'Rohtak', 'Korba', 'Bhilwara', 'Berhampur', 'Muzaffarpur',
  'Ahmednagar', 'Mathura', 'Kollam', 'Avadi', 'Kadapa', 'Anantapur', 'Kamarhati',
  'Bilaspur', 'Sambalpur', 'Shahjahanpur', 'Satara', 'Bijapur', 'Rampur',
  'Shimoga', 'Chandrapur', 'Junagadh', 'Thrissur', 'Alwar', 'Bardhaman',
  'Kulti', 'Kakinada', 'Nizamabad', 'Parbhani', 'Tumkur', 'Khammam', 'Uzhavarkarai',
  'Bihar Sharif', 'Panipat', 'Darbhanga', 'Bally', 'Aizawl', 'Dewas', 'Ichalkaranji',
  'Tirupati', 'Karnal', 'Bathinda', 'Jalna', 'Barasat', 'Kirari Suleman Nagar',
  'Purnia', 'Satna', 'Mau', 'Sonipat', 'Farrukhabad', 'Durg', 'Imphal',
  'Ratlam', 'Hapur', 'Arrah', 'Anantapur', 'Karimnagar', 'Etawah', 'Ambarnath',
  'North Dumdum', 'Bharatpur', 'Begusarai', 'New Delhi', 'Baranagar', 'Tiruvottiyur',
  'Pondicherry', 'Sikar', 'Thoothukudi', 'Rewa', 'Mirzapur', 'Raichur', 'Pali',
  'Khora', 'Abohar', 'Puducherry', 'Jaunpur', 'Porbandar', 'Anantapur', 'Chhindwara',
  'Raiganj', 'Shillong', 'Bhind', 'Bhadreswar', 'Hanumangarh', 'Raiganj', 'Saharsa',
  'Surendranagar', 'Nalgonda', 'Wardha', 'Barh', 'Dindigul', 'Gandhinagar',
  'Arrah', 'Guna', 'Guntakal', 'Hindupur', 'Hospet', 'Jaunpur', 'Kakinada',
  'Karnal', 'Karur', 'Loni', 'Machilipatnam', 'Malegaon', 'Mango', 'Nagercoil',
  'Nandyal', 'Ongole', 'Proddatur', 'Srikakulam', 'Tenali', 'Thanjavur', 'Tirupati',
  'Warangal',
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : cities.filter((city) =>
        city.toLowerCase().includes(inputValue)
      );
};



const getSuggestionValue = (suggestion) => suggestion;

const renderSuggestion = (suggestion) => (
  <div>
    {suggestion}
  </div>
);

function App() {
  const [data, setData] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const apiKey = '895284fb2d2c50a520ea537456963d9c';

  const searchLocation = (location) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
    axios.get(weatherUrl)
      .then((response) => {
        setData(response.data);
        const { lat, lon } = response.data.coord;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=${apiKey}`;
        return axios.get(forecastUrl);
      })
      .then((response) => {
        setForecast(response.data.daily.slice(0, 7));
        setLocation('');
      })
      .catch((error) => {
        console.error("There was an error fetching the weather data!", error);
      });
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setLocation(suggestion);
    searchLocation(suggestion);
  };
  

  const onChange = (event, { newValue }) => {
    setLocation(newValue);
  };

  const inputProps = {
    placeholder: 'Enter Location',
    value: location,
    onChange: onChange
  };

  return (
    <div className="app">
      <h2>Type your city name</h2>
      <br></br>
      <div className="search">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={onSuggestionSelected}
          inputProps={inputProps}
        />
      </div>
      <div className="container">
        {data && data.main && (
          <div className="top">
            <div className="location">
              <p>{data.name}, {data.sys.country}</p>
            </div>
            <div className="temp">
              <h1>{Math.round(data.main.temp)}°F</h1>
            </div>
            <div className="description">
              <p>{data.weather[0].description}</p>
            </div>
          </div>
        )}
        <div className="bottom">
          {forecast.length > 0 && (
            <div className="forecast">
              <h2>7-Day Forecast</h2>
              <div className="forecast-container">
                {forecast.map((day, index) => (
                  <div key={index} className="forecast-day">
                    <p>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p>{Math.round(day.temp.day)}°F</p>
                    <p>{day.weather[0].description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
