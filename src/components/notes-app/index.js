

import React, { Component } from "react";
import "./index.css";

export default class NotesApp extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      status: '',
      notes: [],
      mainNotes: [],
      activeClass: 'all'
    }
  }

  onStatuChange = (e) => {
    this.setState({
      status: e.target.value
    })
  }
  onNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  onAddNote = () => {
    const obj = { name: this.state.name, status: this.state.status };
    this.setState({
      mainNotes: [...this.state.mainNotes, obj],
      notes: [...this.state.notes, obj],
      name: '',
      status: ''

    })

  }
  // componentDidUpdate() {
  //   this.setState({
  //     notes: [...this.state.mainNotes]
  //   })
  //   console.log(this.state);

  // }
  onTabClick = (tab) => {
    switch (tab) {
      case 'all':
        const allNotes = [...this.state.mainNotes]
        this.setState({
          notes: allNotes,
          activeClass: tab
        })
        break;
      case 'active':
        const activeNotes = [...this.state.mainNotes];
        this.setState({
          notes: activeNotes.filter(note => note.status.toLowerCase() === 'active'),
          activeClass: tab
        })
        break
      case 'complete':
        const completeNotes = [...this.state.mainNotes];
        this.setState({
          notes: completeNotes.filter(note => note.status.toLowerCase() === 'completed'),
          activeClass: tab
        })
        break
      default:
        break;
    }
  }
  // isItActive = (active) => active === this.state.activeClass

  render() {
    const tabClassName = 'tab-item slide-up-fade-in';
    const activeclass = this.state.activeClass === 'all' ? 'all' : '';
    console.log(activeclass)
    return (
      <div className="layout-column align-items-center justify-content-start">
        <section className="layout-row align-items-center justify-content-center mt-30">
          <input data-testid="input-note-name" type="text" className="large mx-8"
            placeholder="Note Title" onChange={this.onNameChange} value={this.state.name} />
          <input data-testid="input-note-status" value={this.state.status} type="text" className="large mx-8"
            placeholder="Note Status" onChange={this.onStatuChange} />
          <button className="" data-testid="submit-button" onClick={this.onAddNote} >Add Note</button>
        </section>

        <div className="mt-50">
          <ul className="tabs">
            <li data-testid="allButton" onClick={() => this.onTabClick('all')} className={this.state.activeClass === 'all' ? tabClassName + ' active' : tabClassName} >All</li>
            <li data-testid="activeButton" onClick={() => this.onTabClick('active')} className={this.state.activeClass === 'active' ? tabClassName + ' active' : tabClassName}>Active</li>
            <li data-testid="completedButton" onClick={() => this.onTabClick('complete')} className={this.state.activeClass === 'complete' ? tabClassName + ' active' : tabClassName}>Completed</li>
          </ul>
        </div>
        <div className="card w-40 pt-30 pb-8">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody data-testid="noteList">
              {this.state.notes && this.state.notes.map(note => (
                <tr key={note.name} >
                  <td>{note.name} </td>
                  <td>{note.status} </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
