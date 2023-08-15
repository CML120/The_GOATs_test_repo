import React from "react";
import "./Contact.css";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT } from "../utils/mutations";

export default function Contact() {
  const [submitContactForm, { error, data }] = useMutation(ADD_CONTACT);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const form = e.target.value;
    const input = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      message: form.message,
    };
    try {
      const { data } = await submitContactForm({
        variables: { input },
      });
      if (data.submitContactForm.success) {
        console.log("Form submitted successfully.");
      } else {
        console.error("Form submission failed.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="contact-container">
      <div>
        <h4>Contact us</h4>
      </div>
      <div>
        <form onSubmit={submitFormHandler}>
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
        <button type="submit">Submit</button>
      </div>
    </div>
  );
}
