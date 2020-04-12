import React, { Component, Fragment } from "react";
import SelectionSort from './html/SelectionSort.html';
import InsertionSort from './html/insertionSort.html';

import "./SortingComponent.scss";

class SortingComponent extends Component {

 constructor() {
  super()
  this.toggleTab = this.toggleTab.bind(this);
  this.state = {
   active: 0
  }
 }

 toggleTab(id) {
  this.setState({
   active: id
  })

 }

 render() {

  const renderButtons = (sortingMechanism) => {
   let classNames = "";

   return (
    <Fragment>
     {
      sortingMechanism.map((list, index) => {
       classNames = (this.state.active === index) ? "tablinks active" : "tablinks ";
       return (<button className={classNames} key={index} onClick={() => this.toggleTab(index)} id="defaultOpen">{list.title}</button>);
      }
      )
     }
    </Fragment>
   )
  };

  const renderSortComponent = (sortingMechanism, id) => {
   let loadComp;

   switch (id) {
    case 0:
     loadComp =  SelectionSort;
     break;
    case 1:
     loadComp =  InsertionSort;
     break;
    default:
     break;
   }
   return (
    <Fragment>
     <h1>{sortingMechanism[id].title}</h1>
     <div className="sorting_content" dangerouslySetInnerHTML={{ __html: loadComp }} />
    </Fragment>
   );
  }
  const sortingMechanism = [
   { title: 'Selection Sort', file: 'SelectionSort' },
   { title: 'Insertion Sort', file: 'InsertionSort' },
   { title: 'Merge Sort', file: 'MergeSort' }];
  return (
   <div className="tab__content">
    <div className="vertical-tab">
     {renderButtons(sortingMechanism)}
    </div>
    <div className="sorting__container">
     {renderSortComponent(sortingMechanism, this.state.active)}
    </div>
   </div>
  )
 }
}

export default SortingComponent;