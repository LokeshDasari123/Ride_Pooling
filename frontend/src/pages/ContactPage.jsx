import React from "react";

const ContactPage = () => {
  return (
    <div className="container mx-auto py-2">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-4">
            Have a question, feedback, or suggestion? We'd love to hear from
            you! Fill out the form below, and we'll get back to you as soon as
            possible.
          </p>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input w-full border rounded-md px-4 py-2"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input w-full border rounded-md px-4 py-2"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-bold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="form-textarea w-full border rounded-md px-4 py-2"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p>1113 Srm</p>
            <p>Neru Konda, Amaravati 522023</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <p>+00 000000000</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p>ananthateja2003@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
