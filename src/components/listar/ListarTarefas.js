import React, { useState, useEffect } from 'react'
import { A } from 'hookrouter'
import { Table, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ItensListaTarefas from './ItensListaTarefas'
import Paginacao from './Paginacao'
import Ordenacao from './Ordenacao'

function ListarTarefas() {

  const ITENS_POR_PAGINA = 3

  const [tarefas, setTarefas] = useState([])
  const [carregarTarefas, setCarregarTarefas] = useState(true)
  const [totalItens, setTotalItens] = useState(0)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [ordenarAsc, setOrdenarAsc] = useState(false)
  const [ordenarDesc, setOrdenarDesc] = useState(false)
  const [filtroTarefa, setFiltroTarefa] = useState('')

  useEffect(() => {
    function obterTarefas() {
      const tarefasDb = localStorage['tarefas']
      let listaTarefas = tarefasDb ? JSON.parse(tarefasDb) : []

      // filtrar
      listaTarefas = listaTarefas.filter(
        t => t.nome.toLowerCase().indexOf(filtroTarefa.toLocaleLowerCase()) === 0
      )

      //ordenacao
      if (ordenarAsc) {
        listaTarefas.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase() ? 1 : -1))
      } else if (ordenarDesc) {
        listaTarefas.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase() ? 1 : -1))
      }

      // paginacao
      setTotalItens(listaTarefas.length)
      setTarefas(listaTarefas.splice((paginaAtual - 1) * ITENS_POR_PAGINA, ITENS_POR_PAGINA))
    }

    if (carregarTarefas) {
      obterTarefas()
      setCarregarTarefas(false)
    }
  }, [carregarTarefas, paginaAtual, ordenarAsc, ordenarDesc, filtroTarefa])

  function handleMudarPagina(pagina) {
    setPaginaAtual(pagina)
    setCarregarTarefas(true)
  }

  function handleOrdenar(event) {
    event.preventDefault()
    if (!ordenarAsc && !ordenarDesc) {
      setOrdenarAsc(true)
      setOrdenarDesc(false)
    } else if (ordenarAsc) {
      setOrdenarAsc(false)
      setOrdenarDesc(true)
    } else {
      setOrdenarAsc(false)
      setOrdenarDesc(false)
    }
    setCarregarTarefas(true)
  }

  function handleFiltrar(event) {
    setFiltroTarefa(event.target.value)
    setCarregarTarefas(true)
  }

  return (
    <div className="text-center">
      <h1>Lista de Tarefas</h1>
      <Table striped bordered hover responsive data-testid="tabela">
        <thead>
          <tr>
            <th>
              <a href="/" onClick={handleOrdenar}>
                Tarefas
              </a>
              &nbsp;
              <Ordenacao ordenarAsc={ordenarAsc} ordenarDesc={ordenarDesc} />
            </th>
            <th>
              <A href='/cadastrar'
                className='btn btn-success btn-sm'
                data-testid="btn-nova-tarefa">
                <FontAwesomeIcon icon={faPlus} />
                &nbsp;
                Nova tarefa
              </A>
            </th>
          </tr>
          <tr>
            <th>
              <Form.Control
                type="text"
                value={filtroTarefa}
                onChange={handleFiltrar}
                className="filtro-tarefa"
                data-testid="txt-tarefa"/>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <ItensListaTarefas
            tarefas={tarefas}
            recarregarTarefas={setCarregarTarefas} />
        </tbody>
      </Table>
      <Paginacao
        totalItens={totalItens}
        itensPorPagina={ITENS_POR_PAGINA}
        paginaAtual={paginaAtual}
        mudarPagina={handleMudarPagina} />
    </div>
  )
}

export default ListarTarefas