import "../css/about.css";
const AboutPage = () => {
  return (
    <div className="about-us">
      <div className="container">
        <div className="hero">
          <h1>About RideKap</h1>
          <p>
            We are revolutionizing the way people travel, making it easier,
            affordable, and more sustainable.
          </p>
        </div>

        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            RideKap was founded with the mission to connect people with
            reliable, convenient, and affordable rides, while reducing traffic
            congestion and our environmental impact. We believe that everyone
            deserves access to safe and efficient transportation.
          </p>
        </div>

        <div className="benefits">
          <h2>Benefits for Riders</h2>
          <ul>
            <li>
              <i className="fas fa-dollar-sign"></i> Affordable rides: Get where
              you need to go without breaking the bank.
            </li>
            <li>
              <i className="fas fa-clock"></i> Save time: Skip the hassle of
              parking and traffic.
            </li>
            <li>
              <i className="fas fa-leaf"></i> Be sustainable: Reduce your carbon
              footprint by sharing rides.
            </li>
            <li>
              <i className="fas fa-user-friends"></i> Meet new people: Enjoy
              conversations with fellow riders (optional).
            </li>
          </ul>

          <h2>Benefits for Drivers</h2>
          <ul>
            <li>
              <i className="fas fa-money-bill-alt"></i> Earn extra income: Share
              your unused car seats and turn your commute into a profitable
              experience.
            </li>
            <li>
              <i className="fas fa-road"></i> Avoid traffic jams: Utilize
              carpool lanes and reduce travel time.
            </li>
            <li>
              <i className="fas fa-gas-pump"></i> Save on gas: Share gas costs
              with fellow riders.
            </li>
            <li>
              <i className="fas fa-users"></i> Be part of a community: Connect
              with other drivers and passengers.
            </li>
          </ul>
        </div>

        <div className="commitment">
          <h2>Our Commitment</h2>
          <p>
            We are committed to providing a safe and reliable experience for
            both riders and drivers. We have implemented robust safety measures
            including background checks, real-time tracking, and in-app
            reporting tools. We are constantly innovating to make our platform
            even better.
          </p>
        </div>

        <div className="call-to-action">
          <a href="/register">Join the Ride-Sharing Revolution!</a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
