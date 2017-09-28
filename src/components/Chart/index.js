import React, { Component } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

import './index.css';

class Chart extends Component {
  render() {
    const { chartData } = this.props;
    const { data, names } = chartData;

    console.log(6, chartData);

    return (
      <ResponsiveContainer width="100%" height={400}>
        {
          <LineChart data={data}>
            {names.map(name => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke="#8884d8"
              />
            ))}
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
          </LineChart>
        }
      </ResponsiveContainer>
    );
  }
}

export default Chart;
