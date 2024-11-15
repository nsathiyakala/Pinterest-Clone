export const LoadingAnimation = () => {
    return (
        <div className="spinner-border text-white" style={{ width: "1.25rem", height: "1.25rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 mt-5">
            <div
                className="spinner-border text-danger"
                style={{ width: "3.5rem", height: "3.5rem", borderWidth: "0.25rem" }}
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};
