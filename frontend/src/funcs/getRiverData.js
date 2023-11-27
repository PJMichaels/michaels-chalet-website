
// This function accesses river IoT sensor data to provide current river conditions

// Water Data API Docs https://waterdata.usgs.gov/blog/api_catalog/
// IoT API Docs: https://docs.ogc.org/is/15-078r6/15-078r6.html#31

const getRiverData = async() => {
    
  const dataStreamsURL = "https://labs.waterdata.usgs.gov/sta/v1.1/Things('USGS-01064500')/Datastreams";
  var observations = {};
  var observationLinks = [];

  observationLinks = await fetch(dataStreamsURL).then(
    res => res.json());

  observationLinks = observationLinks.value;
  
  for (let i = 0; i < observationLinks.length; i++) {
    const observation = await fetch((observationLinks[i]['Observations@iot.navigationLink'] + "?$orderby=phenomenonTime desc&$top=1")).then(res => res.json());
    const label = observationLinks[i]["description"].split(" /")[0];
    observations[label] = observation;
  }

  return (
    [
    ['Air Temperature', observations["Temperature, air, degrees Fahrenheit"]['value'][0]['result'] + ' degrees F'],
    ['Flow Rate', observations['Discharge']['value'][0]['result'] + ' cubic feet per second'],
    ['Guage Height', observations['Gage height']['value'][0]['result'] + ' feet']
    ]
      );
};


export default getRiverData;