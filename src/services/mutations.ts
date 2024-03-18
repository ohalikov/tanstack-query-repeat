import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTodo, updateTodo } from "./api"
import { Todo } from "../types/todo"

export function useCreateTodo() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: Todo) => createTodo(data),
        onMutate: () => {
            console.log('mutate')
        },
        onError: () => {
            console.log('error')
        },
        onSuccess: () => {
            console.log('success')
        },
        onSettled: async (_, error) => {
            console.log('end of mutation')
            if (error) {
                console.log(error)
            } else {
                await queryClient.invalidateQueries({
                        queryKey: ['todos']
                    }
                )
            }
        }
    })
}
export function useUpdateTodo() {
    const queryClinet = useQueryClient();

    return useMutation({
        mutationFn: (data: Todo) => updateTodo(data),

        onSettled: async (_,error, variables) => {
            if (error) {
                console.log(error)
            }
            else {
                await queryClinet.invalidateQueries({queryKey: ['todos']})
                await queryClinet.invalidateQueries({
                    queryKey: ['todo', {id: variables.id}]})
            }
        }
    })
}