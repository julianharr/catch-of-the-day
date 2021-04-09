import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };


  addFish = (fish) => {
    // 1. Take a copy of the existing state (never reach INTO state and modify it directly)
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that ^ fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state (updates these pieces of state)
    this.setState({fishes});
  };

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
        />

        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
