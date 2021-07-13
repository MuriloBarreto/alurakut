import MainGrid from '../src/components/MainGrid/index';
import Box from '../src/components/Box';
import {AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

function ProfileSidebar(propriedades) {
  console.log(propriedades);
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}
export default function Home() {
const githubUser = 'MuriloBarreto';
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
      </div>
      <div className="profileRelationsArea" style={{gridarea: 'profileRelationsArea'}}>
        <Box>
          Pessoas da Comunidade
        </Box>
        <ProfileRelationsBoxWrapper >
        <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavorites.length})
        </h2>
          
          <ul>
          {pessoasFavorites.map((itemAtual) => {
            return (
              <li>
              <a href={`/users/${itemAtual}`} key={itemAtual}>
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
