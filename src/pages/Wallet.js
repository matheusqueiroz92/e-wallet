import React from 'react';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div>TrybeWallet</div>
        <Header />
        <form>
          <label htmlFor="valor">
            Valor:
            <input
              type="number"
              name="valor"
              id="valor"
              value="valor"
              onChange={ () => {} }
              data-testid="attr1-input"
            />
          </label>
        </form>
      </div>
    );
  }
}

export default Wallet;
