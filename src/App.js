import React from "react";
import Axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import BodyApp from "./components/BodyApp";

class App extends React.Component {
  render() {
    return (
      <body className="bg-blue-300 flex justify-center items-center h-screen">
        <div className="w-2/3 bg-red-400  flex-col rounded-lg shadow-xl hover:shadow-2xl overflow-hidden ">
          <BodyApp />
        </div>
      </body>
    );
  }
}

export default App;
