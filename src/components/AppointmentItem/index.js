import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavouite} = props
  const {id, title, date, isFavourite} = appointmentDetails
  const starImgUrl = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavoriteIcon = () => {
    toggleIsFavouite(id)
  }

  return (
    <li className="appointment-list-item">
      <div className="list-item">
        <p className="title">{title}</p>
        <button
          type="button"
          className="favourite-btn"
          onClick={onClickFavoriteIcon}
          data-testid="star"
        >
          <img src={starImgUrl} className="favourite-icon" alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
