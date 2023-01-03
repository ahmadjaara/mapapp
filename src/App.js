import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect,useState,useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';



mapboxgl.accessToken = 'pk.eyJ1IjoiYWhtYWR5amFhcmEiLCJhIjoiY2xjZWllZmZyMGJkZDNzazU1dnhwaHI0bCJ9.kQ0B78oooUcnE-bCtqmXIA';

function App() {
const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(35.928371);
const [lat, setLat] = useState(31.945368);
const [city, setcity] = useState("");
const zoom=6;
const [loading, setLoading] = useState(false);
 
useEffect(() => {
  map.current = new mapboxgl.Map({
  container: mapContainer.current,
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [lng, lat],
  zoom: zoom
  });
  },[lng,lat]);
  
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    await axios.get("http://api.positionstack.com/v1/forward?access_key=7c8e279bcdab8ae047a74d3979ab5ae3&query="+city).then((res) => {
        
        const list=[res.data.data[0].latitude,res.data.data[0].longitude]
        setLat(list[0])
        setLng(list[1])
        console.log(list[0],list[1],res,city,loading)
        setLoading(false)
        
    })
    .catch((e) => {
      setLoading(false)
      alert("can't find the location...please try again");
    })
  };





  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            Mapy website
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div ref={mapContainer} className="map-container" />
      
      <Form className=' container w-25 center my-5 'onSubmit={handelSubmit}>
      <Form.Group className=" mb-3" >
        <Form.Label>Let's search</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter place" 
        required
        value={city}
        onChange={(e)=>{setcity(e.target.value)}}
         />
      </Form.Group>
      
      <Button  variant="primary" type="submit">
      {loading ? "Loading.." : "Search"}
      </Button>
    </Form>

    </div>
  );
}

export default App;
