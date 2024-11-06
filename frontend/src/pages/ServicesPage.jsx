import SearchFunc from "./SearchFunc";
const Services = () => {
  return (
    <div className="container mx-auto py-8 my-auto">
        
      <SearchFunc className=""></SearchFunc>
      <h1 className="text-4xl font-bold mb-6 my-12">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Ride Booking</h2>
          <p className="mb-4">
            Book rides for your daily commute or long-distance trips with ease.
            Find available rides, compare prices, and book your seat in just a
            few clicks.
          </p>
          <img src="/ride-booking.svg" alt="Ride Booking" className="mx-auto" />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Driver Services</h2>
          <p className="mb-4">
            Become a driver and offer rides to passengers traveling in your
            direction. Set your own schedule, choose your passengers, and earn
            money while helping others commute.
          </p>
          <img
            src="/driver-services.svg"
            alt="Driver Services"
            className="mx-auto"
          />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Safety & Security</h2>
          <p className="mb-4">
            Your safety is our top priority. We implement strict verification
            processes for drivers and passengers, provide real-time tracking for
            rides, and offer 24/7 customer support.
          </p>
          <img
            src="/safety-security.svg"
            alt="Safety & Security"
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
