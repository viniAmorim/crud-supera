import {Wrapper} from './Welcome.styles'

function Welcome() {
  return (
    <Wrapper>
      <section>
        <h1>Bem vindo ao <span>CRUD</span></h1>
        <p>Comece a gerenciar os seus usuários agora mesmo!</p>
        <img src={"/images/home.png"} alt="welcome" />
      </section>
    </Wrapper>
  )
}

export default Welcome;