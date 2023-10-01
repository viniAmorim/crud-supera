import {Wrapper} from './Welcome.styles'

function Welcome() {
  return (
    <Wrapper>
      <section>
        <h1>Welcome to <span>CRUD</span></h1>
        <p>Start managing your users right now!</p>
        {/*<img src={"/images/home.png"} alt="welcome" />*/}
      </section>
    </Wrapper>
  )
}

export default Welcome;