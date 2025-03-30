import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { signOut, getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import './auth.css';

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });

    // Get current user's username
    fetchUserAttributes().then(user => {
      setUsername(user.preferred_username ?? "");
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  async function handleSignOut() {
    await signOut();
  }

  return (
    <div>
      <nav>
        <span>Welcome, {username}</span>
        <button onClick={handleSignOut}>Sign Out</button>
      </nav>
      <main>
        <h1>My todos</h1>
        <button onClick={createTodo}>+ new</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.content}</li>
          ))}
        </ul>
        <div>
          🥳 App successfully hosted. Try creating a new todo.
          <br />
          <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
            Review next step of this tutorial.
          </a>
        </div>
      </main>
    </div>
  );
}

export default App;
