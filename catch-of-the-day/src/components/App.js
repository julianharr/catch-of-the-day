import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  // LIFECYCLE METHODS

  componentDidMount() {
    const { params } = this.props.match;
    // Reinstate our local storage for our order
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    // Different from the input ref, this is a
    // ref to a piece of data in the database
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    console.log(this.state.order);
  }

  componentWillUnmount() {
    console.log("UNMOUNTED!");
    // Clean up any memory issues this may have
    base.removeBinding(this.ref);
  }


  // END LIFECYCLE METHODS

  addFish = (fish) => {
    // 1. Take a copy of the existing state (never reach INTO state and modify it directly)
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that ^ fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state (updates these pieces of state)
    this.setState({fishes});
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    // 1. Take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. Update the state
    fishes[key] = null;
    // 3. Update state
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    // What is the piece of state to update? fishes. What do we
    // want to update it with? sampleFishes.
    this.setState({ fishes: sampleFishes });
  };

  // Add a menu item to the 'order' column
  addToOrder = (key) => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  }

  removeFromOrder = (key) => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Either remove from the order or update the number in our order
    delete order[key];
    // 3. Call setState to update our state object
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            { Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>

        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />

        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
