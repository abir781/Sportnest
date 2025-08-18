import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    // You can replace this with your API call to save emails
    console.log("Subscribed email:", email);

    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="  py-12 ">
       <h2 className="text-3xl text-center font-bold mb-4 ">Subscribe to Our Newsletter</h2>
      <div className="max-w-10/12 mx-auto text-center bg-white p-6 rounded-2xl">
       
        <p className="mb-6 text-gray-600">
          Stay updated with the latest events, news, and special offers from our sports club.
        </p>

        {!subscribed ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 justify-center"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-2/3 px-4 py-3  rounded-xl border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <p className="mt-6 text-green-600 font-semibold">
            🎉 Thanks for subscribing! You’ll hear from us soon.
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
