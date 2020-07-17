import React, {Component} from 'react';
import {Card} from 'antd';
import {Row, Col} from 'reactstrap';

// import "../../../assets/img/123.jpg"

const {Meta} = Card;

export default class Team extends Component {
    render() {
        return (
            <div className= "our-team" id="our-team">
                <div className="info-team">
                    <h1>Đội Ngủ</h1>
                    <h5>Chúng tôi luôn cố gắng tạo ra môi trường làm việc chuyên nghiệp, sáng tạo và kỷ luật cao. Đội ngũ kỹ sư trẻ giàu nhiệt huyết và các nhân viên tư vấn khách hàng luôn sẵn sàng hỗ trợ bạn suốt 24/7, phần mềm quản lý nhà trọ luôn được phát triển hàng ngày.
                    </h5>
                </div>

                <div className="team">
                    <Card
                        hoverable
                        style={{width: 300}}
                        cover={<img alt="example" src="https://i.imgur.com/xAJQihv.jpg" />}
                        
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
                        cover={<img alt="example" src="https://i.imgur.com/s8C5yGT.jpg" />}
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
