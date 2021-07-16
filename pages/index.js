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

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {propriedades.items.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a target="_blank" href={`https://github.com/${itemAtual.login}`}>
                <img src={itemAtual.avatar_url} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
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

const [seguidores, setSeguidores] = React.useState([]);

React.useEffect(() => {
  fetch('https://api.github.com/users/MuriloBarreto/followers')
  .then((respostaDoServidor) => {
    return respostaDoServidor.json();
  })
  .then((Resposta) => {
    setSeguidores(Resposta);
  })


  fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Authorization': 'ec578736dc67d92d8bdeaf68599c8a',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({"query": `query {
      allCommunities {
        title
        id
        imageUrl
        url
        creatorSlug
      }
    }`})
  })
  .then((response) => response.json())
  .then((res) => {
    const comunidades = res.data.allCommunities
    console.log(comunidades);
    setComunidades(comunidades);
  })
}, [])


  return (
    <div>
    <AlurakutMenu githubUser={githubUser} />
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
              title: dadosDoForm.get('title'),
              image_url: dadosDoForm.get('image'),
              url: dadosDoForm.get('comunity'),
              creator_slug: githubUser,
            }

            fetch('/api/comunidades', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comunidade),
            })
            .then(async (response) => {
              const dados = await response.json();
              const comunidade = dados.registroCriado;
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas);
            })
            
           
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
            <div>
            <input  
              placeholder="Coloque o link da comunidade aqui" 
              name="comunity" 
              arial-label="Coloque o link da comunidade aqui"
               />
            </div>

            <button >
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{gridarea: 'profileRelationsArea'}}>
      <ProfileRelationsBox title="Seguidores" items={seguidores} />
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
             comunidades ({comunidades.length})
        </h2>

          <ul>
          {comunidades.map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
              <a target='_blank'  href={itemAtual.url}>
                <img src={itemAtual.imageUrl} />
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
              <a href={`#`} >
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
