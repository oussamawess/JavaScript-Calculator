import React from 'react';
import { create, all } from 'mathjs';
import './App.css';

const math = create(all);


class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state={
      output: "0",
      currentValue: "",
      currentFormula: "", 
      isEqualsClicked: false
    }
    
  this.clear = this.clear.bind(this);
  this.typeNumbers = this.typeNumbers.bind(this);
  this.handleOperators = this.handleOperators.bind(this); 
  this.addDecimal = this.addDecimal.bind(this); 
  this.evaluate = this.evaluate.bind(this); 
    
  }
  
  clear() {
     this.setState({
       output: "0",
       currentValue: "",
       currentFormula: "",
       currentOperator: "",
       isEqualsClicked: false
     })
  }  
  
  typeNumbers(e){
    
  //Handle zeroes in the start: 
  if (this.state.currentValue[0] === "0" && e.target.value === "0") {
      this.setState({
        currentValue: this.state.currentValue,
      })
 
  } else {
    
    //If the user starts enetring new numbers directly after pressing "=" (without clicking AC)
    if (this.state.isEqualsClicked && typeof this.state.currentFormula == "number") {
     
      this.setState({
        output: e.target.value,
        currentFormula: e.target.value,
        currentValue: e.target.value,
        isEqualsClicked: false
      }) 
    
    // If the user wants to continue the existing calculation after pressing "="  
    } else if (this.state.isEqualsClicked && typeof this.state.currentFormula == "string") {
     
      this.setState({
        output: e.target.value,
        currentFormula: this.state.currentFormula + e.target.value,
        currentValue: e.target.value,
        isEqualsClicked: false
      }) 
    
    //If it's a first calculation  
    } else { 

      this.setState({
        output: this.state.currentValue + e.target.value,
        currentValue: this.state.currentValue + e.target.value,
        currentFormula: this.state.currentFormula + e.target.value,
        isEqualsClicked: false
      })
     }
   }
  }
  

  handleOperators(e) {
    
    let lastChar = this.state.currentFormula[this.state.currentFormula.length-1];
    let myRegex = /[+\-*\/]/;
    
    //The user presses one of the operators for the first time
    if (!myRegex.test(lastChar)) {
      this.setState({
      currentFormula: this.state.currentFormula + e.target.value,
      currentValue: ""
      })
      
    //The user presses two or more operators consequtievily:  
    } else {
      
      //If the user presses "-" and the previous operator is not "-", we keep it:
      if (lastChar !== "-" && e.target.value == "-") {
        this.setState({
          currentFormula: this.state.currentFormula + e.target.value,
        })
        
      //If the user presses "*", "+" or "/" and the previous operator is "-" (ex.: 5*-+5 = 10), we need to replace all operators before with the last one:
       } else if (e.target.value !== "-" && lastChar == "-") {
          this.setState({
              currentFormula: this.state.currentFormula.slice(0,-2) + e.target.value,
              currentValue: ""
            }) 
         
      //If the user presses "*", "+" or "/" and the previous operator is not a "-", we keep the last operator entered:
       } else {
         this.setState({
            currentFormula: this.state.currentFormula.slice(0,-1) + e.target.value
           })
       }
     }
  }
    

  
  addDecimal(e) { 
    
    let lastChar = this.state.currentFormula[this.state.currentFormula.length-1];
    let myRegex = /[+\-*\/]/;
    
    if (!this.state.currentValue.includes(".") && this.state.isEqualsClicked === false && !myRegex.test(lastChar)) {
      
      this.setState({
          output: this.state.output+".",
          currentFormula: this.state.currentFormula + ".",
          currentValue: this.state.currentValue + "."})
    } 
  
  }
  
  evaluate(e) {
    if (this.state.currentFormula !== "") { 
      
      try {
        let result = math.evaluate(this.state.currentFormula);
        this.setState({
          output: result,
          currentFormula: result,
          isEqualsClicked: true
        });
      } catch (error) {
        this.setState({
          output: 'Error',
          currentFormula: 'Error',
          isEqualsClicked: true
        });
      }
      
    }
  }

  
  render() {
  return (
 <div className="App">

  
  <main>
    <div id="calculator" className="calculator">
      <div id="top">
        <div id="currentFormula">{this.state.currentFormula}</div>
        <div id="display">{this.state.output}</div>
      </div>
      
      <div id="bottom">
        <button id="clear" onClick={this.clear}>AC</button>
        
        <button id="seven" onClick={this.typeNumbers} value="7">7</button>
        <button id="eight" onClick={this.typeNumbers} value="8">8</button>
        <button id="nine" onClick={this.typeNumbers} value="9">9</button>
        <button id="multiply" onClick={this.handleOperators} value="*">x</button>
        <button id="four" onClick={this.typeNumbers} value="4">4</button>
        <button id="five" onClick={this.typeNumbers} value="5">5</button>
        <button id="six" onClick={this.typeNumbers} value="6">6</button>
        <button id="subtract" onClick={this.handleOperators} value="-">-</button>
        <button id="one" onClick={this.typeNumbers} value="1">1</button>
        <button id="two" onClick={this.typeNumbers} value="2">2</button>
        <button id="three" onClick={this.typeNumbers} value="3">3</button>
        <button id="divide" onClick={this.handleOperators} value="/">/</button>
        <button id="add" onClick={this.handleOperators} value="+">+</button>
        <button id="zero" onClick={this.typeNumbers} value="0">0</button>
        <button id="decimal" onClick={this.addDecimal}>.</button>
        <button id="equals" onClick={this.evaluate} value="=">=</button>    
      </div>
    </div>
  </main>
  
  
  </div>)}
}


export default App;
