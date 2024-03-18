import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from '../services/mutations';
import { useTodos, useTodosIds } from '../services/queries';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Todo } from '../types/todo';
import { useState } from 'react';

export default function Todos() {
  const [todo, setTodos] = useState<Todo>();
  const todoIdsQuery = useTodosIds();
  const todosQueries = useTodos(todoIdsQuery.data);

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    // console.log('todo ===> ', todo)
    debugger;
    setTodos({
      title: '',
      description: '',
      checked: false,
    });
    createTodoMutation.mutate(data);
  };
  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true });
    }
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation.mutate(id);
  };
  const handleChangeTitleTodo = (e: { target: { value: string } }) => {
    setTodos({
      title: e.target.value,
      description: todo?.description ?? '',
      checked: todo?.checked ?? false,
    });
  };

  const handleChangeDescriptionTodo = (e: { target: { value: string } }) => {
    setTodos({
      title: todo?.title ?? '',
      description: e.target.value,
      checked: todo?.checked ?? false,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo:</h4>
        <input
          placeholder="Title"
          {...register('title')}
          onChange={handleChangeTitleTodo}
          value={todo?.title}
        />
        <br />
        <input
          placeholder="Description"
          {...register('description')}
          onChange={handleChangeDescriptionTodo}
          value={todo?.description}
        />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? 'Creating...' : 'Create Todo'}
        />
      </form>
      {todoIdsQuery.data?.map((id) => (
        <p key={id}>{id}</p>
      ))}

      <ul>
        {todosQueries.map(({ data }) =>
          data?.id ? (
            <li key={data.id}>
              <div> id: {data?.id}</div>
              <span>
                <strong>Title:</strong> {data?.title},{' '}
                <strong>Description:</strong> {data?.description}
              </span>
              <div>
                <button
                  onClick={() => handleMarkAsDoneSubmit(data)}
                  disabled={data?.checked}
                >
                  {data?.checked ? 'Done' : 'Mark as Done'}
                </button>
                {data && data?.id && (
                  <button onClick={() => handleDeleteTodo(data.id!)}>
                    Delete
                  </button>
                )}
              </div>
            </li>
          ) : null
        )}
      </ul>
    </>
  );
}
