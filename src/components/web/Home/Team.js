import React, {Component} from 'react';
import {Card} from 'antd';
import {Row, Col} from 'reactstrap';

const {Meta} = Card;

export default class Team extends Component {
    render() {
        return (
            <div className= "our-team" id="our-team">
                <div className="info-team">
                    <h1>Meet the Team</h1>
                    <h3>Stop wasting time and money designing and managing a website that doesn’t get results. Happiness guaranteed!</h3>
                </div>

                <div className="team">
                    <Card
                        hoverable
                        style={{width: 300}}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Chung Nguyền Trường Duy" description="Software Engineer" />
                        <br />
                        <Row>
                            <Col>
                                <a href="https://www.facebook.com/truongduyuit/" target="blank">
                                    <i className="fa fa-github" aria-hidden="true" />
                                    Facebook
                                </a>
                            </Col>
                            <Col>
                                <a href="https://github.com/truongduyuit" target="blank">
                                    <i className="fa fa-github" aria-hidden="true" />
                                    Github
                                </a>
                            </Col>
                        </Row>
                    </Card>
                    <Card
                        hoverable
                        style={{width: 300}}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Hà Thanh Huy" description="Software Engineer" />
                        <br />
                        <Row>
                            <Col>
                                <a href="https://www.facebook.com/thanhhuydev" target="blank">
                                    <i className="fa fa-github" aria-hidden="true" />
                                    Facebook
                                </a>
                            </Col>
                            <Col>
                                <a href="https://github.com/thanhhuydev77" target="blank">
                                    <i className="fa fa-github" aria-hidden="true" />
                                    Github
                                </a>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        );
    }
}
