import React from 'react';

export default function Home() {
    return (
      <div>
        <img style={{ width: 700 }} src="./logo.png" alt="logo" />
        <div>
          <h2>Welcome to the home page</h2>
          <p>
            This is an application to demonstrate how to build a movie ticket
            booking system using React and TypeScript.
          </p>
        </div>
        <div
          style={{
            flex: 1,
            backgroundImage: "url(./logo.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    );
}