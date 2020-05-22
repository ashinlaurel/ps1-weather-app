import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <div className="flex justify-between items-center w-full p-4">
        <div className="icons flex justify-between w-1/5 ">
          <div className="">
            <a
              href={
                "https://twitter.com/intent/tweet?text=Current%20Weather%20in%20" +
                this.props.location +
                "%20is%20" +
                this.props.temp +
                "%20.%20For%20live%20weather%20visit&amp;url=https://abcdefg.com/"
              }
              target="_blank"
            >
              <i
                className="fa fa-twitter fa-3x m-2 ml-20 pr-2"
                aria-hidden="true"
              ></i>
            </a>
          </div>
          <div className="">
            <a href="https://instagram.com" target="_blank">
              <i
                class="fa fa-instagram fa-3x m-2 mr-20 pl-2"
                aria-hidden="true"
              ></i>
            </a>
          </div>
        </div>
        <div className=" w-3/5 flex justify-center text-3xl font-bold font-serif uppercase  m-2 select-none">
          Weather App
        </div>
        <div className="search w-1/5 flex  justify-between items-center ">
          <form id="search" onSubmit={(e) => this.props.changeAll(e)}>
            <input
              type="text"
              className="input flex w-4/5 ml-5 outline-none  rounded-lg shadow-lg m-1 mr-4 text-center"
              placeholder="Search"
              onChange={(e) => {
                this.props.changeRegion(e.target.value);
              }}
            ></input>
          </form>
          <div>
            <button
              type="submit"
              form="search"
              className=" focus:outline-none "
            >
              <i
                className="fa fa-search outline-none pr-5 "
                aria-hidden="true "
              ></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
