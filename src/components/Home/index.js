import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Media,
  ButtonToolbar,
  SplitButton,
  MenuItem,
  Panel,
  Button
} from 'react-bootstrap';
import { getBars, bookBar } from '../../modules/bars';

class Home extends Component {
  componentDidMount() {
    this.props.getBars('Turiner Straße 21, Berlin');
  }

  render() {
    const { bars, user, bookBar } = this.props;

    if (!bars || !bars.length) return <div className="spinner" />;

    return (
      <section id="home">
        <Panel>
          {bars.map(bar => {
            const {
              id,
              url,
              image_url,
              name,
              rating,
              price,
              bookedby,
              location
            } = bar;
            const num = (bookedby && bookedby.length) || 0;
            const booked =
              (user && bookedby && bookedby.indexOf(user.username) > -1) ||
              false;
            const button =
              user &&
              (booked
                ? <Button onClick={() => bookBar(id, false, user)}>
                    Cancel Booking
                  </Button>
                : <Button onClick={() => bookBar(id, true, user)}>
                    Book
                  </Button>);
            const bookedList = num
              ? <ButtonToolbar>
                  <SplitButton
                    title={`${num} going.`}
                    dropup
                    id="split-button-dropup"
                  >
                    {bookedby.map((username, i) =>
                      <MenuItem key={username} eventKey={i + 1}>
                        {username}
                      </MenuItem>
                    )}
                  </SplitButton>
                  {button}
                </ButtonToolbar>
              : <div>
                  No bookings yet {button}
                </div>;

            return (
              <Media key={id}>
                <Media.Left>
                  <a href={url}>
                    <img width={128} height={128} src={image_url} alt={name} />
                  </a>
                </Media.Left>
                <Media.Body>
                  <Media.Heading>
                    {name}
                  </Media.Heading>
                  <p>{`Rating: ${rating}`}</p>
                  <p>{`Price: ${price}`}</p>
                  <p>
                    {location.display_address.map(line =>
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    )}
                  </p>
                  {bookedList}
                </Media.Body>
                <Media.Right />
              </Media>
            );
          })}
        </Panel>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  bars: state.bars.bars,
  user: state.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBars,
      bookBar
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
