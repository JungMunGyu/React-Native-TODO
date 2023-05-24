import EmptyList from '../components/EmptyList';
import List from '../components/List';
import InputFAB from '../components/InputFAB';

const ListScreen = () => {
  const todos = [
    // { id: 1, task: 'test', isDone: false }
  ];

  return (
    <>
      {todos.length ? <List /> : <EmptyList />}
      <InputFAB />
    </>
  );
};

export default ListScreen;
