import React from "react";
import { PinData } from "../context/pinContext";
import { Loading } from "../components/loading";
import PinCard from "../components/PinCard";
import "../styles/home.css";

const Home = () => {
    const { pins, loading } = PinData();

    return (
        <div>
            {/* no Pins */}
            {loading ? (
                <Loading />
            ) : (
                <div className="container py-4">
                    <div className="row justify-content-center">
                        {pins && pins.length > 0 ? (
                            pins.map((e, i) => (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                                    <PinCard pin={e} />
                                </div>
                            ))
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
