// import React, { useEffect, useState } from "react";
// // import PracticeLetter from "./practiceLetter";

// // import { renderCarousel } from "@giphy/js-components";
// import { GiphyFetch } from "@giphy/js-fetch-api";

// const giphyApiKey = "AM5Vpj9SrOavAd2CktwDnrIjgpIuMe6j";

// const gf = new GiphyFetch(giphyApiKey);

// // const { data: gifs } = await gf.trending({ limit: 10 })

// // const { data: gifs } = await gf.search("dogs", {
// //   sort: "relevant",
// //   lang: "es",
// //   limit: 10,
// //   type: "stickers",
// // });

// export default function LetterPhonetics(props) {
//   const [phoneticsText, setPhoneticsText] = useState("");
//   const [phoneticsAudio, setPhoneticsAudio] = useState("");

//   useEffect(() => {
//     const fetchPhonetics = async (letter) => {
//       try {
//         const response = await fetch(
//           `https://api.dictionaryapi.dev/api/v2/entries/en/${letter}`
//         );
//         const data = await response.json();
//         if (data.length > 0 && data[0].phonetics.length > 0) {
//           const newPhoneticsText = data[0].phonetics[0].text;
//           setPhoneticsText(newPhoneticsText);

//           const newPhoneticsAudio = data[0].phonetics[0].audio;
//           setPhoneticsAudio(newPhoneticsAudio);
//         }
//       } catch (error) {
//         console.error("Error fetching image:", error);
//       }
//     };
//     fetchPhonetics(props.userSound);
//   }, [props.userSound, phoneticsAudio, phoneticsText]);

//   return (
//     <>
//       <div className="speech-recognition-practice">
//         <h2>Voice Command Practice</h2>

//         <button onClick={() => props.recognitionInstance.start()}>
//           {" "}
//           Learn phonetics
//         </button>
//         <p>You said: {props.userSound}</p>

//         <div>
//           <p>Phonetics: {phoneticsText}</p>
//           {phoneticsAudio && (
//             <audio controls>
//               <source src={phoneticsAudio} type="audio/mp3" />
//             </audio>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
