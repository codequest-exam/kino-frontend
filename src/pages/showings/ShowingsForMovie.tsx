
import { useEffect } from "react";
import { useParams } from "react-router";

export default function ShowingsForMovie() {
    
    const {id} = useParams();

    useEffect(() => {
        console.log("Fetching showings for movie with id: " + id);
        
    }, []);

    return (<div>{id}</div>)
}
