import React, {Component} from "react";
import { Manager, Reference, Popper } from "react-popper";
import "./style.css";

import Weather from "./weather";

export default class TodayWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectLocationOpen: false,
    };
  }

  onToggleSelectLocation() {
    this.setState((prevState) => ({
      isSelectLocationOpen: !prevState.isSelectLocationOpen,
    }));
  }

  onLocationNameChange(e) {
    this.setState({
      locationName: e.target.value,
    });
  }

  onSelectCity() {
    const { locationName } = this.state;
    const { eventEmitter } = this.props;
    eventEmitter.emit("updateWeather", locationName);
    this.setState({ isSelectLocationOpen: false });
  }

  render() {
    const { isSelectLocationOpen } = this.state;
    const { eventEmitter } = this.props;

    return (
      <div className="top-container">
        <div className="title">Ma Météo sur 5 jours</div>
        <Weather {...this.props} />
        <Manager>
          <Reference>
            {({ ref }) => (
              <button
                className="btn btn-select-location"
                ref={ref}
                onClick={this.onToggleSelectLocation.bind(this)}
              >
                Recherchez une ville
              </button>
            )}
          </Reference>
          <Popper placement="top">
            {({ ref, style, placement, arrowProps }) =>
              isSelectLocationOpen && (
                <div
                  className="popup-container"
                  ref={ref}
                  style={style}
                  data-placement={placement}
                >
                  <div className="form-container">
                    <label htmlFor="location-name">
                      Recherchez une ville, un pays...
                    </label>
                    <input
                      id="location-name"
                      type="text"
                      placeholder="Ville"
                      onChange={this.onLocationNameChange.bind(this)}
                    />
                    <button
                      className="btn box-select-location"
                      onClick={this.onSelectCity.bind(this)}
                    >
                      Valider
                    </button>
                  </div>
                  <div ref={arrowProps.ref} style={arrowProps.style} />
                </div>
              )
            }
          </Popper>
        </Manager>
      </div>
    );
  }
}
