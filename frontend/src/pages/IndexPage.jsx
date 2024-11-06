import React from "react";
import styles from "../style.js";
import Bg from "../assets/HomePageBackground.jpeg";

const IndexPage = () => {

  return (
    <div className="relative">
      <div className="backdrop-brightness-0.5 bg-white/30 relative w-full h-72 md:h-96 flex justify-center items-center bg-[#ebf3fa] ">
        <img
          src={Bg}
          alt="Background Image"
          className="object-fit object-cover object-centre w-full h-full opacity-75"
        />
        <h2 className="absolute z-9 text-centre text-4xl font-bold text-black top-20 left-1/2 transform -translate-x-1/2 -translate-y-1">
          Your pick of rides at low prices
        </h2>
      </div>
      {/* Basic Description */}
      <div className="mx-auto max-w-6xl px-7 py-12">
        <ul className="list-none flex basic-description">
          <li className="p-4 flex-col ">
            <strong className="text-custom-blue">
              Your pick of rides at low prices.
            </strong>
            <p>
              No matter where you’re going, by bus or Ridepool, find the perfect
              ride from our wide range of destinations and routes at low prices.
            </p>
          </li>
          <li className="p-4 flex-col">
            <strong className="text-custom-blue">Trust who you travel with.</strong>
            <p>
              We take the time to get to know each of our members and bus
              partners. We check reviews, profiles and IDs, so you know who
              you’re travelling with and can book your ride at ease on our
              secure platform.
            </p>
          </li>
          <li className="p-4 flex-col">
            <strong className="text-custom-blue">Scroll, click, tap and go!</strong>
            <p>
              Booking a ride has never been easier! Thanks to our simple app
              powered by great technology, you can book a ride close to you in
              just minutes.
            </p>
          </li>
        </ul>
      </div>

      <div className="bg-primary bg-opacity-80 mx-auto px-4 py-8 lg:px-8 lg:py-12 flex flex-col lg:flex-row lg:flex-wrap lg:items-center">
        <div className="max-w-6xl mx-auto px-4 lg:px-7 py-6 lg:py-8 w-full lg:w-3/4 lg:pr-4 order-2 lg:order-1">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 text-white">
            Driving in your car soon?
          </h2>
          <div className="mb-8">
            <strong className="text-white block">
              Drivers, great news: your good habits are being rewarded!
            </strong>
            <p className="text-white">
              Benefit from the Ridepool Bonus by Ridepooling. See eligibility
              conditions.
            </p>
          </div>
          <a
            href="/publride"
            className="inline-block py-2 px-4 bg-blue-500 text-white rounded-full"
          >
            Offer a ride
          </a>
        </div>
        <div className="max-w-6xl mx-auto w-full lg:w-1/4 lg:pl-4 order-1 lg:order-2">
          <img
            src="https://s19532.pcdn.co/wp-content/uploads/2015/01/Young-People-Driving.png"
            alt="Driving Image"
            className="w-full lg:w-auto h-auto rounded-full"
          />
        </div>
      </div>

      <div className="help-center">
        <h1 className="text-custom-blue">Help Center</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <li className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold mb-2">
              How do I book a Ridepool ride?
            </h2>
            <p className="text-cust-text-descrip">
              You can book a Ridepool ride on our Website. Simply search for
              your destination, choose the date you want to travel and pick the
              Ridepool that suits you best! Some rides can be booked instantly,
              while other rides require manual approval from the driver. Either
              way, booking a Ridepool ride is fast, simple and easy.
            </p>
          </li>
          <li className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold mb-2">
              How do I publish a Ridepool ride?
            </h2>
            <p className="text-cust-text-descrip">
              Offering a Ridepool ride on RideKap is easy. To publish your ride,
              use our mobile app or RideKap.com. Indicate your departure and
              arrival points, the date and time of your departure, how many
              passengers you can take and the price per seat. You’ll also need
              to choose how you want to accept bookings (either automatically or
              manually), and you have the option of adding any important details
              you think your passengers should know about. Then tap ‘Publish
              ride’ and you’re done!
            </p>
          </li>
          <li className="p-4 bg-gray-100 rounded-l">
            <h2 className="text-xl font-bold mb-2">
              How do I cancel my Ridepool ride?
            </h2>
            <p className="text-cust-text-descrip">
              If you have a change of plans, you can always cancel your Ridepool
              ride from the ‘Your rides’ section of our app. The sooner you
              cancel, the better. That way the driver has time to accept new
              passengers. The amount of your refund will depend on how far in
              advance you cancel. If you cancel more than 24 hours before
              departure, for example, you’ll receive a full refund, excluding
              the service fee.
            </p>
          </li>
          <li className="p-4 bg-gray-100 rounded-l">
            <h2 className="text-xl font-bold mb-2">
              What are the benefits of travelling by Ridepool?
            </h2>
            <p className="text-cust-text-descrip">
              There are multiple advantages to Ridepooling, over other means of
              transport. Travelling by Ridepool is usually more affordable,
              especially for longer distances. Ridepooling is also more
              eco-friendly, as sharing a car means there will be fewer cars on
              the road, and therefore fewer emissions. Taking a Ridepool ride is
              also a safe way to travel in the current times. Because there are
              only a few people in a car, you have fewer points of contact and
              there’s less risk than other travel options.
            </p>
          </li>
          <li className="p-4 bg-gray-100 rounded-l">
            <h2 className="text-xl font-bold mb-2">
              How much does a Ridepool ride cost?
            </h2>
            <p className="text-cust-text-descrip">
              The costs of a Ridepool ride can vary greatly, and depend on
              factors like distance, time of departure, the demand of that ride
              and more. It is also up to the driver to decide how much to charge
              per seat, so it’s hard to put an exact price tag on a ride. Check
              out some of our top Ridepool destinations to get an idea of price,
              or start searching for your next Ridepool ride on RideKap.com.
            </p>
          </li>
          <li className="p-4 bg-gray-100 rounded-l">
            <h2 className="text-xl font-bold mb-2">
              How do I start Ridepooling?
            </h2>
            <p className="text-cust-text-descrip">
              Ridepooling with RideKap is super easy, and free! Simply sign up
              for an account and tell us some basic details about yourself. Once
              you have a RideKap account, you can start booking or publishing
              rides directly on our app or website.
            </p>
          </li>
        </ul>
      </div>

      <h2 style={styles.subtitle}>
        <a
          href="/register"
          className="text-custom-blue text-centre px-4  mx-auto"
        >
          Get started today!
        </a>
      </h2>
    </div>
  );
};

export default IndexPage;
