import React from "react";

// Do not need to have class Header extends React.Component
// This is a stateless functional component
// It's when you only have a render method inside of your component

const Header = (props) => (
  <header className="top">
    <h1>
      Catch
    <span className="ofThe">
      <span className="of">Of</span>
      <span className="the">The</span>
    </span>
      Day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);

export default Header;
