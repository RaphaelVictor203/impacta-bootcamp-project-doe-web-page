import React, { Component } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router';
import '../css/FormPessoaFisica.css';
import LocalizacaoService from '../services/LocalizacaoService';
import Select from 'react-select';
import { PessoaFisica } from '../entities/PessoaFisica';
import PessoaFisicaService from '../services/PessoaFisicaService';
import AuthenticationService from '../services/AuthenticationService';
import { DadosContato } from '../entities/DadosContato';
import { DadosBancario } from '../entities/DadosBancario';
import { Endereco } from '../entities/Endereco';
import { Nacionalidade } from '../entities/Nacionalidade';

class FormPessoaFisica extends Component {

    constructor(props){
        super(props);
        this.state = {
                        type : 'text', 
                        localizacaoService : new LocalizacaoService(),
                        pessoaFisicaService : new PessoaFisicaService(),
                        authService : new AuthenticationService(),
                        estados : [],
                        cidades : [],
                        pessoaFisica : new PessoaFisica(
                            new DadosContato(),
                            new DadosBancario(),
                            new Endereco(),
                            "",
                            Object,
                            Object,
                            "",
                            "",
                            "",
                            new Date(),
                            "",
                            new Nacionalidade()
                        ),
                        passwordCheck : "",
                        redirect: false, 
                        page: "/",
                        loading : false
                    };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.state.localizacaoService.getEstados().then(estados => {           
            this.setState({estados});
        });
    }

    changeInputType(newType) {
        this.setState({type : newType});
    }

    changeCidades(uf){
        this.state.localizacaoService.getCidadesByUF(uf).then(cidades => {  
            this.setState({cidades});
        })
    }

    handleChange(event){
        switch (event.target.name) {
            case "nome-completo":
                this.state.pessoaFisica.nome = event.target.value;
                break; 
            case "data-nascimento":
                let date = event.target.value.split("-");
                this.state.pessoaFisica.dataNasc.setFullYear(date[0], date[1], date[2]);
                //this.state.pessoaFisica.dataNasc = event.target.value;
                break;
            case "sexo":
                this.state.pessoaFisica.sexo = event.target.value;
                break;
            case "nacionalidade":
                this.state.pessoaFisica.nacionalidade.descricao = event.target.value;
                break;
            case "registro":
                this.state.pessoaFisica.registro = event.target.value;
                break;
            case "email":
                this.state.pessoaFisica.dadosContato.email = event.target.value;
                break;
            case "telefone":
                this.state.pessoaFisica.dadosContato.telefone = event.target.value;
                break;
            case "cep":
                this.state.pessoaFisica.endereco.cep = event.target.value;
                break;
            case "rua":
                this.state.pessoaFisica.endereco.rua = event.target.value;
                break;
            case "numero":
                this.state.pessoaFisica.endereco.numero = event.target.value;
                break;
            case "complemento":
                this.state.pessoaFisica.endereco.complemento = event.target.value;
                break;
            case "bairro":
                this.state.pessoaFisica.endereco.bairro = event.target.value;
                break;
            case "estado":
                this.changeCidades(event.target.value);
                this.state.pessoaFisica.endereco.idEstado = event.target.value;
                break;
            case "cidade":
                this.state.pessoaFisica.endereco.idCidade = event.target.value;
                break;
            case "password":
                this.state.pessoaFisica.senha = event.target.value;
                break;
            case "password-check":
                this.setState({passwordCheck: event.target.value});
                break;
        }
    }

    save() {
        this.setState({loading : true});
        this.state.pessoaFisicaService.save(this.state.pessoaFisica)
                                        .then(() => {
                                            alert("Cadastro realizado!!!");
                                            this.state.authService.login(this.state.pessoaFisica.dadosContato.email, this.state.pessoaFisica.senha)
                                                .then(() => {
                                                    localStorage.setItem("isLoggedIn", true);
                                                    this.setState({redirect: true});
                                                    this.setState({loading : false});
                                                    window.location.reload();
                                                })
                                        })
                                        .catch((err) => {
                                            this.setState({loading : false});
                                            alert("Erro: " + err.message)
                                        });
    }

