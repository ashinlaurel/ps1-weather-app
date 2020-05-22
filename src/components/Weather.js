import React, { Component } from "react";
import line from "../assets/line.png";

export class Weather extends Component {
  render() {
    // console.log(this.props.passdata);
    return (
      <div className="box">
        <div className="top flex  justify-center items-center  pt-10">
          <div className="w-1/3 flex flex-col justify-center items-center ml-6 ">
            <div className=" flex justify-center items-center  ">
              {/* <i className="fa fa-snowflake-o fa-5x" aria-hidden="true"></i> */}
              <img
                src={
                  "http://openweathermap.org/img/wn/" +
                  this.props.passdata.icon +
                  "@2x.png"
                }
                className=" w-20 h-20   "
                alt="wicon"
              />
            </div>
            <p className="text-3xl">{this.props.passdata.weathertype}</p>
          </div>
          <div className="w-1/3">
            <img className="" src={line} />
          </div>
          <div className="w-1/3 text-6xl  mr-20">
            {this.props.passdata.temp}
            <sup>
              <span>&#176;</span>
            </sup>
          </div>
        </div>
        <div className="bot flex flex-col items-end m-4 mr-20 ">
          <div className="font-bold text-2xl">Current Weather</div>
          <div className="text-lg">
            {this.props.passdata.location + "," + this.props.passdata.country}
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
