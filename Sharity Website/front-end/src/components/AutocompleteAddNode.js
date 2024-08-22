import React, { Component } from 'react';
import MoveToLocation from './map/MoveToLocation';

export class AutocompleteAddNode extends Component {
  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: '',
    shouldMove: false,
    moveTo: null
  };

  onChange = (e) => {
    const userInput = e.currentTarget.value;

    this.fetchOptions(userInput);

    this.setState({
      userInput: e.currentTarget.value
    });
  };

  fetchOptions = (userInput) => {
    fetch(`http://api.postcodes.io/postcodes/${userInput}`)
      .then(res => res.json())
      .then((filteredOptions) => {
        console.log(filteredOptions)
        if(filteredOptions.status===200){
          this.setState({
            activeOption: 0,
            filteredOptions:[filteredOptions.result],
            showOptions: true
          });
        }
      })
      .catch(console.log)
  }
  

  moveToLocation = (e, location) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText,
      shouldMove: true,
      moveTo: location
    });
  }

  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((option, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} key={index} onClick={(e) => this.moveToLocation(e, option)}>
                  {option.admin_district}, {option.admin_ward}, {option.postcode}, {option.region}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }

    return (
      <>
        <div className="autocomplete d-flex flex-column align-items-center">
          <div className="search">
            <input
              type="text"
              className="search-box"
              placeholder="Enter postcode"
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
            />
            <input type="submit" value="" className="search-btn" />
          </div>
          {optionList}
        </div>

        <MoveToLocation state={this.state} setState={this.setState.bind(this)} />
      </>
    );
  }
}

export default AutocompleteAddNode;