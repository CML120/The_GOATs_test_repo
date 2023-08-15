import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <div>
        <h4>Contact us</h4>
      </div>
      <div>
        <form>
          <div>
            <label>First Name</label>
            <input type="text" name="firstname" placeholder="First Name" />
            <input type="text" name="firstname" placeholder="Last Name" />
          </div>
          <div>
            <label>Email</label>
            <input type="text" name="email" placeholder="email address" />
          </div>
          <div>
            <label>Message</label>
            <textarea name="message" />
          </div>
        </form>
        <button>Submit</button>
      </div>
    </div>
  );
}
