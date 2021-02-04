import React from "react";
class CapitalizedText extends React.Component {
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
