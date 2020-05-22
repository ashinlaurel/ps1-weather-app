import React, { Component } from "react";
import Weather from "./Weather";
import Forecast from "./Forecast";
import Axios from "axios";
import Navbar from "./Navbar";

export class BodyApp extends Component {
  state = {
    coords: {
      latitude: 50,
      longitude: 50,
    },
    apiweather: "2f998fbdaf6a97245fe76c92e932776b",
    currentdata: {},
    forecastdata: [],
    inputData: "",
    image: "",
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let ncoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        this.setState({ coords: ncoords });

        // ApiCall forecast;
        Axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&units=metric&exclude=hourly,minutely&appid=${this.state.apiweather}`
        ).then((res) => {
          //   console.log(res.data.daily);
          let fdata = res.data.daily;
          this.setState({ forecastdata: fdata });
        });

        //Apicurrent
        Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&units=metric&appid=${this.state.apiweather}`
        ).then((res) => {
          //   console.log(res);
          let cdata = {
            location: res.data.name,
            country: res.data.sys.country,
            temp: res.data.main.temp,
            icon: res.data.weather[0].icon,
            weathertype: res.data.weather[0].main,
          };

          //ImageGet!!!!!!!
          Axios({
            method: "GET",
            url:
              "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
            headers: {
              "content-type": "application/octet-stream",
              "x-rapidapi-host":
                "contextualwebsearch-websearch-v1.p.rapidapi.com",
              "x-rapidapi-key":
                "834e5af748mshf15f04940919b7ep133adfjsn4e5f85d637eb",
              useQueryString: true,
            },
            params: {
              autoCorrect: "false",
              pageNumber: "1",
              pageSize: "1",
              q: cdata.location,
              safeSearch: "true",
            },
          })
            .then((response) => {
              //   console.log(response.data.value[0].url);
              let imdage = response.data.value[0].url;
              //   console.log(imdage);
              this.setState({ image: imdage });
            })
            .catch((error) => {
              console.log(error);
            });

          this.setState({ currentdata: cdata });
        });
      });
    } else {
      console.log("Location Not Supported!");
    }
  }

  change = (value) => {
    this.setState({ inputData: value });
  };

  changefull = (event) => {
    event.preventDefault();

    //ApiCallCurrent
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputData}&units=metric&appid=${this.state.apiweather}`
    ).then((res) => {
      //   console.log(res);
      let cdata = {
        location: res.data.name,
        country: res.data.sys.country,
        temp: res.data.main.temp,
        icon: res.data.weather[0].icon,
        weathertype: res.data.weather[0].main,
      };
      //New coordinates
      let ncoords = {
        latitude: res.data.coord.lat,
        longitude: res.data.coord.lat,
      };
      this.setState({ currentdata: cdata });
      this.setState({ coords: ncoords });
      Axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&units=metric&exclude=hourly,minutely&appid=${this.state.apiweather}`
      ).then((res) => {
        //   console.log(res.data.daily);
        let fdata = res.data.daily;
        this.setState({ forecastdata: fdata });
      });

      //ImageChange
      Axios({
        method: "GET",
        url:
          "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "834e5af748mshf15f04940919b7ep133adfjsn4e5f85d637eb",
          useQueryString: true,
        },
        params: {
          autoCorrect: "false",
          pageNumber: "1",
          pageSize: "1",
          q: cdata.location,
          safeSearch: "true",
        },
      })
        .then((response) => {
          //   console.log(response.data.value[0].url);
          let imdage = response.data.value[0].url;
          //   console.log(imdage);
          this.setState({ image: imdage });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  render() {
    //Setting Forecast Component calls
    // console.log(this.state.curdate);

    const forecastwithdata = this.state.forecastdata
      .slice(1)
      .map((item) => <Forecast key={item.id} passdata={item} />);
    // console.log(this.state.forecastdata[3]);
    return (
      <div>
        <div>
          <Navbar
            changeRegion={this.change}
            changeAll={this.changefull}
            temp={this.state.currentdata.temp}
            location={this.state.currentdata.location}
          />
        </div>

        <div className="flex jusity-center items-center">
          <div className="flex justify-between items-center w-full ">
            <div className="forecast w-1/3 flex justify-between items-center flex-col">
              <div className=" pl-6 flex justify-between items-center text-2xl w-full">
                Weather Forecasts For The Week
              </div>
              <div className="flex flex-col pb-2 mb-2  mt-2">
                {forecastwithdata}
              </div>
            </div>
            <div className="current w-1/3  p-10 mb-10">
              <Weather passdata={this.state.currentdata} />
            </div>
            <div className="image w-1/3  m-3 flex justify-between items-center ">
              <div className="flex flex-wrap justify-center ">
                <div className=" w-full px-1 mt-20 pt-20 mr-5  flex justify-center items-center mb-10">
                  <img
                    src={this.state.image}
                    alt="placeimage"
                    className="shadow flex items-center rounded-full max-w-full h-auto  align-middle border-none shadow-lg hover:shadow-2xl mb-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BodyApp;
