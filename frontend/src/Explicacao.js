import React, {useState} from 'react';
import Header from './Header'

// Component -> Função q retorna um html
// JSX -> html dentro de um js
// Propriedades -> similar ao atributo do hmtl (id, class),
// porém passados no componente e não no elemento
// Estado -> Persiste uma informação, useState
// Imutabilidade -> Não é possível mudar o valor do estado, sobrepor o estado

function App() {

  const [count, setCount] = useState(0);
  // array[valor,funçãoDeAtualização]

  function increment(){
    setCount(count + 1);
    console.log(count)
  }

  return (
    <div>
    {/*title == propriedade passada como parametro */}
   <Header /*title="Semana Omnistack"*/>
     Contador: {count}
    </Header>
    <button onClick={increment}>Incrementar</button>
    </div>
  );
}

export default App;
