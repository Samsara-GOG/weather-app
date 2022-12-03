import React, {Component} from 'react';

import { EventEmitter } from 'events';

export default class Store extends Component {
  constructor(props) {
    super(props);

    this.eventEmitter = new EventEmitter();

    // Main App State
    this.state = {
      appName: "La météo"
    };
  }

  render() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { 
        ...this.state, 
        eventEmitter: this.eventEmitter
      });
    });
  }
}
