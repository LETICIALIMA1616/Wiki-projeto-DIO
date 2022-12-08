import { useState } from 'react';
import gitLogo from '../assets/github.png';
import Input from '../componentes/Input';
import Button from '../componentes/Button';
import ItemRepo from '../componentes/ItemRepo';
import { api } from '../services/api';


import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);


  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if (data.id){

      const isExist = repos.find(repo => repo.id === data.id)

      if (!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return 
      }
    }
    alert('Repositorio não encontrado')
  }

  const handleRemoveRepo = (id) => {
    console.log('Removendo', id)

      const remove = repos.filter(remid => remid.id === repos.id)
   
      if (remove){
        setRepos([]);
      }
  }


  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}


export default App;
