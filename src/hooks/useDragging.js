import { useEffect, useRef, useState } from "react";

function useDragging({ x = 0, y = 0 }, containerRef, onStoppedDraggingHandler) {
    const [isDragging, setIsDragging] = useState(false);
    const [wasDragging, setWasDragging] = useState(false);
    const [pos, setPos] = useState({ x, y });
    const [containerPos, setContainerPos] = useState({x: 0, y: 0});
    const ref = useRef(null);

    useEffect(() => {
        setContainerPos(containerRef.current.getBoundingClientRect());
    }, [containerRef.current]);

    useEffect(() => {
        if(isDragging) {
            setWasDragging(true);
        }
        
        if(!isDragging && wasDragging) {
            onStoppedDraggingHandler();
            setWasDragging(false);
        }

    }, [isDragging]);

    function onMouseMove(e) {
        if (!isDragging) return;

        setPos({
            x: e.x - ref.current.offsetWidth / 2 - containerPos.x,
            y: e.y - ref.current.offsetHeight / 2 - containerPos.y,
        });

        e.stopPropagation();
        e.preventDefault();
    }

    function onMouseUp(e) {
        setIsDragging(false);
        e.stopPropagation();
        e.preventDefault();
    }

    function onMouseDown(e) {
        if (e.button !== 0) return;
        setIsDragging(true);

        // Prevent changing focus
        e.stopPropagation();
        e.preventDefault();
    }

    // When the element mounts, attach an mousedown listener
    useEffect(() => {
        ref.current.addEventListener("mousedown", onMouseDown);

        return () => {
            ref.current?.removeEventListener("mousedown", onMouseDown);
        };
    }, [ref.current]);

    // Everytime the isDragging state changes, assign or remove
    // the corresponding mousemove and mouseup handlers
    useEffect(() => {
        if (isDragging) {
            containerRef.current.addEventListener("mouseup", onMouseUp);
            containerRef.current.addEventListener("mousemove", onMouseMove);
        } else {
            containerRef.current.removeEventListener("mouseup", onMouseUp);
            containerRef.current.removeEventListener("mousemove", onMouseMove);
        }
        return () => {
            if (!containerRef.current) return;

            containerRef.current.removeEventListener("mouseup", onMouseUp);
            containerRef.current.removeEventListener("mousemove", onMouseMove);
        };
    }, [isDragging]);

    return [ref, pos.x, pos.y, isDragging];
}

export default useDragging;