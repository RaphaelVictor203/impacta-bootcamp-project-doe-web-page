import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Redirect } from 'react-router';

import '../css/CarouselCardsCampanhas.css';

import arrow_right from '../images/arrow_right.png';
import arrow_left from '../images/arrow_left.png';

import CampanhaService from '../services/CampanhaService';
import CardCampanha from './CardCampanha';

class CarouselCardsCampanhas extends Component {

    constructor(props){
        super(props);
        this.state = {items_list: new CampanhaService().getAll(), displayLeftControl : "none", displayRightControl : "inline", positionCarousel : "begin", redirect: false, page: "/"};
    }

    chamaProximaTela(tela){
        this.setState({
            redirect: true,
            page : tela
        })
    }

    scrollTo(direction){
        if(direction == 1){
            if(this.state.positionCarousel === "begin"){
                document.getElementById('middle1').scrollIntoView({ behavior: "smooth", block: 'nearest', inline : 'nearest' });
                this.setState({positionCarousel : "middle"});
                this.setState({displayLeftControl : "inline"});
                this.setState({displayRightControl : "inline"});
            }else{
                document.getElementById('end').scrollIntoView({ behavior: "smooth", block: 'nearest', inline : 'nearest' });
                this.setState({positionCarousel : "end"});
                this.setState({displayLeftControl : "inline"});
                this.setState({displayRightControl : "none"});
            }
        }else{
            if(this.state.positionCarousel === "end"){
                document.getElementById('middle2').scrollIntoView({ behavior: "smooth", block: 'nearest', inline : 'nearest' });
                this.setState({positionCarousel : "middle"});
                this.setState({displayLeftControl : "inline"});
                this.setState({displayRightControl : "inline"});
            }else{
                document.getElementById('begin').scrollIntoView({ behavior: "smooth", block: 'nearest', inline : 'nearest' });
                this.setState({positionCarousel : "begin"});
                this.setState({displayLeftControl : "none"});
                this.setState({displayRightControl : "inline"});
            }
        }
        
    }

    render() {
        if(this.state.redirect){
            this.setState({redirect : false});
            return <Redirect to={{pathname: this.state.page, state: { tipoPesquisa : "campanha" }}} />
        }
        return (
            <div id="carousel-card">
                <Row style={{"width" : "100%", "height" : "3em", "margin-left" : ".001em", "margin-bottom" : "1em"}}>
                    <Col style={{"padding" : "0", "height" : "100%"}}>
                        <p id="titulo">Campanhas e ações recentes</p>
                    </Col>
                    <Col style={{"padding" : "0", "height" : "100%"}}>
                        <input type="button" value="mais" className="btn-mais" onClick={() => this.chamaProximaTela("/buscar")}/>
                    </Col>
                </Row>
                <Row id="cards">
                    <Col style={{"height" : "100%", "width" : "100%"}}>
                        <div id="div-cards">
                            <div id="begin" style={{float : "left", position : "relative", marginRight: "-2.4em"}}>
                            </div>
                            <CardCampanha campanha={this.state.items_list[0]}/>
                            <CardCampanha campanha={this.state.items_list[1]}/>
                            <CardCampanha campanha={this.state.items_list[2]}/>
                            <div id="middle2" style={{float : "left", position : "relative"}}>
                            </div>
                            <CardCampanha campanha={this.state.items_list[3]}/>
                            <CardCampanha campanha={this.state.items_list[4]}/>
                            <CardCampanha campanha={this.state.items_list[5]}/>
                            <CardCampanha campanha={this.state.items_list[6]}/>
                            <div id="middle1" style={{float : "left", position : "relative", marginLeft: "-2.4em"}}>
                            </div>
                            <CardCampanha campanha={this.state.items_list[7]}/>
                            <CardCampanha campanha={this.state.items_list[8]}/>
                            <CardCampanha campanha={this.state.items_list[9]}/>
                            <div id="end" style={{float : "left", position : "relative", marginLeft: "-1.8em"}}>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div id="controls">
                    <div className="div-controls-card-left" style={{"display" : this.state.displayLeftControl}} onClick={() => this.scrollTo(-1)}>
                        <img src={arrow_left} className="arrows"/>
                    </div>
                    <div className="div-controls-card-right" style={{"display" : this.state.displayRightControl}}  onClick={() => this.scrollTo(1)}>
                        <img src={arrow_right} className="arrows"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CarouselCardsCampanhas;