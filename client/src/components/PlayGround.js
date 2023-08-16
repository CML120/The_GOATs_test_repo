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
    const [showInstructions, setShowInstructions] = useState(true);

    const handleStartListening = () => {
        setListening(true);
        setShowInstructions(false);
    };

    const handleStopListening = () => {
        setListening(false);
    };

    useEffect(() => {
        const handleSpeech = async (phrases) => {
            if (phrases && phrases.length > 0) {
                const spoken = phrases[0];
                setSpokenWord(spoken);
                await fetchGiphyImage(spoken);
            }
        };

        if (listening) {
            annyang.addCallback("result", handleSpeech);
            annyang.start();
        } else {
            annyang.removeCallback("result", handleSpeech);
            annyang.abort();
        }

        return () => {
            annyang.removeCallback("result", handleSpeech);
            annyang.abort();
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
            <div className="speech-recognition-container">
                {showInstructions && (
                    <p className="instruction-text">
                        Click the button below and say a word. Watch for the magic to happen!
                    </p>
                )}
                {listening ? (
                    <button className="start-stop-button" onClick={handleStopListening}>
                        Click Me to Stop Listening!
                    </button>
                ) : (
                    <button className="start-stop-button" onClick={handleStartListening}>
                        Click Me to Start Listening!
                    </button>
                )}
            </div>
            <p className="spoken-word-PG">What you said: {spokenWord}</p>
            {gifUrl && (
                <div className="gif-container-PG">
                    <img src={gifUrl} alt="Giphy" className="gif-image" />
                </div>
            )}

            <div className="word-guess-game-container">
                <WordGuessGame />
            </div>
        </div>
    );
}

export default PlayGround;
