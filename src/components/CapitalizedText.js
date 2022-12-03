import React, {Component} from "react";

class CapitalizedText extends Component {
  render() {
    return jsUcfirst(this.props.text);
  }
}

function jsUcfirst(string) {
  if (!string) {
    return "";
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
export default CapitalizedText;
