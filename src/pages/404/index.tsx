import React from "react";
import "./404.css";

class NotFound extends React.Component {
  render() {
    return (
      <div id="page">
        <div>
          <h1>404</h1>
          <h3>Page Not Found</h3>
          <div>
            <a style={{ textDecoration: "none" }} href="/">
              <h4>Please click here to return to the weather app</h4>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
