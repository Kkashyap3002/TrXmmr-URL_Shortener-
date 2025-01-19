import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function Location({stats}) {

const cityCount = stats.reduce( (acc, item) => {
    if(acc[item.city]){
        acc[item.city] += 1;
     } else {
    acc[item.city] = 1;
     }
    return acc;
},{} );

        const cities = Object.entries( cityCount).map( ([city, count]) => ({
            city,
            count,
        }));
    console.log(cities);
    console.log(cityCount);

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart width={600} height={300} data={cities.slice(0, 5)}>
        <XAxis dataKey="city" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip labelStyle={{ color: "green" }} />
        <Legend />
        <Line 
        type="monotone" 
        dataKey="city" 
        stroke="#8884d8"
        hoverAnimation = {true}
        activeDot = {{ r: 8 }}
        >
        <LabelList position="top" offset={10} />
        </Line>
        <Line type="monotone" dataKey="count" hover:stroke="#ff0000">
          <LabelList position="top" offset={10} />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
}
