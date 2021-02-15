import React, { useState, useEffect } from 'react'
import { A } from 'hookrouter'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function ListarTarefas() {

  const [tarefas, setTarefas] = useState([])
  const [carregarTarefas, setCarregarTarefas] = useState(true)

  useEffect(() =>{
    function obterTarefas() {
      const tarefasDb = localStorage['tarefas']
      let listaTarefas = tarefasDb ? JSON.parse(tarefasDb): []
      setTarefas(listaTarefas)
      console.log(listaTarefas)
    }
    if (carregarTarefas) {
      obterTarefas()
      setCarregarTarefas(false)
    }
  }, [carregarTarefas])

  return (
    <div className="text-center">
      <Table striped bordered hover responsive data-testid="tabela">
        <thead>
          <tr>
            <th>
              Tarefas
            </th>
            <th>
              <A href='/cadastrar'
                className='btn btn-success btn-sm'
                data-testid="btn-nova-tarefa">
                <FontAwesomeIcon icon={faPlus}/>
                &nbsp;
                Nova tarefa
              </A>
            </th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </Table>
    </div>
  )
}

export default ListarTarefas