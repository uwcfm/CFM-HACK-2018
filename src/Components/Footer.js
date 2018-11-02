import React from 'react';
import { Container } from 'reactstrap';

const styles = {
    container: {
        
    }
}

class Footer extends React.Component {
  render () {
    return(
      <Container fluid style={styles.container}>
        <p className="text-center">Made by CFM Students <a href="https://github.com/martinchu">Martin Chu</a> & <a href="https://github.com/achen831008">Alex Chen</a>.</p>
      </Container>
  );
  }
}
export default Footer;
