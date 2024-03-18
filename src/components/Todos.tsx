import { useIsFetching } from "@tanstack/react-query";
import { useTodosIds } from "../services/queries";

export default function Todos() {
    const todoIdsQuery = useTodosIds();
    const isFetching = useIsFetching()
    // if (todoIdsQuery.isPending) {
    //     return <span>loading ...</span>
    // }

    // if (todoIdsQuery.isError) {
    //     return <span>there is an error!</span>
    // }

    return (
        <>
            <p>Query function status: {todoIdsQuery.fetchStatus}</p>
            <p>Query data status: {todoIdsQuery.status}</p>
            <p>Query isFetching: {isFetching}</p>
            {todoIdsQuery.data?.map((id) => (
                <p key={id}>{id}</p>
            ))}
        </>
    )
    

    
}