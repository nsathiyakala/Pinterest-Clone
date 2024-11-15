import React from "react";
import { PinData } from "../context/pinContext";
import { Loading } from "../components/loading";
import PinCard from "../components/PinCard";
import "../styles/home.css";

const Home = () => {
    const { pins, loading } = PinData();

    return (
        <div>
         
            {loading ? (
                <Loading />
            ) : (
                <div className="container py-4">
                    <div className="row justify-content-center">
                        {pins && pins.length > 0 ? (
                            <div className="masonry-grid">
                                {pins.map((e, i) => (
                                    <div className="masonry-item" key={i}>
                                        <PinCard pin={e} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center">No Pins Yet</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
