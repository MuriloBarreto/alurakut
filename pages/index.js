import MainGrid from '../src/components/MainGrid/index';
import Box from '../src/components/Box';
import {AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React from 'react';

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />

      <hr />
      <p>
      <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
        @{propriedades.githubUser}
      </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}
export default function Home() {
  const [comunidades, setComunidades] = React.useState([]);
const githubUser = 'MuriloBarreto';
// const comunidades = ['Alurakut'];
const pessoasFavorites = [ 
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
]

  return (
    <div>
    <AlurakutMenu />
    <MainGrid >
      <div className="profileArea" style={{gridarea: 'profileArea'}}>
        <ProfileSidebar githubUser={githubUser} />
      </div>
      <div className="welcomeArea" style={{gridarea: 'welcomeArea'}}>
        <Box>
        <h1 className="title">
              Bem vindo(a) 
        </h1>

        <OrkutNostalgicIconSet />
        </Box>

        <Box>
          <h2 className="subTitle">O que você deseja fazer</h2>
          <form onSubmit={function handleCriarComunidade(e){
            e.preventDefault();
            const dadosDoForm = new FormData(e.target);

            const comunidade = {
              id: new Date().toISOString,
              title: dadosDoForm.get('title'),
              image: dadosDoForm.get('image'),
            }

            // comunidades.push('Alura');
            const comunidadesAtualizadas = [...comunidades, comunidade]
            setComunidades(comunidadesAtualizadas);
          }}>
            <div>
              <input  
              placeholder="Qual vai ser o nome da sua comunidade" 
              name="title" 
              arial-label="Qual vai ser o nome da sua comunidade"
              type="text" />
            </div>
            <div>
            <input  
              placeholder="Coloque uma URL para usarmos de capa" 
              name="image" 
              arial-label="Coloque uma URL para usarmos de capa"
               />
            </div>

            <button >
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{gridarea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
             comunidades ({comunidades.length})
        </h2>

          <ul>
          {comunidades.map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
              <a href={`/users/${itemAtual.title}`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
            )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper >
        <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavorites.length})
        </h2>
          
          <ul>
          {pessoasFavorites.map((itemAtual) => {
            return (
              <li  key={itemAtual}>
              <a href={`/users/${itemAtual}`}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
              </a>
            </li>
            )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </div>
  )
}
