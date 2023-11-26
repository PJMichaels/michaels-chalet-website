import axios from "axios";

const getObservationData = (observationURL) => {
  var responseData = null;
  responseData = axios.get(observationURL).then((response) => {
  return response.data;});

return responseData;
}

  const getRiverData = async() => {
    const dataStreamsURL = "https://labs.waterdata.usgs.gov/sta/v1.1/Things('USGS-01064500')/Datastreams";
    var observationLinks = null;
    // var result = {};
    
    try {
      observationLinks = await axios.get(dataStreamsURL).then((response) => {
        response.data.value.map((item) => [item["description"].split("/")[0], item["Observations@iot.navigationLink"]])});
    }
    catch (error) {
      console.error('Error fetching data: ', error);
      return null;
    }

    // if (observationLinks) {
    //    observationLinks.forEach((dataStream) => {
    //     result[dataStream[0]] = getObservationData(dataStream[1]).then((response) => {return response;});
    //    })
    // }

    console.log(observationLinks);
    return observationLinks;
    // return result;
  };


export default getRiverData;