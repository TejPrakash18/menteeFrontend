const ProgressTracker = ({ value }) => {
    return (
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${value}%` }}
            />
        </div>
    );
};

export default ProgressTracker;
