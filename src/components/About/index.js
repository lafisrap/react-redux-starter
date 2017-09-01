import React from 'react';
import { connect } from 'react-redux';

const About = props =>
  <div>
    <h1>About Us...</h1>
    {props.food &&
      props.food.map(f =>
        <p key={f._id}>
          {f.description}
        </p>
      )}
  </div>;

const mapStateToProps = state => ({
  food: state.food.food.data
});

export default connect(mapStateToProps)(About);
