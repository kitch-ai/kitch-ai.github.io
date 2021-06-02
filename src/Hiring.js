import React, { useState, useEffect } from "react";

const Hiring = () => {
    const [page, setPage] = useState('initial');

    useEffect(() => {
    }, [])

    return <div>
        { page === "initial" && (
            <div>This is the first inital page
                <a href="" onClick={() => setPage("second")}>Click me to get to second page</a>
            </div>
        )}
        { page === "second" && (
            <div>This is the second page</div>
        )}
    </div>
}

export default Hiring;
