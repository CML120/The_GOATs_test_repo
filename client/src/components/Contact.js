import React from "react";
import "./Contact.css";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT } from "../utils/mutations";

export default function Contact() {
  // handle ADD_CONTACT mutation
  const [submitContactForm, { error, data }] = useMutation(ADD_CONTACT);

  // Handle form submission
  const submitFormHandler = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Get the value of input fields and textarea and assign to the variable
    const input = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      message: form.message.value,
    };
    try {
      // Call the submitContactForm mutation with the input variables
      const result = await submitContactForm({
        variables: { input },
      });
      console.log("mutation result: ", result);

      if (result.errors) {
        console.log("mutation error: ", result.errors);
        return;
      }
      const { data } = result;
      // Check if the form submission was successful
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
      <div className="form-heading">
        <h4>Contact us</h4>
      </div>
      <div className="form-container">
        <form onSubmit={submitFormHandler}>
          <div className="input-div">
            <label className="labelEl">Name</label>
            <input
              className="inputField"
              type="text"
              name="firstName"
              placeholder="First Name"
            />
            <input
              className="inputField"
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
          </div>
          <div className="input-div">
            <label className="labelEl">Email</label>
            <input
              className="inputField"
              type="text"
              name="email"
              placeholder="email address"
            />
          </div>
          <div className="input-div">
            <label className="labelEl">Message</label>
            <textarea className="inputField" name="message" />
          </div>
          <button className="formSubmitButton" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
