import React, { useState, useEffect } from "react";
import annyang from "annyang";
import { GiphyFetch } from "@giphy/js-fetch-api";
import "./PlayGround.css";
import WordGuessGame from "./WordGuessGame";

const giphyFetch = new GiphyFetch("AM5Vpj9SrOavAd2CktwDnrIjgpIuMe6j");

function PlayGround() {
    const [spokenWord, setSpokenWord] = useState("");
    const [gifUrl, setGifUrl] = useState("");
    const [listening, setListening] = useState(false);

    useEffect(() => {
        if (listening) {
            annyang.start();
        } else {
            annyang.abort();
        }

        const handleSpeech = async (phrases) => {
            if (phrases && phrases.length > 0) {
                const spoken = phrases[0];
                setSpokenWord(spoken);
                await fetchGiphyImage(spoken);
            }
        };

        annyang.addCallback("result", handleSpeech);

        return () => {
            annyang.removeCallback("result", handleSpeech);
        };
    }, [listening]);

    const fetchGiphyImage = async (word) => {
        try {
            const { data } = await giphyFetch.random({ tag: word });
            console.log("Giphy API Response:", data);
            if (data && data.images.original.url) {
                setGifUrl(data.images.original.url);
            }
        } catch (error) {
            console.error("Error fetching Giphy data:", error);
        }
    };

    return (
        <div className="playground-container">
            <div className="button-container">
                <button className="start-stop-button" onClick={() => setListening(!listening)}>
                    {listening ? "Click Me to Stop Listening!" : "Click Me to Start Listening!"}
                </button>
            </div>
            <p className="spoken-word">What you said: {spokenWord}</p>
            {gifUrl && (
                <div className="gif-container">
                    <img src={gifUrl} alt="Giphy" className="gif-image" />
                </div>
            )}
            
            <WordGuessGame />
        </div>
    );
}

export default PlayGround;
