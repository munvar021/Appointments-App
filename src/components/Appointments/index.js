import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isStarredAppointmentsActive: false,
  }

  isStarredAppointmentsList = () => {
    const {appointmentsList, isStarredAppointmentsActive} = this.state
    if (isStarredAppointmentsActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isFavourite === true,
      )
    }
    return appointmentsList
  }

  isStarredAppointments = () => {
    const {isStarredAppointmentsActive} = this.state
    this.setState({isStarredAppointmentsActive: !isStarredAppointmentsActive})
  }

  toggleIsFavouite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavourite: !eachAppointment.isFavourite}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isFavourite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  render() {
    const {title, date, isStarredAppointmentsActive} = this.state
    const starredAppointmentsList = this.isStarredAppointmentsList()
    const starredBtnClassName = isStarredAppointmentsActive
      ? 'is-starred'
      : 'is-not-starred'
    // console.log(date, title)

    return (
      <div className="app-container">
        <div className="components-container">
          <div className="appointments-container">
            <div className="appointments-input-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="main-heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  className="input"
                  placeholder="Title"
                  value={title}
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  className="input"
                  value={date}
                  onChange={this.onChangeDate}
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
            <hr className="line" />
            <div className="appointments-list-container">
              <h1 className="sub-heading">Appointments</h1>
              <button
                type="button"
                className={`star-button ${starredBtnClassName}`}
                onClick={this.isStarredAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {starredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsFavouite={this.toggleIsFavouite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
