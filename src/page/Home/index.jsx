/* eslint-disable no-restricted-globals */
import { useEffect, useState, useRef } from "react";
import "./style.css";
import { FaTrash } from "react-icons/fa";
import Api from "../../service/Api";

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await Api.get('/usuarios')

    setUsers(usersFromApi.data)
   
  }

  async function creatUsers() {
   
    await Api.post('/usuarios', {
      name: inputName.current.value,
      age: parseInt(inputAge.current.value),
      email: inputEmail.current.value
    });
    

   
    getUsers()
  }
  async function deleteUsers(id) {
   await Api.delete(`/usuarios/${id}`)

   
   getUsers()
  }
  

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input type="text" name="nome" placeholder="Nome" ref={inputName} />
        <input type="number" name="idade" placeholder="Idade" ref={inputAge} />
        <input type="email" name="email" placeholder="E-mail" ref={inputEmail} />
        <button type="submit" onClick={creatUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.Id} className="infor">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              E-mail: <span>{user.email}</span>
            </p>
          </div>
          <button className="icon-btn" onClick={() => deleteUsers(user.id)} >
            <FaTrash size={24} color="black" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
