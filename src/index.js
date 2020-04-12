import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Loadable from 'react-loadable';
import './index.scss';


const App = Loadable({
  loader: () => import(/* webpackChunkName: 'app-comp' */ './components/App'),
  loading: () => false,
 });
 

const Index = () => {
  return <div className="grid-100"><Header/><App/></div>;
};

ReactDOM.render(<Index />, document.getElementById("root"));