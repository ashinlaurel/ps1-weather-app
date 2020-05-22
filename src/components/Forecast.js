import React, { Component } from "react";
import line from "../assets/line.png";

export class Forecast extends Component {
  // console.log(Hello)

  render() {
    return (
      <div className="top flex  justify-center items-between mx-10  -black ">
        <div className="w-5/12 flex flex-col justify-center items-center ">
          <div className=" ">
            {/* <i className="fa fa-snowflake-o fa-2x" aria-hidden="true"></i> */}
            <img
              src={
                "http://openweathermap.org/img/wn/" +
                this.props.passdata.weather[0].icon +
                "@2x.png"
              }
              className=" w-20 h-20   "
              alt="wicon"
            />
          </div>
          <p className="text-xs">{this.props.passdata.weather[0].main}</p>
        </div>
        <div className="w-2/12 flex justify-center items-center ">
          <img className="h-20  mr-16  " src={line} />
        </div>
        <div className="w-5/12 text-2xl  flex  items-center pr-15 mr-15 ">
          {this.props.passdata.temp.day}
          <sup>
            <span>&#176;</span>
          </sup>
        </div>
      </div>
    );
  }
}

export default Forecast;
