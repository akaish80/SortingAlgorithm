import React, { Component, Fragment } from "react";
import classnames from 'classnames'
import SortingComponentfrom from "./SortingComponent/SortingComponent";
import "./App.scss";



class App extends Component {
 constructor(props) {
  super(props);
  this.state = {
   activeTab: 1
  };
  this.toggleActiveTab = this.toggleActiveTab.bind(this);
 }

 toggleActiveTab(id){
  this.setState({
   activeTab: id
  });
 }

 render() {

  const renderDesktopTabs = (tabTitles) => {
   const tabClasses = [
    '',
    '',
    '',
    '',
   ];

   if (this.state.activeTab) {
    tabClasses[this.state.activeTab - 1] = `${tabClasses[this.state.activeTab - 1]} active`;
   }

   const tabClass0AnchorProps = tabClasses[0] ? { className: tabClasses[0] } : {};
   const tabClass1AnchorProps = tabClasses[1] ? { className: tabClasses[1] } : {};
   const tabClass2AnchorProps = tabClasses[2] ? { className: tabClasses[2] } : {};
   const tabClass3AnchorProps = tabClasses[3] ? { className: tabClasses[3] } : {};

   return (
    <Fragment>
     <li rel="tab1" {...tabClass0AnchorProps} onClick={() => this.toggleActiveTab(1)}><span>{tabTitles[0]}</span></li>
     <li rel="tab2" {...tabClass1AnchorProps} onClick={() => this.toggleActiveTab(2)} ><span>{tabTitles[1]}</span></li>
    </Fragment>
   )
  };

  const renderComponent = (id, details) => {
   let loadComp;

   switch (id) {
    case 1: {
     loadComp = (
      <SortingComponent/>
     );
     break;
    }
    case 2: {
     loadComp = (<div className="tab__content">
      <h1>{details}</h1>
     </div>
     );
     break;
    }
    case 3: {
     loadComp = (<div className="tab__content">
      <h1>{details}</h1>
     </div>
     );
     break;
    }
    default:
     loadComp = null;
   }
   return loadComp;
  };

  const renderTabDetailComponent = (id, details) => {
   const tabId = `tab${id}`;
   const tabClasses = ['hide', 'hide', 'hide', 'hide'];
   if (this.state.activeTab) {
    tabClasses[this.state.activeTab - 1] = 'active';
   }
   return (
    <div id={`${tabId}`} className={classnames('tab_content', `${tabClasses[id - 1]}`)}>
     {renderComponent(id, details)}
    </div>
   );
  };

  const tabTitles = ['Sorting', 'BBC'];

  return (
   <div>
    <ul className="tabs">
     {renderDesktopTabs(tabTitles)}
    </ul>
    <div className="tab_container">
     {renderTabDetailComponent(1, tabTitles[0])}
     {renderTabDetailComponent(2, tabTitles[1])}
    </div>
   </div>
  );
 }

}

export default App;