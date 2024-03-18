import { useQueries, useQuery } from "@tanstack/react-query"
import { getTodo, getTodosIds } from "./api"

export function useTodosIds() {
    return useQuery({
        queryKey: ['todos'],
        queryFn: getTodosIds
    })
}

// 46:46
export function useTodos(ids: (number | undefined)[] | undefined) {
    console.log(ids)
    return useQueries({
        queries: (ids ?? []).map( (id) => {
            return {
                queryKey: ['todo', {id}],
                queryFn: () => getTodo(id!)
            }
        })
    })
}