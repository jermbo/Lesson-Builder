import React from 'react';
import Task from './Task.js'
import './App.css';
/*
Lessons have Steps, Steps have tasks
desc, example, list of tasks
  Task
    Type
    Element
    Instructions
    Hint
    Test
      Item
      Value
*/

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentStep: 0,
      steps: [{
        tasks: [],
        description: '',
        example: '',
        name: '0'
      }]
    };
    this.descriptionChange = this.descriptionChange.bind(this);
    this.exampleChange = this.exampleChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.addStep = this.addStep.bind(this);
    this.getCurrentStep = this.getCurrentStep.bind(this);
    this.setCurrentStep = this.setCurrentStep.bind(this);
  }

  descriptionChange(event) {
    let steps = this.state.steps;
    steps[this.state.currentStep].description = event.target.value;
    this.setState({ steps: steps });
  }

  exampleChange(event) {
    let steps = this.state.steps;
    steps[this.state.currentStep].example = event.target.value;
    this.setState({ steps: steps });
  }

  nameChange(event) {
    let steps = this.state.steps;
    steps[this.state.currentStep].name = event.target.value;
    this.setState({ steps: steps });
  }

  addTask() {
    let steps = this.state.steps;
    steps[this.state.currentStep].tasks.push({
      item: '',
      value: ''
    });
    this.setState(
      {
        steps: steps
      });
  }

  getCurrentStep() {
    return this.state.steps[this.state.currentStep];
  }

  setCurrentStep(event) {
    //divs do not have a value prop
    this.setState({ currentStep: event.target.getAttribute('data-value') });
  }

  addStep() {
    this.state.steps.push({
      tasks: [],
      description: '',
      example: '',
      name: this.state.steps.length
    })
    this.setState({
      steps: this.state.steps
    });
  }

  render() {
    let step = this.getCurrentStep();
    let tasks = step.tasks.map(function (task, index) {
      return <Task key={index} />
    });

    let steps = this.state.steps.map(function (step, index) {
      const isActive = index === this.state.currentStep;
      return <div key={index} data-value={index} className={isActive ? 'step active' : 'step'} onClick={this.setCurrentStep}>{step.name}</div>
    }.bind(this));

    return (
      <div className="app-container">
        <div className="edit-step">
          <h1>Edit Step</h1>
          <label>
            Step Name
          <input value={step.name} onChange={this.nameChange} />
          </label>
          <label>
            Step Description
            <input value={step.description} onChange={this.descriptionChange} />
          </label>
          <label>
            Step Example
            <input value={step.example} onChange={this.exampleChange} />
          </label>
          {tasks}
          <button onClick={this.addTask}>Add Task</button>
        </div>
        <div className="step-legend">
          <h1>Steps</h1>
          {steps}
          <button onClick={this.addStep}>Add Step</button>
        </div>
      </div>
    );
  }
}

export default App;