    render() {
        if(this.state.redirect){
            this.setState({redirect : false});
            return <Redirect to={this.state.page} />
        }
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="formInformacoesPessois">
                        <Row>
                            <Col>
                                <Form.Control 
                                    type="text" 
                                    name="nome-completo" 
                                    placeholder="Nome Completo" 
                                    id="input-nome-completo" 
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="5" className="col-form">
                                <input 
                                    id="date" 
                                    name="data-nascimento"
                                    type={this.state.type} 
                                    placeholder="Data de nascimento" 
                                    className="input-date" 
                                    style={{width: '16em'}}
                                    onFocus={() => this.changeInputType('date')}
                                    onBlur={() => this.changeInputType('text')}
                                    onChange={this.handleChange}
                                ></input>
                            </Col>
                            <Col sm="5" className="col-form">
                                <select name="sexo" id="sexo" id="selector-sexo" className="selector" onChange={this.handleChange}>
                                    <option value="" disabled selected>Sexo</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Outros">Outros</option>
                                    <option value="Não quero informar">Não quero informar</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="5" className="col-form">
                                <select name="nacionalidade" id="nascionalidade" id="input01" className="selector" onChange={this.handleChange}>
                                    <option value="" disabled selected>Nacionalidade</option>
                                    <option value="nacionalidade 01">Nacionalidade 01</option>
                                    <option value="nacionalidade 02">Nacionalidade 02</option>
                                    <option value="nacionalidade 03">Nacionalidade 03</option>
                                    <option value="nacionalidade 04">Nacionalidade 04</option>
                                </select>
                            </Col>
                            <Col sm="5" className="col-form">
                                <Form.Control type="text" name="registro" placeholder="CPF / RNE" id="input02" onChange={this.handleChange}/>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formDadosContato">
                        <Form.Label id="titulo-group">
                            Dados de contato
                        </Form.Label>
                        <hr className="separador"/>
                        <Row>
                            <Col sm="5" className="col-form">
                                <Form.Control type="text" name="email" placeholder="E-mail" id="input01" onChange={this.handleChange}/>
                            </Col>
                            <Col sm="5" className="col-form">
                                <Form.Control type="text" name="telefone" placeholder="Telefone" id="input03" onChange={this.handleChange}/>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formEndereco">
                        <Form.Label id="titulo-group">
                            Endereço
                        </Form.Label>
                        <hr className="separador"/>
                        <Row>
                            <Col sm="5" className="col-form">
                                <Form.Control type="text" name="cep" placeholder="CEP" id="input01" onChange={this.handleChange}/>
                            </Col>
                            <Col sm="5" className="col-form">
                                <Form.Control type="text" name="rua" placeholder="Rua" id="input03" onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="2" className="col-form">
                                <Form.Control type="text" name="numero" placeholder="N°" id="input-numero-casa" onChange={this.handleChange}/>
                            </Col>
                            <Col sm="4" className="col-form">
                                <Form.Control type="text" name="complemento" placeholder="Complemento" id="input-complemento" onChange={this.handleChange}/>
                            </Col>
                            <Col sm="4" className="col-form">
                                <Form.Control type="text" name="bairro" placeholder="Bairro" id="input-bairro" onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="5" className="col-form">
                                <select name="estado" id="estado" id="input01" className="selector" onChange={this.handleChange}>
                                    <option value="" disabled selected>Estado</option>
                                    {this.state.estados.map(estado => <option value={estado.id}>{estado.nome}</option>)}
                                </select>
                            </Col>
                            <Col sm="5" className="col-form">
                                <select name="cidade" id="cidade" id="input03" className="selector" onChange={this.handleChange}>
                                    <option value="" disabled selected>Cidade</option>
                                    {this.state.cidades.map(cidade => <option value={cidade.id}>{cidade.nome}</option>)}
                                </select>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formSenha">
                        <Form.Label id="titulo-group">
                            Senha
                        </Form.Label>
                        <hr className="separador"/>
                        <Row>
                            <Col sm="5" className="col-form">
                                <Form.Control name="password" type="password" placeholder="Senha" id="input01" onChange={this.handleChange}/>
                            </Col>
                            <Col sm="5" className="col-form">
                                <Form.Control name="password-check" type="password" placeholder="Confirmar Senha" id="input03" onChange={this.handleChange}/>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Col>
                        <Button variant="success" id="btn-cadastrar" onClick={() => this.save()} style={{'display' : ((this.state.loading) ? 'none' : 'block')}}>CADASTRAR</Button>
                        <Spinner 
                            animation="border" 
                            variant="primary"
                            style={{
                                    'margin' : '0 auto',
                                    'marginTop' : '15%',
                                    'display' : ((!this.state.loading) ? 'none' : 'block')}} 
                        />
                    </Col>
                </Form>
            </div>
        );
    }
}

export default FormPessoaFisica;