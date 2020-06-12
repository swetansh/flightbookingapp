import React from 'react';
import Flight from './Flight';
import ReturningFlight from './FlightReturning';
import Header from './Header';
import Loading from './Loading';
import Pagination from "react-js-pagination";

const isInPriceRange = (price, low, high) => {
  if (low) {
    if (price < low) return false
  }
  if (high) {
    if (price > high) return false
  }
  return true
};

const renderFlight = (outFlight, returnFlights, passengers, priceLow, priceHigh) => {
  if(returnFlights)
     return returnFlights.filter(returnFlight => isInPriceRange(outFlight.price + returnFlight.price, priceLow, priceHigh))
      .map(returnFlight => (<ReturningFlight out={outFlight} return={returnFlight} passengers={passengers} />));
  else if (isInPriceRange(outFlight.price, priceLow, priceHigh))
    return <Flight {...outFlight} passengers={passengers} />;
  return null
};

export default (props) => {
  const { outFlights, returnFlights, passengers, priceLow, priceHigh, isFetching } = props;
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flights">
      <Header>Available Flights</Header>
      {isFetching ? <Loading /> : outFlights && outFlights.map(flight => renderFlight(flight, returnFlights, passengers, priceLow, priceHigh)) }
      {outFlights.length ? (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={5}
          totalItemsCount={outFlights.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      ) : null}
    </div>
  );
}
