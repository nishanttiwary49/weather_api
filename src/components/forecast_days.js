import React from "react";
import './forecast_days.scss'

class Forecast_days extends React.Component {
  render() {
      var f=-1;
      const item = this.props.days.map((i,j) => {
          const image = {
              url: `http://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`,
              alt: `Image of  ${i.weather[0].description}`,
            };
            const description = i.weather[0].description;
            const unixTimestamp = i.dt;
            let date = new Date(unixTimestamp * 1000).getDate();
            let month = new Date(unixTimestamp * 1000).getMonth() + 1;
            let year = new Date(unixTimestamp * 1000).getFullYear();
            f++;
            if(f<7)
            {
                return (
                <div key={j} className="forecast-item">
                    <p className="forecast-item__time">{date}-{month}-{year}</p>
                    <p className="forecast-item__temp">
                        {((i.temp.day-32)*5/9).toFixed(2)} <span className="forecast-item__degree">°</span>
                    </p>
                    <img className="forecast-item__img" src={image.url} alt={image.alt} />
                    <p className="forecast-item__description">{description}</p>
                    </div>
                    );
                }
            });
            return (
            <div className="forecast_daily">
                <h3 className="forecast__title">Days Forecast</h3>
                <div className="forecast-items">{item}</div>
                </div>
                );
            }
        }
export default Forecast_days;