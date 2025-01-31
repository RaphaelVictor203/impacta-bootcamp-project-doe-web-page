import React, { Component } from 'react';
import { Redirect } from 'react-router';

import '../css/CardOrganizacao.css';

import background_card from '../images/background-card-org.png';

class CardOrganizacao extends Component {

    constructor(props){
        super(props);
        this.state = {redirect: false, page: "/org/" + this.props.organizacao.nomeOrganizacao};
    }

    abrirPaginaOrganizacao() {
        this.setState({redirect : true});
    }

    render() {
        if(this.state.redirect){
            this.setState({redirect : false});
            return <Redirect to={{pathname: this.state.page, state: { organizacao : this.props.organizacao }}} />
        }
        return (
            <div id="card-organizacao-body" 
                    style={{
                            marginRight : this.props.marginRight, 
                            marginBottom : this.props.marginBottom, 
                            width : this.props.newWidth
                    }} 
                    onClick={() => this.abrirPaginaOrganizacao()}
            >
                <img src={background_card} id="img-background-org"/>
                <div id="content-org">
                    <div id="desc-org">
                        <div style={{position : 'absolute', zIndex : '3', marginTop : '-3.1em', width : '100%', height : 'auto'}}>
                            <img src={this.props.organizacao.logo} id="logo-org"/>
                        </div>
                        <div style={{width : '100%', height : 'auto', position : 'absolute', marginTop : '2.9em'}}>
                            <p id="nome-org">{this.props.organizacao.nomeOrganizacao}</p>
                            <p id="subtitulo-org">{this.props.organizacao.subtituloOrganizacao}</p>
                        </div>
                    </div>
                    <div id="infos-org">
                        <div id="campanhas">
                            <p style={{
                                width : "100%", 
                                height : "auto", 
                                color : "white", 
                                textAlign : "center", 
                                float : "left",
                                fontSize: "11px",
                                fontFamily: 'Roboto Bold'
                            }}>{this.props.organizacao.getQntdCampanhas()}</p>
                            <p style={{
                                width : "100%", 
                                height : "auto", 
                                color : "white", 
                                textAlign : "center", 
                                float : "left", 
                                marginTop : "-1.5em",
                                fontSize: "11px",
                                fontFamily: 'Roboto Bold'
                            }}>campanhas</p>
                        </div>
                        <div className="vertical-line"></div>
                        <div id="voluntarios">
                            <p style={{
                                width : "100%", 
                                height : "auto", 
                                color : "white", 
                                textAlign : "center", 
                                float : "left",
                                fontSize: "11px",
                                fontFamily: 'Roboto Bold'
                            }}>{this.props.organizacao.getQntdVoluntarios()}</p>
                            <p style={{
                                width : "100%", 
                                height : "auto", 
                                color : "white", 
                                textAlign : "center", 
                                float : "left", 
                                marginTop : "-1.5em",
                                fontSize: "11px",
                                fontFamily: 'Roboto Bold'
                            }}>voluntarios</p>
                        </div>
                        <div className="vertical-line"></div>
                        <div id="acoes">
                            <p style={{
                                width : "100%", 
                                height : "auto", 
                                color : "white", 
                                textAlign : "center", 
                                float : "left",
                                fontSize: "11px",
                                fontFamily: 'Roboto Bold'
                            }}>{this.props.organizacao.getQntdAcoes()}</p>
                            <p style={{
                                width : "100%", 
                                height : "auto", 
                                color : "white", 
                                textAlign : "center", 
                                float : "left", 
                                marginTop : "-1.5em",
                                fontSize: "11px",
                                fontFamily: 'Roboto Bold'
                            }}>ações</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardOrganizacao;