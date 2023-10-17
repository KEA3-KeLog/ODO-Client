import React, {useEffect} from "react";

function ResizedComponent() {
    const handleResize = () => {
        console.log(`브라우저 화면 사이즈 x: ${window.innerWidth}, y: ${window.innerHeight}`);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div>
            브라우저 화면 사이즈 x: {window.innerWidth}, y: {window.innerHeight}
        </div>
    );
}

export default ResizedComponent;